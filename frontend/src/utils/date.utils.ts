import { isAfter } from 'date-fns';

export const currentYear = new Date().getFullYear();

/**
 * check if a given date is at least n years old
 * @param dateToCheck the date string to check, formatted as YYYY-MM-DD
 * @param n the limit number of years dateToCheck must not exceed
 * @returns a boolean indicating if the date is at least n years old
 */
export const isAtLeastNYearsOld = (dateToCheck: string, n: number) => {
  const nYearsAgo = new Date();
  nYearsAgo.setFullYear(nYearsAgo.getFullYear() - n);
  const birthDate = new Date(dateToCheck);
  return birthDate <= nYearsAgo;
};

/**
 * check if a date is before the current date
 * @param {string} date - the date to validate
 * @returns {boolean} - returns true if the date is not in the future
 */
export const isInFuture = (date: string): boolean => {
  return isAfter(date, new Date().toISOString());
};

/**
 * format a date object to a string in YYYY-MM-DD format
 * @param date - the date object to format
 * @returns a string representing the date in YYYY-MM-DD format
 */
export const formatDateYYYYMMDD = (date: Date) => {
  const dateToISOString = date.toISOString();
  return dateToISOString.split('T')[0];
};

/**
 * calculate the minimum date by subtracting a number of years from a given date
 * and format it to a string in YYYY-MM-DD format
 * @param date - the date object to calculate from
 * @param min - the number of years to subtract
 * @returns a string representing the calculated date in YYYY-MM-DD format
 */
export const calculateMinDateYYYYMMDD = (date: Date, min: number) => {
  return new Date(date.setFullYear(date.getFullYear() - min))
    .toISOString()
    .split('T')[0];
};
