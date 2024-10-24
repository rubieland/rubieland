import {
  ParseError,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';
import i18n from '../config/i18n';
import {
  DataContext,
  FieldFormatValidatorFunction,
  MinMaxValidatorFunction,
  GetMissingOrEmptyFieldsErrorMessageFunction,
  GetMissingOrEmptyFieldsFunction,
  GetValidationErrorMessageFunction,
  Reason,
} from '../validation/types/validation.types';
import { forbiddenCharsRegex, nameRegex } from '../validation/Common.validator';

/**
 * validates a phone number string
 *
 * @param phoneNumber - the phone number string to validate
 * @returns `true` if the phone number is valid, `false` otherwise
 *
 * @remarks
 * this function uses the `libphonenumber-js` library to parse and validate the phone number
 * it first attempts to parse the phone number using `parsePhoneNumberWithError`
 * if parsing is successful, it formats the phone number to its international format and checks its validity using `isValidPhoneNumber`
 * if an error occurs during parsing, it logs the error and returns `false`
 * if the error is an instance of `ParseError`, it logs a specific message for parsing errors
 * otherwise, it logs a general validation error message
 */
export const validatePhoneNumber = (phoneNumber: string): boolean => {
  try {
    // Attempt to parse the phone number
    const parsedNumber = parsePhoneNumberWithError(phoneNumber);

    // Check if the parsed number is valid
    if (!parsedNumber || !isValidPhoneNumber(phoneNumber)) {
      return false;
    }

    // Return true if the phone number is valid
    return true;
  } catch (error: unknown) {
    // Check if the error is an instance of ParseError
    if (error instanceof ParseError) {
      // Log a specific message for parsing errors
      console.error(
        `An error occurred when trying to parse phone number: ${error.message}`,
      );
    } else {
      // Log a general validation error message
      console.error(`Unexpected error: ${error}`);
    }
    // Return false if an error occurs
    return false;
  }
};

// return a different validation error message from the translation files
export const getValidationErrorMessage: GetValidationErrorMessageFunction = ({
  field,
  rule,
  minLength,
  maxLength,
  min,
  max,
  reason,
  context,
}): string => {
  const fieldName = i18n.t(`validation.fields.${context}.${field}`);
  const ruleMessage = i18n.t(`validation.rules.${context}.${rule}`);
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
    case Reason.MIN:
      result = errorMessageTemplate
        .replace('{{field}}', fieldName)
        .replace('{{min}}', String(min));
      break;
    case Reason.MAX:
      result = errorMessageTemplate
        .replace('{{field}}', fieldName)
        .replace('{{max}}', String(max));
      break;
    case Reason.HAS_FORBIDDEN_CHARS:
      result = errorMessageTemplate.replace('{{field}}', fieldName);
      break;
    case Reason.INVALID_DATE_FORMAT:
      result = errorMessageTemplate
        .replace('{{field}}', fieldName)
        .replace('{{rule}}', ruleMessage);
      break;
    case Reason.FUTURE_DATE:
      result = errorMessageTemplate.replace('{{field}}', fieldName);
      break;
    case Reason.TOO_OLD:
      result = errorMessageTemplate
        .replace('{{field}}', fieldName)
        .replace('{{min}}', String(min));
      break;
    default:
      result = i18n
        .t('validation.messages.default')
        .replace('{{field}}', fieldName);
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
  (context: DataContext, fields: string[]): string[] => {
    const errors: string[] = [];
    fields.forEach((field) => {
      errors.push(
        getValidationErrorMessage({
          context,
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
export const checkMinLength: MinMaxValidatorFunction = (
  fieldValue: string | number,
  minLength: number,
) => {
  return String(fieldValue).length >= minLength;
};

// check if the field value length is lower than the maxLength limit
export const checkMaxLength: MinMaxValidatorFunction = (
  fieldValue: string | number,
  maxLength: number,
) => {
  return String(fieldValue).length <= maxLength;
};

// check if the field value is higher than the min limit
export const checkMin: MinMaxValidatorFunction = (
  fieldValue: string | number,
  min: number,
) => {
  return Number(fieldValue) >= min;
};

// check if the field value is lower than the max limit
export const checkMax: MinMaxValidatorFunction = (
  fieldValue: string | number,
  max: number,
) => {
  return Number(fieldValue) <= max;
};

// check if the field value format corresponds to the regex
export const checkFieldFormat: FieldFormatValidatorFunction = (
  fieldValue: string,
) => {
  return nameRegex.test(fieldValue);
};

// check if the field value contains any forbidden characters
export const hasForbiddenChars = (fieldValue: string) => {
  return forbiddenCharsRegex.test(fieldValue);
};
