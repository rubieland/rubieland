import { Document, Types } from 'mongoose';

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
  role: UserRole;
  dogsIds: Types.ObjectId[];
}

export interface UserData extends Omit<User, 'password' | 'dogsIds' | 'role'> {
  password?: string;
  confirmPassword?: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type UserField = keyof Omit<UserData, 'avatar' | 'role' | 'dogsIds'>;

export interface UserDocument extends User, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}
