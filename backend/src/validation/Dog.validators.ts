import { DogGender, DogSize } from '../models/types/Dog.types';
import { DataLengths, DataMinMax } from './types/validation.types';

export const dogDataLengths: DataLengths = {
  name: {
    minLength: 5,
    maxLength: 30,
  },
  bio: {
    minLength: 20,
    maxLength: 10000,
  },
  breed: {
    minLength: 2,
    maxLength: 50,
  },
};

export const dogMixMax: DataMinMax = {
  weight: {
    min: 0,
    max: 150,
  },
};

export const checkDogGender = (gender: string) => {
  return Object.values(DogGender).includes(gender as DogGender);
};

export const checkDogSize = (size: string) => {
  return Object.values(DogSize).includes(size as DogSize);
};
