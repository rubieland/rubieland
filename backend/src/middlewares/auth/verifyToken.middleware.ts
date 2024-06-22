import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../loaders/env.loader';

const { JWT_SECRET } = env;

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const reqHeaders = req.headers.authorization;

  if (!reqHeaders) {
    // TODO: use i18n
    return res
      .status(401)
      .json({ error: 'Accès refusé. Veuillez vous authentifier' });
  }

  const token = reqHeaders.split(' ')[1];

  if (!token) {
    // TODO: use i18n
    return res
      .status(401)
      .json({ error: 'Accès refusé. Veuillez vous authentifier' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === 'object' && decoded?.id && decoded?.role) {
      req.user = { id: decoded?.id, role: decoded?.role };
    }
    next();
  } catch (error: unknown) {
    // TODO: use i18n
    return res
      .status(403)
      .json({ error: 'Accès refusé. Veuillez vous reconnecter' });
  }
};
