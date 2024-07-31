import { isAfter } from 'date-fns';

export const currentYear = new Date().getFullYear();

/**
 * Check if a given date is at least n years old
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
