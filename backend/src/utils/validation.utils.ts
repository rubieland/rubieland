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

/**
 *
 * @param field : the field name
 * @param rule : the validation rule for this field
 * @returns : the validation error message from the translation files to send if the field is not valid
 */
export const getValidationErrorMessage = (
  field: string,
  rule: string,
): string => {
  const fieldName = i18n.t(`validation.fields.${field}`);
  const ruleMessage = i18n.t(`validation.rules.${rule}`);
  const errorMessageTemplate = i18n.t('validation.messages.invalid');

  return errorMessageTemplate
    .replace('{{field}}', fieldName)
    .replace('{{rule}}', ruleMessage);
};
