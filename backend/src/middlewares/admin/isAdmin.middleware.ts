import { NextFunction, Request, Response } from 'express';
import i18n from '../../config/i18n';

export const isAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // get the user role from the session
    const userRole = req.session.authUser?.role;

    // if the user is not admin, he must not access the route...
    if (userRole !== 'admin') {
      return res.status(403).json({ error: i18n.t('auth.error.forbidden') });
    }
    // ... else, he can access the route
    next();
  } catch (error: unknown) {
    next(error);
  }
};
