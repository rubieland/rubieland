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
  role?: UserRole;
}

// TODO: remove 'avatar' from Omit when file handling is ready
export type UserField = keyof Omit<IUser, 'avatar' | 'role'>;

export interface UserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  createJWT(): string;
}
