import {
  ParseError,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import i18n from '../config/i18n';
import {
  FieldFormatValidatorFunction,
  FieldLengthValidatorFunction,
  GetMissingOrEmptyFieldsErrorMessageFunction,
  GetMissingOrEmptyFieldsFunction,
  GetValidationErrorMessageFunction,
  Reason,
  ValidatePhoneNumberFunction,
} from '../validation/types/validation.types';
import { regexes } from '../validation/User.validators';
import { UserField } from '../models/types/User.types';

/**
 * @param phoneNumber(string): phone number to validate
 * @returns(boolean): returns true if the string is a valid international phone number
 */

export const validatePhoneNumber: ValidatePhoneNumberFunction = (
  phoneNumber: string,
): boolean => {
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

// return a different validation error message from the translation files
export const getValidationErrorMessage: GetValidationErrorMessageFunction = ({
  field,
  rule,
  minLength,
  maxLength,
  reason,
}): string => {
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
        .replace('{{minLength}}', String(minLength));
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
export const getMissingOrEmptyFields: GetMissingOrEmptyFieldsFunction = (
  data: any,
): string[] => {
  const invalidFields = [];
  for (const [key, value] of Object.entries(data)) {
    if (!value || (typeof value === 'string' && value === '')) {
      invalidFields.push(key);
    }
  }
  return invalidFields;
};

// return an array validation error messages for all missing or empty fields
export const getMissingOrEmptyFieldsErrorMessage: GetMissingOrEmptyFieldsErrorMessageFunction =
  (fields: string[]): string[] => {
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

// check if the field value length is higher than the minLength limit
export const checkMinLength: FieldLengthValidatorFunction = (
  field: string,
  value: string,
  minLength: number,
) => {
  return value.length < minLength
    ? getValidationErrorMessage({
        field,
        minLength,
        reason: Reason.MINLENGTH,
      })
    : '';
};

// check if the field value length is lower than the maxLength limit
export const checkMaxLength: FieldLengthValidatorFunction = (
  field: string,
  value: string,
  maxLength: number,
) => {
  return value.length > maxLength
    ? getValidationErrorMessage({
        field,
        maxLength,
        reason: Reason.MAXLENGTH,
      })
    : '';
};

// check if the field value format corresponds to the regex
export const checkFieldFormat: FieldFormatValidatorFunction = (
  fieldType: UserField,
  fieldValue: string,
) => {
  return !regexes.nameField.test(fieldValue)
    ? getValidationErrorMessage({
        field: fieldType,
        rule: fieldType,
        reason: Reason.INVALID,
      })
    : '';
};

// TODO: add checkAvatar function
