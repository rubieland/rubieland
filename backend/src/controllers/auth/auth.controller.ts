import { NextFunction, Request, Response } from 'express';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { UserPayload, UserRole } from '../../models/types/User.types';
import i18n from '../../config/i18n';
import {
  extractValidationErrorMessagesFromError,
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { checkUserData } from '../../validation/User.validators';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, phone } =
      trimData(req.body);

    // default avatar path
    const defaultAvatar = path.join(
      __dirname,
      '../../',
      'uploads/placeholders/user-default-avatar.jpg',
    );

    const userData: UserPayload = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      avatar: defaultAvatar,
      role: UserRole.USER,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(userData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(missingOrEmptyFields);

      return res
        .status(400)
        .json({ message: i18n.t('auth.error.registerFailed'), errors });
    }

    // data validation
    const userDataErrors = checkUserData(userData);

    if (userDataErrors && userDataErrors.length > 0) {
      return res.status(400).json({
        message: i18n.t('auth.error.registerFailed'),
        errors: userDataErrors,
      });
    }

    const newUser = new User(userData);
    const userInBase = await User.findOne({ email: newUser.email });

    // if the email already exists in base, send error (as it must be unique)
    if (userInBase) {
      return res
        .status(400)
        .json({ error: i18n.t('auth.error.userExistsInBase') });
    }

    await newUser.save();
    res.status(201).json({ message: i18n.t('auth.success.register'), newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const messages = extractValidationErrorMessagesFromError(error);
      res.status(400).json({ errors: messages });
    } else {
      next(error);
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = trimData(req.body);
    const missingOrEmptyFields = getMissingOrEmptyFields({ email, password });

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(missingOrEmptyFields);

      return res.status(400).json({ errors });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({
        error: i18n.t('auth.error.invalidCredentials'),
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: i18n.t('auth.error.invalidCredentials') });
    }

    const token = user.createJWT();
    req.session.token = token;

    res.status(200).json({
      message: i18n.t('auth.success.login', { firstName: user.firstName }),
      user,
      token,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  // destroy session for logout
  req.session.destroy((error: unknown) => {
    if (error) {
      console.error(
        `${i18n.t('auth.error.sessionDestructionFailed')}: ${error}`,
      );
      next(error);
    } else {
      console.log(i18n.t('auth.success.sessionDestructionSuccess'));
      res
        .status(200)
        .json({ message: i18n.t('auth.success.sessionDestructionSuccess') });
    }
  });
};
