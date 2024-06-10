import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  res.status(200).json({ route: '/register' });
};
export const login = async (req: Request, res: Response) => {
  res.status(200).json({ route: '/login' });
};
