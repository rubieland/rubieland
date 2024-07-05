import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../loaders/env.loader';
import i18n from '../../config/i18n';

const { JWT_SECRET } = env;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ error: i18n.t('auth.error.invalidToken') });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    /**
     * TODO: check if we can improve this condition
     * or if we can type decoded / override its type
     */
    if (typeof decoded === 'object' && decoded?.id && decoded?.role) {
      req.session.authUser = {
        id: decoded.id,
        role: decoded.role,
      };
    }
    next();
  } catch (error: unknown) {
    return res.status(403).json({ error: i18n.t('auth.error.tokenExpired') });
  }
};
