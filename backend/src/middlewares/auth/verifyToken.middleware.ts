import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { env } from '../../loaders/env.loader';

const { JWT_SECRET } = env;

export interface CustomRequest extends Request {
  token: string | JwtPayload | undefined;
  isLogged: boolean;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Veuillez vous authentifier' });
    }

    // TODO: maybe change this part
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as CustomRequest).token = decoded;

    console.log(decoded);

    next();
  } catch (err) {
    res.status(401).send('Veuillez vous reconnecter');
  }
};
