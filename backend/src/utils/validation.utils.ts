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
    console.log(formattedNb);

    // return true if parsed phone number is defined and valid
    return !!parsedPhoneNumber && isValidPhoneNumber(formattedNb);
  } catch (error: unknown) {
    if (error instanceof ParseError) {
      console.error(
        `An error occured when trying to parse phone number: ${error}`,
      );
      process.exit(1);
    } else {
      console.error(
        `An error occured when trying to validate phone number: ${error}`,
      );
      process.exit(1);
    }
  }
};

};
