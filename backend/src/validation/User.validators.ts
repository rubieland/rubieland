import validator, { StrongPasswordOptions } from 'validator';
import { UserField, UserPayload } from '../models/types/User.types';
import {
  checkFieldFormat,
  checkMaxLength,
  checkMinLength,
  getValidationErrorMessage,
  validatePhoneNumber,
} from '../utils/validation.utils';
import { Reason, UserDataLengths } from './types/validation.types';

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

export const userDataLengths: UserDataLengths = {
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
    maxLength: 20,
  },
  confirmPassword: {
    minLength: 8,
    maxLength: 20,
  },
  phone: {
    minLength: 9,
    maxLength: 15,
  },
};

export const checkEmail = (email: string) => {
  return !validator.isEmail(email)
    ? getValidationErrorMessage({
        field: 'email',
        rule: 'email',
        reason: Reason.INVALID,
      })
    : '';
};

export const checkPassword = (password: string) => {
  return !validator.isStrongPassword(password, {
    ...strongPasswordOptions,
    returnScore: false,
  })
    ? getValidationErrorMessage({
        field: 'password',
        rule: 'password',
        reason: Reason.INVALID,
      })
    : '';
};

export const checkPhone = (phone: string) => {
  return !validatePhoneNumber(phone)
    ? getValidationErrorMessage({
        field: 'phone',
        rule: 'phone',
        reason: Reason.INVALID,
      })
    : '';
};

/**
 *  TODO:
 *  refactor to avoid code repetition
 */

export const checkUserData = (data: UserPayload) => {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key in userDataLengths) {
      const fieldKey = key as UserField;

      // check maxLengths
      const maxLengthError = checkMaxLength(
        fieldKey,
        value,
        userDataLengths[fieldKey].maxLength,
      );

      if (maxLengthError) errors.push(maxLengthError);

      // check minLengths
      const minLengthError = checkMinLength(
        fieldKey,
        value,
        userDataLengths[fieldKey].minLength,
      );

      if (minLengthError) errors.push(minLengthError);

      // check firstName and lastName fields
      if (fieldKey === 'firstName' || fieldKey === 'lastName') {
        const nameError = checkFieldFormat(fieldKey, value);

        if (nameError) errors.push(nameError);
      }

      // check email
      if (fieldKey === 'email') {
        const emailError = checkEmail(value);

        if (emailError) errors.push(emailError);
      }

      //check password
      if (fieldKey === 'password') {
        const passwordError = checkPassword(value);

        if (passwordError) errors.push(passwordError);
      }

      // check phone number
      if (fieldKey === 'phone') {
        const phoneError = checkPhone(value);

        if (phoneError) errors.push(phoneError);
      }
    }
  }

  return errors;
};
