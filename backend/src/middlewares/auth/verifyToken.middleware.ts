import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// TODO: extract this in a dedicated file
const { JWT_SECRET, JWT_EXPIRATION } = process.env;

if (!JWT_SECRET || JWT_SECRET === '') {
  throw new Error('JWT_SECRET is undefined!');
} else if (!JWT_EXPIRATION || JWT_EXPIRATION === '') {
  throw new Error('JWT_EXPIRATION is undefined!');
}

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
