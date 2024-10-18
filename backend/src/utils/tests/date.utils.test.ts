import {
  calculateAge,
  calculatePastDate,
  checkDateFormat,
  isInFuture,
  isTooOld,
} from '../date.utils';

describe('Date Utils', () => {
  describe('calculateAge', () => {
    it('should calculate the correct age', () => {
      const birthDate = new Date('2000-01-01');
      const age = calculateAge(birthDate);
      const expectedAge = new Date().getFullYear() - 2000;
      expect(age).toBe(expectedAge);
    });

    it('should calculate the correct age when the birthday has not occurred this year', () => {
      const birthDate = new Date('2000-12-31');
      const age = calculateAge(birthDate);
      const expectedAge = new Date().getFullYear() - 2000 - 1;
      expect(age).toBe(expectedAge);
    });
  });

  describe('calculatePastDate', () => {
    it('should calculate the correct past date', () => {
      const years = 10;
      const pastDate = calculatePastDate(years);
      const expectedDate = new Date();
      expectedDate.setFullYear(expectedDate.getFullYear() - years);
      expect(pastDate.getFullYear()).toBe(expectedDate.getFullYear());
      expect(pastDate.getMonth()).toBe(expectedDate.getMonth());
      expect(pastDate.getDate()).toBe(expectedDate.getDate());
    });
  });

  describe('checkDateFormat', () => {
    it('should return true for valid date format', () => {
      const dateString = '2023-10-01';
      expect(checkDateFormat(dateString)).toBe(true);
    });

    it('should return false for invalid date format', () => {
      const dateString = '01-10-2023';
      expect(checkDateFormat(dateString)).toBe(false);
    });
  });

  describe('isInFuture', () => {
    it('should return true for a future date', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      expect(isInFuture(futureDate)).toBe(true);
    });

    it('should return false for a past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      expect(isInFuture(pastDate)).toBe(false);
    });
  });

  describe('isTooOld', () => {
    it('should return true for a date older than the specified years', () => {
      const oldDate = new Date();
      oldDate.setFullYear(oldDate.getFullYear() - 20);
      expect(isTooOld(oldDate, 10)).toBe(true);
    });

    it('should return false for a date within the specified years', () => {
      const recentDate = new Date();
      recentDate.setFullYear(recentDate.getFullYear() - 5);
      expect(isTooOld(recentDate, 10)).toBe(false);
    });
  });
});
