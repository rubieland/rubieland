import { Document, Types } from 'mongoose';

export enum DogGender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface IDog {
  gender: DogGender;
  name: string;
  bio: string;
  birthDate: Date;
  breed: string;
  picture?: string | null;
  ownerId: Types.ObjectId;
}

export type DogField = keyof Omit<IDog, 'ownerId' | 'picture'>;

export interface DogDocument extends IDog, Document {
  age: number; // calculated using birthdate
}
