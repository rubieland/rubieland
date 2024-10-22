import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import { trimData } from '../../utils/string.utils';
import {
  UpdatePasswordData,
  UserData,
  UserDocument,
} from '../../models/types/User.types';
import {
  checkUserData,
  validatePasswordUpdate,
} from '../../validation/User.validators';
import { deleteFile as deleteAvatar } from '../../utils/file.utils';
import path from 'path';
import User from '../../models/User.model';
import { env } from '../../loaders/env.loader';
import {
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { DataContext } from '../../validation/types/validation.types';

const context: DataContext = DataContext.USER;

const { UPLOADS_DIR } = env;
const avatarsDir = path.resolve(UPLOADS_DIR, 'user/avatars');

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.authUser?.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.usersFound_zero', { count: 0 }) });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({ user: userWithoutPassword });
  } catch (error: unknown) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const avatarFile = req.file;

  try {
    const { firstName, lastName, email, phone } = trimData(req.body);
    const userId = req?.authUser?.id;
    const userInBase: UserDocument | null = await User.findById(userId);
    const emailExists = await User.findOne({ email });

    // if the user is not in base anymore, send error
    if (!userInBase) {
      if (avatarFile)
        await deleteAvatar(`${avatarsDir}/${avatarFile?.filename}`);

      return res
        .status(404)
        .json({ error: i18n.t('common.error.usersFound_zero', { count: 0 }) });
    }

    // if user provides a new email, but this email already exists in base, send error
    if (email !== userInBase.email && emailExists) {
      if (avatarFile)
        await deleteAvatar(`${avatarsDir}/${avatarFile?.filename}`);

      return res
        .status(409)
        .json({ error: i18n.t('auth.error.userExistsInBase') });
    }

    const userData: UserData = {
      firstName,
      lastName,
      email,
      phone,
    };

    // data validation
    const userDataErrors = await checkUserData(userData);

    if (userDataErrors && userDataErrors.length > 0) {
      if (avatarFile)
        await deleteAvatar(`${avatarsDir}/${avatarFile?.filename}`);
      return res.status(400).json({
        message: i18n.t('profile.error.profileUpdateError'),
        errors: userDataErrors,
      });
    }

    // if user uploads a new avatar, delete the old one and replace it by the new
    if (avatarFile) {
      if (userInBase.avatar) {
        await deleteAvatar(`${avatarsDir}/${userInBase.avatar}`).then(
          async () => {
            userInBase.avatar = avatarFile?.filename;
          },
        );
      } else {
        userInBase.avatar = avatarFile?.filename;
      }
    }

    // update user data
    (
      Object.keys(userData) as (keyof Omit<
        UserData,
        'password' | 'confirmPassword'
      >)[]
    ).forEach((key) => {
      if (userData[key] !== undefined) {
        (userInBase[key] as keyof UserData) = userData[key] as keyof UserData;
      }
    });

    // save user with updated data
    await userInBase.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = userInBase.toObject();

    return res.status(200).json({
      message: i18n.t('profile.success.profileUpdateSuccess'),
      user: userWithoutPassword,
    });
  } catch (error: unknown) {
    if (avatarFile) await deleteAvatar(`${avatarsDir}/${avatarFile?.filename}`);
    next(error);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = trimData(
      req.body,
    );
    const userId = req?.authUser?.id;
    const userInBase: UserDocument | null = await User.findById(userId);

    // if the user is not in base anymore, send error
    if (!userInBase) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.usersFound_zero', { count: 0 }) });
    }

    const editPasswordData: UpdatePasswordData = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(editPasswordData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res
        .status(400)
        .json({ message: i18n.t('auth.error.registerFailed'), errors });
    }

    const { errors, status } = await validatePasswordUpdate(
      editPasswordData,
      userInBase,
    );

    if (errors.length > 0) {
      return res.status(status).json({
        message: i18n.t('profile.error.passwordUpdateFailed'),
        errors,
      });
    }

    userInBase.password = newPassword;
    await userInBase.save();

    res.status(200).json({
      message: i18n.t('profile.success.passwordUpdateSuccess'),
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req?.authUser?.id;
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.userDoesNotExist') });
    }

    await user.deleteOne().then(async () => {
      if (user.avatar) await deleteAvatar(`${avatarsDir}/${user.avatar}`);
    });

    res
      .status(200)
      .json({ message: i18n.t('profile.success.deleteAccountSuccess') });
  } catch (error: unknown) {
    next(error);
  }
};
