import { NextFunction, Request, Response } from 'express';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { UserData, UserRole } from '../../models/types/User.types';
import i18n from '../../config/i18n';
import {
  extractValidationErrorMessagesFromError,
  getMissingOrEmptyFields,
  getMissingOrEmptyFieldsErrorMessage,
} from '../../utils/validation.utils';
import { checkUserData } from '../../validation/User.validators';
import { DataContext } from '../../validation/types/validation.types';
import { generateTokens } from '../../utils/token.utils';
import { env } from '../../loaders/env.loader';
import jwt from 'jsonwebtoken';

const { NODE_ENV, COOKIE_MAX_AGE, JWT_REFRESH_SECRET } = env;
const context: DataContext = DataContext.USER;

interface TokenPayload {
  id: string;
  role: UserRole;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, phone } =
      trimData(req.body);

    const userData: UserData & { role: UserRole } = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      role: UserRole.USER,
    };

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields(userData);

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res
        .status(400)
        .json({ message: i18n.t('auth.error.registerFailed'), errors });
    }

    // data validation
    const userDataErrors = await checkUserData(userData);

    if (userDataErrors && userDataErrors.length > 0) {
      return res.status(400).json({
        message: i18n.t('auth.error.registerFailed'),
        errors: userDataErrors,
      });
    }

    const newUser = new User({ ...userData, avatar: null });
    const userInBase = await User.findOne({ email: newUser.email });

    // if the email already exists in base, send error (as it must be unique)
    if (userInBase) {
      return res
        .status(409)
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
    // retrieve email and password from req.body
    const { email, password } = trimData(req.body);

    // check for empty or missing fields
    const missingOrEmptyFields = getMissingOrEmptyFields({ email, password });

    if (missingOrEmptyFields && missingOrEmptyFields.length > 0) {
      const errors = getMissingOrEmptyFieldsErrorMessage(
        context,
        missingOrEmptyFields,
      );

      return res.status(400).json({ errors });
    }

    // retrieve user in database with email
    const user = await User.findOne({ email: email.toLowerCase() });

    // if no user with this email exist in base, send error
    if (!user) {
      return res.status(400).json({
        error: i18n.t('auth.error.invalidCredentials'),
      });
    }

    // compare password received from req.body with password in base
    const isPasswordMatch = await user.comparePassword(password);

    // if they do not match, send error
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ error: i18n.t('auth.error.invalidCredentials') });
    }

    // generate access and refresh token using user _id and email for jwt payload
    const { accessToken, refreshToken } = generateTokens(
      String(user._id),
      user.role,
    );

    // create another user object without password to send it in response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pwd, ...userWithoutPassword } = user.toObject();

    // create an httpOnly refresh token cookie
    res.cookie('refreshToken', refreshToken, {
      secure: NODE_ENV === 'production', // allow receiving cookie from HTTPS domain only (so "true" in production only because localhost uses HTTP, not HTTPS)
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax', // "none" allows receiving cookie from any cross-origin request whereas "lax" does not allow receiving cookie from another site in case of unsafe request like POST or PUT
      httpOnly: true,
      maxAge: Number(COOKIE_MAX_AGE), // 1h
    });

    res.status(200).json({
      message: i18n.t('auth.success.login', {
        firstName: userWithoutPassword.firstName,
      }),
      accessToken,
      refreshToken,
      user: userWithoutPassword,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // retrieve refreshToken from the client cookies
    const { refreshToken } = req.cookies;

    // if refresh token is missing, send an unauthorized error
    if (!refreshToken) {
      return res
        .status(401)
        .json({ error: i18n.t('auth.error.refreshTokenMissing') });
    }

    let decoded: TokenPayload;

    try {
      // verify refresh token's validity and expiration
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as TokenPayload;
    } catch (error) {
      // if it is expired, user has to log in again
      if (error instanceof jwt.TokenExpiredError) {
        return res
          .status(401)
          .json({ error: i18n.t('auth.error.refreshTokenExpired') });
      }

      // if it is invalid (e.g. it has been modified), send forbidden error
      return res
        .status(403)
        .json({ error: i18n.t('auth.error.invalidRefreshToken') });
    }

    // security check: make sure that the refresh token payload corresponds to a user in base (check with _id)
    // and that the user's role in base corresponds with the role contained in the token payload
    const user = await User.findOne({ _id: decoded.id, role: decoded.role });
    if (!user) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.userDoesNotExist') });
    }

    // generate new access and refresh tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      generateTokens(String(user._id), user.role);

    // create another user object without password to send it in response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toObject();

    // create a new httpOnly refresh token cookie
    res.cookie('refreshToken', newRefreshToken, {
      secure: NODE_ENV === 'production',
      sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: true,
      maxAge: Number(COOKIE_MAX_AGE),
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // delete refresh token cookie
    res.clearCookie('refreshToken');
    res.status(200).json({ message: i18n.t('auth.success.logout') });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ error: 'Server error during logout.' });
  }
};
