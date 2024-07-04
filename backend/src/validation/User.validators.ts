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

export const userFieldsLengths: UserFieldLengths = {
  firstName: {
    minLength: 2,
    maxLength: 30,
  },
  lastName: {
    minLength: 2,
    maxLength: 30,
  },
  email: {
    minLength: 5,
    maxLength: 60,
  },
  password: {
    minLength: 8,
    maxLength: 100,
  },
  phone: {
    minLength: 9,
    maxLength: 15,
  },
};
