import {
  ParseError,
  isValidPhoneNumber,
  parsePhoneNumberWithError,
} from 'libphonenumber-js';

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
