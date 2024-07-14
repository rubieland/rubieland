import { Document, Types } from 'mongoose';

export enum DogGender {
  MALE = 'male',
  FEMALE = 'female',
}
export enum DogSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface IDog {
  gender: DogGender;
  name: string;
  bio: string;
  birthDate: Date;
  breed: string;
  size: DogSize;
  weight: number;
  picture?: string | null;
  ownerId: Types.ObjectId;
  isVaccinated: boolean;
  isNeutered: boolean;
}

export type DogData = Omit<IDog, 'isVaccinated' | 'isNeutered'> & {
  isVaccinated: string;
  isNeutered: string;
};

export type DogField = keyof Omit<IDog, 'ownerId'>;

export interface DogDocument extends IDog, Document {
  calculateAge: (birthDate: Date) => number;
  age: number; // calculated using birthdate
}
