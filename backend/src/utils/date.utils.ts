import validator from 'validator';
import { dateRegex } from '../validation/Common.validator';

/**
 * calculate current age using date of birth
 * @param birthDate Date of birth
 * @returns Current age
 */
export const calculateAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

// calculate new date n years before the current date
export const calculatePastDate = (years: number) => {
  const currentDate = new Date();
  const pastDate = new Date();
  pastDate.setFullYear(currentDate.getFullYear() - years);
  return pastDate;
};

// check that the date string is in YYYY-MM-DD format
export const checkDateFormat = (dateString: string) => {
  return dateRegex.test(dateString);
};

/**
 * check if a date is before the current date
 * @param {Date} date - the date to validate
 * @returns {boolean} - returns true if the date is not in the future
 */
export const isInFuture = (date: Date): boolean => {
  return validator.isAfter(date.toISOString(), new Date().toISOString());
};

/**
 * check if a date is not too old (e.g., not more than a specified number of years)
 * @param {Date} date - the date to validate
 * @param {number} years - the number of years to check
 * @returns {boolean} - returns true if the date is not too old
 */
export const isTooOld = (date: Date, years: number): boolean => {
  const limitDate = new Date();
  limitDate.setFullYear(limitDate.getFullYear() - years);
  return validator.isBefore(date.toISOString(), limitDate.toISOString());
};
