import { Request, Response } from 'express';
import User from '../../models/User.model';
import { trimData } from '../../utils/string.utils';
import { IUser, UserRole } from '../../models/types/User.types';

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
      role: UserRole.USER,
    };

    const newUser = new User(user);

    await newUser.save();
    // TODO: use i18n
    res.status(201).json({ message: 'Nouvel utilisateur créé !', newUser });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    /**
     * TODO:
     * add input validations
     */

    const { email, password } = trimData(req.body);
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // TODO: use i18n
      return res.status(400).json({
        error: 'Invalid credentials',
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      // TODO: use i18n
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = user.createJWT();

    res.status(200).json({
      // TODO: use i18n
      message: `Login successful! Welcome ${user.firstName} ${user.lastName}!`,
      user,
      token,
    });
  } catch (error: any) {
    // TODO: use i18n
    res.status(400).json({ error: error.message });
  }
};

// TODO: delete this controller => used for testing verifyToken middleware
export const testVerifyToken = (req: Request, res: Response) => {
  res.json({ message: 'Hello there!' });
};

// TODO: delete this controller => used for any kind of test
export const getTest = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(200).json({ message: 'Test' });
};
