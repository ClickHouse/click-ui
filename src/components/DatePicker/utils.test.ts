import { datesAreWithinMaxRange, isDateRangeTheWholeMonth } from './utils';

describe('DatePicker utils', () => {
  describe('checking if two dates are fall within a range', () => {
    it('returns true if the two dates are within the range', () => {
      const startDate = new Date('07-01-2025');
      const endDate = new Date('07-08-2025');

      expect(datesAreWithinMaxRange(startDate, endDate, 15)).toBeTruthy();
    });

    it('returns false if the two dates are not within the range', () => {
      const startDate = new Date('07-01-2025');
      const endDate = new Date('07-31-2025');

      expect(datesAreWithinMaxRange(startDate, endDate, 15)).toBeFalsy();
    });

    it('is inclusive with dates', () => {
      const startDate = new Date('07-01-2025');
      const endDate = new Date('07-16-2025');

      expect(datesAreWithinMaxRange(startDate, endDate, 15)).toBeTruthy();
    });
  });

  describe('checking if a date range occupies an entire month', () => {
    it("returns false is the date range don't have the same month", () => {
      const startDate = new Date('07-01-2025');
      const endDate = new Date('08-16-2025');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeFalsy();
    });

    it('returns false is the date range starts before the first day in the same month', () => {
      const startDate = new Date('07-02-2025');
      const endDate = new Date('07-31-2025');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeFalsy();
    });

    it('returns false is the date range ends before the last day in the same month', () => {
      const startDate = new Date('07-01-2025');
      const endDate = new Date('07-30-2025');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeFalsy();
    });

    it('returns true is the date range occupies the whole month', () => {
      let startDate = new Date('07-01-2025');
      let endDate = new Date('07-31-2025');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeTruthy();

      startDate = new Date('08-01-2025');
      endDate = new Date('08-31-2025');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeTruthy();

      startDate = new Date('09-01-2025');
      endDate = new Date('09-30-2025');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeTruthy();

      startDate = new Date('02-01-2025');
      endDate = new Date('02-28-2025');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeTruthy();
    });

    it('handles leap years', () => {
      // 2024 was a leap year
      let startDate = new Date('02-01-2024');
      let endDate = new Date('02-29-2024');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeTruthy();

      startDate = new Date('02-01-2024');
      endDate = new Date('02-28-2024');
      expect(isDateRangeTheWholeMonth({ startDate, endDate })).toBeFalsy();
    });
  });
});
