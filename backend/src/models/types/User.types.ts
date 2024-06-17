import { Document } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
}

export interface UserDocument extends IUser, Document {
  isAdmin: boolean;
}
