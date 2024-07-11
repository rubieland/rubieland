import { Document } from 'mongoose';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  avatar?: string | null;
  role?: UserRole;
}

export interface UserData extends Omit<User, 'password'> {
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export type UserField = keyof Omit<UserData, 'avatar' | 'role'>;

export interface UserDocument extends User, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  createJWT(): string;
}
