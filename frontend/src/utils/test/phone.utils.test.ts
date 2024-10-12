import { validatePhoneNumber } from '../phone.utils';

describe('validatePhoneNumber', () => {
  it('should return true for a valid US phone number', () => {
    const validPhoneNumber = '+14155552671';
    expect(validatePhoneNumber(validPhoneNumber)).toBe(true);
  });

  it('should return false for an invalid phone number', () => {
    const invalidPhoneNumber = '12345';
    expect(validatePhoneNumber(invalidPhoneNumber)).toBe(false);
  });

  it('should return true for a valid UK phone number', () => {
    const validPhoneNumber = '+447911123456';
    expect(validatePhoneNumber(validPhoneNumber)).toBe(true);
  });

  it('should return true for a valid French phone number', () => {
    const validPhoneNumber = '+33612345678';
    expect(validatePhoneNumber(validPhoneNumber)).toBe(true);
  });

  it('should return true for a valid Spanish phone number', () => {
    const validPhoneNumber = '+34612345678';
    expect(validatePhoneNumber(validPhoneNumber)).toBe(true);
  });

  it('should return true for a valid Belgian phone number', () => {
    const validPhoneNumber = '+32491234567';
    expect(validatePhoneNumber(validPhoneNumber)).toBe(true);
  });

  it('should return false for an invalid UK phone number', () => {
    const invalidPhoneNumber = '+447911';
    expect(validatePhoneNumber(invalidPhoneNumber)).toBe(false);
  });

  it('should return false for an invalid French phone number', () => {
    const invalidPhoneNumber = '+33612';
    expect(validatePhoneNumber(invalidPhoneNumber)).toBe(false);
  });

  it('should return false for an invalid Spanish phone number', () => {
    const invalidPhoneNumber = '+34612';
    expect(validatePhoneNumber(invalidPhoneNumber)).toBe(false);
  });

  it('should return false for an invalid Belgian phone number', () => {
    const invalidPhoneNumber = '+32491';
    expect(validatePhoneNumber(invalidPhoneNumber)).toBe(false);
  });

  // Additional test cases for invalid country codes
  it('should return false for a phone number with an invalid country code', () => {
    const invalidCountryCodePhoneNumber = '+99912345678';
    expect(validatePhoneNumber(invalidCountryCodePhoneNumber)).toBe(false);
  });

  // Additional test cases for unexpected errors
  it('should return false for a phone number with unexpected characters', () => {
    const unexpectedCharactersPhoneNumber = '+1A4155552671';
    expect(validatePhoneNumber(unexpectedCharactersPhoneNumber)).toBe(false);
  });
});
