import { Request, Response, NextFunction } from 'express';
import User from '../../models/User.model';
import i18n from '../../config/i18n';
import { UserDocument } from '../../models/types/User.types';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // retrieve all users without password
    const users: UserDocument[] = await User.find(
      {},
      'firstName lastName email phone avatar role createdAt updatedAt',
    );

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.userFound_zero', { count: 0 }) });
    }

    const message =
      users.length === 1
        ? i18n.t('common.success.userFound_one', { count: 1 })
        : i18n.t('common.success.userFound_other', { count: users.length });

    res.status(200).json({
      message,
      users,
    });
  } catch (error: unknown) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params?.userId;
    const user: UserDocument | null = await User.findById(
      userId,
      'firstName lastName email phone avatar role createdAt updatedAt',
    );

    if (!user) {
      return res
        .status(404)
        .json({ error: i18n.t('common.error.userDoesNotExist') });
    }

    res.status(200).json({
      message: i18n.t('common.success.userFound_one', { count: 1 }),
      user,
    });
  } catch (error: unknown) {
    next(error);
  }
};
