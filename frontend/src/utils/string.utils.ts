/**
 * regular expression to match forbidden characters
 * the forbidden characters are: <, >, ^, ~, |, \, {, }
 */
export const forbiddenCharsRegex: RegExp = /[<>^~|\\{}]/;

/**
 * adds an asterisk at the end of a text if there isn't already one
 *
 * @param text - the text to which an asterisk will be added
 * @returns the text with an asterisk added at the end, unless it already ends with an asterisk
 */
export const addAsterisk = (text: string): string => {
  if (text.endsWith(' *') || text === '') {
    return text;
  } else {
    return text + ' *';
  }
};

/**
 * checks if a given string contains any forbidden characters
 *
 * @param fieldValue - the string to be checked for forbidden characters
 * @returns true if the string contains any forbidden characters, false otherwise
 */
export const hasForbiddenChars = (fieldValue: string) => {
  return forbiddenCharsRegex.test(fieldValue);
};
