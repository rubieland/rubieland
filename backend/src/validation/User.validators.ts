import validator, { StrongPasswordOptions } from 'validator';
import { UserDocument, UserField, UserData } from '../models/types/User.types';
import {
  checkFieldFormat,
  checkMaxLength,
  checkMinLength,
  getValidationErrorMessage,
  validatePhoneNumber,
} from '../utils/validation.utils';
import {
  Reason,
  StringDataLengths,
  DataContext,
} from './types/validation.types';

export const strongPasswordOptions: StrongPasswordOptions = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

export const userDataLengths: StringDataLengths = {
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
    maxLength: 60,
  },
  phone: {
    minLength: 9,
    maxLength: 15,
  },
};

export const checkEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

export const checkPassword = (password: string): boolean => {
  return validator.isStrongPassword(password, {
    ...strongPasswordOptions,
    returnScore: false,
  });
};

export const checkPhone = (phone: string): boolean => {
  return validatePhoneNumber(phone);
};

export const checkConfirmPassword = (
  password: string,
  confirmPassword: string,
): boolean => {
  return password === confirmPassword;
};

/**
 *  TODO:
 *  refactor to avoid code repetition
 */

export const checkUserData = async (
  data: UserData,
  userInBase?: UserDocument,
) => {
  const errors: string[] = [];
  const context: DataContext = DataContext.USER;

  for (const [key, value] of Object.entries(data)) {
    if (key in userDataLengths) {
      const fieldKey = key as UserField;

      // check maxLengths
      if (!checkMaxLength(value, userDataLengths[fieldKey].maxLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            maxLength: userDataLengths[fieldKey].maxLength,
            reason: Reason.MAXLENGTH,
          }),
        );
      }

      // check minLengths
      if (!checkMinLength(value, userDataLengths[fieldKey].minLength)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            minLength: userDataLengths[fieldKey].minLength,
            reason: Reason.MINLENGTH,
          }),
        );
      }

      // check firstName and lastName fields
      if (
        (fieldKey === 'firstName' || fieldKey === 'lastName') &&
        !checkFieldFormat(value)
      ) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            rule: fieldKey,
            reason: Reason.INVALID,
          }),
        );
      }

      // check email
      if (fieldKey === 'email' && !checkEmail(value)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            rule: fieldKey,
            reason: Reason.INVALID,
          }),
        );
      }

      // check password
      if (fieldKey === 'password' && !checkPassword(value)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            rule: fieldKey,
            reason: Reason.INVALID,
          }),
        );
      }

      // check phone number
      if (fieldKey === 'phone' && !checkPhone(value)) {
        errors.push(
          getValidationErrorMessage({
            context,
            field: fieldKey,
            rule: fieldKey,
            reason: Reason.INVALID,
          }),
        );
      }
    }
  }

  // check confirmPassword
  if (
    'password' in data &&
    data.password != null &&
    'confirmPassword' in data &&
    data.confirmPassword != null
  ) {
    if (!checkConfirmPassword(data.password, data.confirmPassword)) {
      errors.push(
        getValidationErrorMessage({
          context,
          field: 'confirmPassword',
          rule: 'passwordsDontMatch',
          reason: Reason.INVALID,
        }),
      );
    }
  }

  // TODO: handle password change separately and send 401 status code if currentPassword is invalid

  // check currentPassword
  if ('currentPassword' in data && data.currentPassword != null) {
    const isMatch = await userInBase?.comparePassword(data.currentPassword);
    if (!isMatch) {
      errors.push(
        getValidationErrorMessage({
          context,
          field: 'currentPassword',
          rule: 'currentPasswordDontMatch',
          reason: Reason.INVALID,
        }),
      );
    }
  }

  // check newPassword
  if (
    'newPassword' in data &&
    data.newPassword != null &&
    !checkPassword(data.newPassword)
  ) {
    errors.push(
      getValidationErrorMessage({
        context,
        field: 'newPassword',
        rule: 'password',
        reason: Reason.INVALID,
      }),
    );
  }

  // check confirmNewPassword
  if (
    'newPassword' in data &&
    data.newPassword != null &&
    'confirmNewPassword' in data &&
    data.confirmNewPassword != null
  ) {
    if (!checkConfirmPassword(data.newPassword, data.confirmNewPassword)) {
      errors.push(
        getValidationErrorMessage({
          context,
          field: 'confirmNewPassword',
          rule: 'newPasswordsDontMatch',
          reason: Reason.INVALID,
        }),
      );
    }
  }

  return errors;
};
