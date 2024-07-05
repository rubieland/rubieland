import { NextFunction, Request, Response } from 'express';
import i18n from '../../config/i18n';

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

    // deny the access if a user tries to access the profile of another user
    if (sessionUserId !== paramsUserId) {
      return res
        .status(403)
        .json({ error: i18n.t('common.error.unauthorized') });
    }
    next();
  } catch (error: unknown) {
    next(error);
  }
};
