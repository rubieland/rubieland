export const forbiddenCharsRegex: RegExp = /[<>^~|\\{}]/;
export const nameRegex: RegExp = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/i; // accepts only letters, hyphens, spaces, and apostrophes
export const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}$/;
