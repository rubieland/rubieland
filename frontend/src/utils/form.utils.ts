export const isFormValid = (values: Array<string | null>) => {
  return values.reduce((acc, value) => acc && !!value, true);
};
