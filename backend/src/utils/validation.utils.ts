import {
  ParseError,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import i18n from '../config/i18n';
import { Reason } from '../validation/types/validation.types';

/**
 * @param phoneNumber(string): phone number to validate
 * @returns(boolean): returns true if the string is a valid international phone number
 */

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  try {
    // parse phone number
    const parsedPhoneNumber = parsePhoneNumberWithError(phoneNumber);

    const formattedNb = parsedPhoneNumber.formatInternational();

    // return true if parsed phone number is defined and valid
    return !!parsedPhoneNumber && isValidPhoneNumber(formattedNb);
  } catch (error: unknown) {
    if (error instanceof ParseError) {
      console.error(
        `An error occured when trying to parse phone number: ${error}`,
      );
      return false;
    } else {
      console.error(
        `An error occured when trying to validate phone number: ${error}`,
      );
      return false;
    }
  }
};

interface GetValidationErrorMessageInterface {
  field: string;
  rule?: string;
  minLength?: number;
  maxLength?: number;
  reason: Reason;
}

// return a different validation error message from the translation files
export const getValidationErrorMessage = ({
  field,
  rule,
  minLength,
  maxLength,
  reason,
}: GetValidationErrorMessageInterface): string => {
  const fieldName = i18n.t(`validation.fields.${field}`);
  const ruleMessage = i18n.t(`validation.rules.${rule}`);
  const errorMessageTemplate = i18n.t(`validation.messages.${reason}`);
  let result = '';
  switch (reason) {
    case Reason.INVALID:
      result = errorMessageTemplate
        .replace('{{field}}', fieldName)
        .replace('{{rule}}', ruleMessage);
      break;
    case Reason.REQUIRED:
      result = errorMessageTemplate.replace('{{field}}', fieldName);
      break;
    case Reason.MINLENGTH:
      result = errorMessageTemplate
        .replace('{{field}}', fieldName)
        .replace('{{minlength}}', String(minLength));
      break;
    case Reason.MAXLENGTH:
      result = errorMessageTemplate
        .replace('{{field}}', fieldName)
        .replace('{{maxLength}}', String(maxLength));
      break;
    default:
      result = '';
  }
  return result;
};

// return an array of missing or empty field names
export const getMissingOrEmptyFields = (data: any): string[] => {
  const invalidFields = [];
  for (const [key, value] of Object.entries(data)) {
    console.log(key, ': ', value);
    if (!value || (typeof value === 'string' && value === '')) {
      invalidFields.push(key);
    }
  }
  return invalidFields;
};

// return an array validation error messages for all missing or empty fields
export const getMissingOrEmptyFieldsErrorMessage = (
  fields: string[],
): string[] => {
  const errors: string[] = [];
  fields.forEach((field) => {
    errors.push(
      getValidationErrorMessage({
        field,
        reason: Reason.REQUIRED,
      }),
    );
  });
  return errors;
};

// extract custom error message from mongoose validation error object
export const extractValidationErrorMessagesFromError = (error: any) => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((err: any) => err.message);
    return messages;
  }
  return [error.message];
};
