import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { UserPayload } from '../../models/types/User.types';
import {
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
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
    const userInBase = await User.findById(userId);

    if (!userInBase) {
      if (req.file) await deleteFile(`${avatarsDir}/${req.file?.filename}`);

      return res
        .status(404)
        .json({ error: i18n.t('profile.error.userNotFound') });
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

    /**
     * TODO:
     * check empty fields
     * add data validation
     * check password and confirmPassword => must be equivalent
     * handle copyFile if new avatar is provided
     * /!\ DO NOT DELETEFILE IF USER AVATAR IS DEFAULTAVATAR
     * save newUser => if password is modified, pre('save') method should be called and hash new password
     * create deleteFile function and call it if validations fail
     */

    // ---------------------------- \\

    //let userPassword = user.password;
    // // check if a new password has been provided and if so, hash it
    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   userPassword = hashedPassword;
    // }

    // let newAvatar;
    // if (avatarFromField && avatarFromField !== '') {
    //   fs.unlink(`src/uploads/user/avatar${user.avatar}`, (error) => {
    //     if (error && error.code !== 'ENOENT') {
    //       return res.status(500).json({
    //         error: i18n.t('common.error.deleteFileFailed'),
    //       });
    //     }
    //   });
    //   newAvatar = await copyFile(
    //     avatarFromField ?? '',
    //     'src/uploads/user/avatar',
    //     'images/avatars',
    //   );
    // }

    // // update user data with new data if provided, or keep old data if not
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   {
    //     firstName: firstName || user.firstName,
    //     lastName: lastName || user.lastName,
    //     phone: phone || user.phone,
    //     email: email || user.email,
    //     password: userPassword,
    //     avatar: newAvatar ? newAvatar[0] : user.avatar,
    //   },
    //   { new: true },
    // );

    // ---------------------------- \\

    return res.status(200).json({
      message: `Votre profil a été modifié avec succès!`,
      userData,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
