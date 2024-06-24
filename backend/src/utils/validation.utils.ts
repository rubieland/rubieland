import {
  ParseError,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import i18n from '../config/i18n';

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

// enum for the reasons of a field validation fail
export enum Reason {
  INVALID = 'invalid',
  REQUIRED = 'required',
  MINLENGTH = 'minLength',
  MAXLENGTH = 'maxLength',
}

interface GetValidationErrorMessageInterface {
  field: string;
  rule?: string;
  minLength?: number;
  maxLength?: number;
  reason: Reason;
}

// return a different validation error message from the translation files
// depending on the params
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

// extract custom error message from mongoose validation error object
export const extractValidationErrorMessages = (error: any) => {
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map((err: any) => err.message);
    return messages;
  }
  return [error.message];
};
