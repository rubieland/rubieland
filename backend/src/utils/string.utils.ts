// capitalize the first letter of a string
export const capitalize = (str: string) => {
  if (str.length === 0) return str;

  return str.replace(str[0], str[0].toUpperCase());
};

// trim inputs data
export const trimData = (data: any) => {
  for (const key in data) {
    if (typeof data[key] === 'string') data[key] = data[key]?.trim() ?? '';
  }
  return data;
};

/**
 * format names with the first letter capitalized,
 * including the first letters after hyphens, apostrophes, and spaces
 *
 * @param {string} name - the name to be formatted
 * @return {string} - the formatted name
 * @example
 * formatName("john doe") // "John Doe"
 * formatName("o'connor") // "O'Connor"
 */
export const formatName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/(^\w|[-' ]\w)/g, (match) => match.toUpperCase());
};

export const convertStringToBoolean = (value: string) => {
  return value === 'true';
};
