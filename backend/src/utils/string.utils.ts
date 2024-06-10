// capitalize the first letter of a string
// TODO: add check if str is undefined ?
export const capitalize = (str: string) => {
  return str.replace(str[0], str[0].toUpperCase());
};
