import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
}

export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  createJWT(): string;
}
