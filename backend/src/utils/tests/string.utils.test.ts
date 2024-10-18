import {
  capitalize,
  trimData,
  formatName,
  convertStringToBoolean,
} from '../string.utils';

describe('String Utils', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('should return an empty string if input is empty', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('trimData', () => {
    it('should trim all string properties in an object', () => {
      const data = { name: ' John ', age: 30, city: ' New York ' };
      const trimmedData = trimData(data);
      expect(trimmedData).toEqual({ name: 'John', age: 30, city: 'New York' });
    });

    it('should handle empty strings and non-string properties', () => {
      const data = { name: ' ', age: 30, city: null };
      const trimmedData = trimData(data);
      expect(trimmedData).toEqual({ name: '', age: 30, city: null });
    });
  });

  describe('formatName', () => {
    it('should format names with the first letter capitalized', () => {
      expect(formatName('john doe')).toBe('John Doe');
      expect(formatName("o'connor")).toBe("O'Connor");
      expect(formatName('mary-jane')).toBe('Mary-Jane');
    });

    it('should handle single word names', () => {
      expect(formatName('john')).toBe('John');
    });

    it('should handle empty strings', () => {
      expect(formatName('')).toBe('');
    });
  });

  describe('convertStringToBoolean', () => {
    it('should convert "true" to true', () => {
      expect(convertStringToBoolean('true')).toBe(true);
    });

    it('should convert any other string to false', () => {
      expect(convertStringToBoolean('false')).toBe(false);
      expect(convertStringToBoolean('')).toBe(false);
      expect(convertStringToBoolean('random')).toBe(false);
    });
  });
});
