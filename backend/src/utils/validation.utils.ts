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
  ValidatePhoneNumberFunction,
} from '../validation/types/validation.types';
import { forbiddenCharsRegex, nameRegex } from '../validation/Common.validator';
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

export const hasForbiddenChars = (fieldValue: string) => {
  return forbiddenCharsRegex.test(fieldValue);
};
