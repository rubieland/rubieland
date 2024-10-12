/**
 * checks if all values in the provided array are non-null and non-empty
 *
 * @param values - an array of strings or null values to be validated
 * @returns a boolean indicating whether all values are valid (i.e., non-null and non-empty)
 */
export const isFormValid = (values: Array<string | null>) => {
  return values.reduce((acc, value) => acc && !!value, true);
};
