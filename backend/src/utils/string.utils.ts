// capitalize the first letter of a string
// TODO: add check if str is undefined ?
export const capitalize = (str: string) => {
  return str.replace(str[0], str[0].toUpperCase());
};

// trim inputs data
export const trimData = (data: any) => {
  for (const key in data) {
    if (typeof data[key] === 'string') data[key] = data[key]?.trim() ?? '';
  }
  return data;
};
