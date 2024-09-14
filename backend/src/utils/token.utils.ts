import { env } from '../loaders/env.loader';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/types/User.types';

const {
  JWT_SECRET,
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  JWT_REFRESH_SECRET,
} = env;

export const generateTokens = (userId: string, userRole: UserRole) => {
  const accessToken = jwt.sign({ id: userId, role: userRole }, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });

  const refreshToken = jwt.sign(
    { id: userId, role: userRole },
    JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    },
  );

  return { accessToken, refreshToken };
};
