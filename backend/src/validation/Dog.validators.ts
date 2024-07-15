import { DogGender } from '../models/types/Dog.types';
import { DataLengths } from './types/validation.types';

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

export const checkDogGender = (gender: string) => {
  return Object.values(DogGender).includes(gender as DogGender);
};
