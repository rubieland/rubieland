import { NextFunction, Request, Response } from 'express';
import i18n from '../../config/i18n';
import User from '../../models/User.model';

export const isMeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get the user id from the session
    const sessionUserId = req.session.authUser?.id;
    // get the user id from the params
    const paramsUserId = req.params?.userId;

    const userInBase = await User.findById(paramsUserId);

    if (!userInBase) {
      return res.status(404).json({
        error: i18n.t('common.error.userDoesNotExist', { count: 0 }),
      });
    }

    // deny the access if a user tries to access the profile of another user
    if (sessionUserId !== paramsUserId) {
      return res.status(403).json({ error: i18n.t('auth.error.forbidden') });
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};
