import { DogGender, DogSize } from '../models/types/Dog.types';

export const checkDogGender = (gender: string) => {
  return Object.values(DogGender).includes(gender as DogGender);
};

export const checkDogSize = (size: string) => {
  return Object.values(DogSize).includes(size as DogSize);
};
