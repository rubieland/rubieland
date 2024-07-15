import validator from 'validator';

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

/**
 * check if a date is valid and in ISO 8601 format
 * @param {Date} date - the date to validate
 * @returns {boolean} - returns true if the date is valid
 */
export const isValidDate = (date: Date): boolean => {
  return validator.isDate(date.toISOString(), {
    format: 'DD-MM-YYYY',
    strictMode: true,
  });
};

/**
 * check if a date is before the current date
 * @param {Date} date - the date to validate
 * @returns {boolean} - returns true if the date is not in the future
 */
export const isNotInFuture = (date: Date): boolean => {
  return validator.isBefore(date.toISOString(), new Date().toISOString());
};

/**
 * check if a date is not too old (e.g., not more than a specified number of years)
 * @param {Date} date - the date to validate
 * @param {number} years - the number of years to check
 * @returns {boolean} - returns true if the date is not too old
 */
export const isNotTooOld = (date: Date, years = 25): boolean => {
  const limitDate = new Date();
  limitDate.setFullYear(limitDate.getFullYear() - years);
  return validator.isAfter(date.toISOString(), limitDate.toISOString());
};
