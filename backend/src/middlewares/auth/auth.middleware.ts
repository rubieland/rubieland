import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../loaders/env.loader';
import i18n from '../../config/i18n';
import { AuthTokenPayload } from '../../types/AuthUser';

const { JWT_SECRET } = env;

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: i18n.t('auth.error.unauthorized') });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: i18n.t('auth.error.unauthorized') });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
    req.authUser = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error: unknown) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: i18n.t('auth.error.tokenExpired') });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: i18n.t('auth.error.invalidToken') });
    } else {
      next(error);
    }
  }
};
