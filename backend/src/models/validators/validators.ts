export const regexes = {
  nameField: /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/i, // accepts only letters, hyphens, spaces, and apostrophes
  password: /^(?!.*[<>{}()\\`]).*$/, // does not accept the following characters: : < > ( ) { } \ and ``
};
