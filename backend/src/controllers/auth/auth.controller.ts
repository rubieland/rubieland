import { Request, Response } from 'express';
import User, { UserInput } from '../../models/User.model';
import { trimData } from '../../utils/string.utils';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = trimData(req.body);

    /**
     * TODO:
     * add input validations
     */

    const user: UserInput = {
      firstName,
      lastName,
      email,
      password,
      phone,
    };

    console.log('new user', user);
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
