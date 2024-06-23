import { NextFunction, Request, Response } from 'express';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { IUser, UserRole } from '../../models/types/User.types';
import i18n from '../../config/i18n';
import { extractValidationErrorMessages } from '../../utils/validation.utils';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password, phone } = trimData(req.body);

    /**
     * TODO:
     * add input validations
     */

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
      const messages = extractValidationErrorMessages(error);
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

    res.status(200).json({
      message: i18n.t('auth.success.login', { firstName: user.firstName }),
      user,
      token,
    });
  } catch (error: unknown) {
    next(error);
  }
};

// TODO: delete this controller => used for testing verifyToken middleware
export const testVerifyToken = (req: Request, res: Response) => {
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
