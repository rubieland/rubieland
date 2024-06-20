import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * @param phoneNumber(string): phone number to validate
 * @returns(boolean): returns true if the string is a valid French phone number
 */

export const isValidFrenchPhoneNumber = (phoneNumber: string): boolean => {
  // remove spaces
  const normalizedPhoneNumber = phoneNumber.replace(/\s/g, '');

  // parse phone number
  const parsedPhoneNumber = parsePhoneNumberFromString(
    normalizedPhoneNumber,
    'FR'
  );

  // return true if parsed phone number is defined and valid
  return !!parsedPhoneNumber && parsedPhoneNumber.isValid();
};
