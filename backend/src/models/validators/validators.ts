import { StrongPasswordOptions } from 'validator';

export const regexes = {
  nameField: /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/i, // accepts only letters, hyphens, spaces, and apostrophes
};

export const strongPasswordOptions: StrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};
