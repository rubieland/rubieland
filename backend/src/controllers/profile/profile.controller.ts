import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { UserDocument, UserPayload } from '../../models/types/User.types';
import { checkUserData } from '../../validation/User.validators';
import { deleteFile } from '../../utils/file.utils';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const avatarsDir = path.join(__dirname, '../../uploads/user/avatars');

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.session?.authUser?.id;

    if (!userId) {
      return res.status(401).json({ error: i18n.t('auth.error.unauthorized') });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ error: i18n.t('profile.error.userNotFound') });
    }

    res.status(200).json({ user });
  } catch (error: unknown) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, phone } =
      trimData(req.body);
    const avatar = req.file?.filename;
    const userId = req.session?.authUser?.id;
    const userInBase: UserDocument | null = await User.findById(userId);
    const emailExists = await User.findOne({ email });

    // if the user is not in base anymore, send error
    if (!userInBase) {
      if (req.file) await deleteFile(`${avatarsDir}/${req.file?.filename}`);

      return res
        .status(404)
        .json({ error: i18n.t('profile.error.userNotFound') });
    }

    // if user provides a new email, but this email already exists in base, send error
    if (email !== userInBase.email && emailExists) {
      return res
        .status(400)
        .json({ error: i18n.t('auth.error.userExistsInBase') });
    }

    const userData: UserPayload = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      avatar,
    };

    // data validation
    const userDataErrors = checkUserData(userData);

    if (userDataErrors && userDataErrors.length > 0) {
      if (req.file) await deleteFile(`${avatarsDir}/${req.file?.filename}`);
      return res.status(400).json({
        message: i18n.t('auth.error.registerFailed'),
        errors: userDataErrors,
      });
    }

    // if user uploads a new avatar, delete the old one and replace it by the new
    if (req.file) {
      await deleteFile(`${avatarsDir}/${userInBase.avatar}`).then(async () => {
        userInBase.avatar = req.file?.filename;
      });
    }

    // update user data
    (
      Object.keys(userData) as (keyof Omit<UserPayload, 'confirmPassword'>)[]
    ).forEach(async (key) => {
      if (userData[key] !== undefined) {
        userInBase[key] = userData[key] as any;
      }
    });

    // save user with updated data
    await userInBase.save();

    return res.status(200).json({
      message: `Votre profil a été modifié avec succès!`,
      userInBase,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
