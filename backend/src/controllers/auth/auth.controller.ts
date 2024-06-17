import { Request, Response } from 'express';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { IUser } from '../../models/types/User.types';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = trimData(req.body);

    /**
     * TODO:
     * add input validations
     */

    const user: IUser = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    const newUser = await User.create(user);

    await newUser.save();
    res.status(201).json({ message: 'Nouvel utilisateur créé !', newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export const login = async (req: Request, res: Response) => {
  res.status(200).json({ route: '/login' });
};
