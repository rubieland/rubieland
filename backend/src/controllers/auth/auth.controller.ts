import { NextFunction, Request, Response } from 'express';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { IUser, UserRole } from '../../models/types/User.types';
import i18n from '../../config/i18n';
import {
  extractValidationErrorMessagesFromError,
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { checkUserData } from '../../validation/User.validators';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password, phone } = trimData(req.body);

    /**
     * TODO:
     * add avatar + avatar validation
     */

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(missingOrEmptyFields);

      return res
        .status(400)
        .json({ message: i18n.t('auth.error.registerFailed'), errors });
    }

    // data validation
    const userDataErrors = checkUserData(req.body);

    if (userDataErrors && userDataErrors.length > 0) {
      return res
        .status(400)
        .json({ message: i18n.t('auth.error.registerFailed'), userDataErrors });
    }

    const user: IUser = {
      firstName,
      lastName,
      email,
      password,
      phone,
      role: UserRole.USER,
    };

    const newUser = new User(user);
    const isUserInBase = await User.findOne({ email: newUser.email });

    if (isUserInBase) {
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
    /**
     * TODO:
     * add input validations
     */

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

// TODO: delete this controller => used for testing authMiddleware middleware
export const testAuthMiddleware = (req: Request, res: Response) => {
  res.json({ message: 'Hello there!' });
};

// TODO: delete this controller => used for any kind of test
export const getTest = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json({ message: 'Test' });
};
