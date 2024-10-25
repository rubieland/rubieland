import {
  checkFieldFormat,
  checkMaxLength,
  checkMinLength,
  getValidationErrorMessage,
  hasForbiddenChars,
} from '../utils/validation.utils';
import {
  DataContext,
  Reason,
  StringDataLengths,
} from './types/validation.types';
import { checkEmail } from './User.validators';

export interface ContactMessageBody {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const context = DataContext.CONTACT;

const contactDataLengths: StringDataLengths = {
  fullName: {
    minLength: 4,
    maxLength: 60,
  },
  email: {
    minLength: 5,
    maxLength: 60,
  },
  subject: {
    minLength: 5,
    maxLength: 100,
  },
  message: {
    minLength: 5,
    maxLength: 5000,
  },
};

export const checkContactData = (data: ContactMessageBody) => {
  const errors: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key in contactDataLengths) {
      const fieldKey = key as keyof ContactMessageBody;

      if (typeof value === 'string') {
        // check forbidden characters
        if (hasForbiddenChars(value)) {
          errors.push(
            getValidationErrorMessage({
              context,
              field: fieldKey,
              reason: Reason.HAS_FORBIDDEN_CHARS,
            }),
          );
        }

        // check maxLengths
        if (!checkMaxLength(value, contactDataLengths[fieldKey].maxLength)) {
          errors.push(
            getValidationErrorMessage({
              context,
              field: fieldKey,
              maxLength: contactDataLengths[fieldKey].maxLength,
              reason: Reason.MAXLENGTH,
            }),
          );
        }

        // check minLengths
        if (!checkMinLength(value, contactDataLengths[fieldKey].minLength)) {
          errors.push(
            getValidationErrorMessage({
              context,
              field: fieldKey,
              minLength: contactDataLengths[fieldKey].minLength,
              reason: Reason.MINLENGTH,
            }),
          );
        }

        // check fullName field
        if (fieldKey === 'fullName' && !checkFieldFormat(value)) {
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
      }
    }
  }

  return errors;
};
