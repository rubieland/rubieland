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
  phone: string;
  avatar?: string | null;
  role?: UserRole;
}

export interface UserPayload extends Omit<IUser, 'password'> {
  password?: string;
  confirmPassword?: string;
}

export type UserField = keyof Omit<UserPayload, 'avatar' | 'role'>;

export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  createJWT(): string;
}
