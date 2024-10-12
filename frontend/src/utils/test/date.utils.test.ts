import {
  isAtLeastNYearsOld,
  isInFuture,
  formatDateYYYYMMDD,
  calculateMinDateYYYYMMDD,
} from '../date.utils';

describe('date.utils', () => {
  describe('isAtLeastNYearsOld', () => {
    it('should return true if the date is at least n years old', () => {
      const dateToCheck = '2000-01-01';
      const n = 20;
      expect(isAtLeastNYearsOld(dateToCheck, n)).toBe(true);
    });

    it('should return false if the date is not at least n years old', () => {
      const dateToCheck = '2010-01-01';
      const n = 20;
      expect(isAtLeastNYearsOld(dateToCheck, n)).toBe(false);
    });
  });

  describe('isInFuture', () => {
    it('should return true if the date is in the future', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      expect(isInFuture(futureDate.toISOString().split('T')[0])).toBe(true);
    });

    it('should return false if the date is not in the future', () => {
      const pastDate = new Date();
      pastDate.setFullYear(pastDate.getFullYear() - 1);
      expect(isInFuture(pastDate.toISOString().split('T')[0])).toBe(false);
    });
  });

  describe('formatDateYYYYMMDD', () => {
    it('should format a date as YYYY-MM-DD', () => {
      const date = new Date('2023-10-01T00:00:00Z');
      expect(formatDateYYYYMMDD(date)).toBe('2023-10-01');
    });
  });

  describe('calculateMinDateYYYYMMDD', () => {
    it('should calculate the minimum date as YYYY-MM-DD', () => {
      const date = new Date('2023-10-01T00:00:00Z');
      const min = 5;
      expect(calculateMinDateYYYYMMDD(date, min)).toBe('2018-10-01');
    });
  });
});
