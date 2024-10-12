import { isFormValid } from '../form.utils';

describe('isFormValid', () => {
  it('should return true for an array of non-null and non-empty strings', () => {
    const values = ['value1', 'value2', 'value3'];
    expect(isFormValid(values)).toBe(true);
  });

  it('should return false for an array containing null values', () => {
    const values = ['value1', null, 'value3'];
    expect(isFormValid(values)).toBe(false);
  });

  it('should return false for an array containing empty strings', () => {
    const values = ['value1', '', 'value3'];
    expect(isFormValid(values)).toBe(false);
  });

  it('should return false for an array containing both null and empty strings', () => {
    const values = ['value1', null, ''];
    expect(isFormValid(values)).toBe(false);
  });
});
