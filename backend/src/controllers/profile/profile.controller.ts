import { Request, Response, NextFunction } from 'express';
import i18n from '../../config/i18n';
import User from '../../models/User.model';

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
