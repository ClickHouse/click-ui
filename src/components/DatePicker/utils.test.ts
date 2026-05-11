import {
  DateRange,
  dateRangeIsValid,
  datesAreWithinMaxRange,
  formatSelectedDate,
  formatSelectedDateTime,
  shiftFromTimezone,
  isDateRangeTheWholeMonth,
  shiftToTimezone,
} from './utils';

describe('DatePicker utils', () => {
  describe('checking if two dates fall within a range', () => {
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

    describe('when checking against UTC calendar boundaries', () => {
      it('treats a range that spans a full UTC month as the whole month', () => {
        const startDate = new Date('2026-04-01T00:00:00Z');
        const endDate = new Date('2026-04-30T23:59:59.999Z');
        expect(isDateRangeTheWholeMonth({ startDate, endDate }, 'UTC')).toBeTruthy();
      });
    });
  });

  describe('formatting dates in UTC mode', () => {
    it('renders the calendar day from the UTC fields of the date', () => {
      const date = new Date('2026-04-30T01:00:00Z');
      expect(formatSelectedDate('UTC', date)).toBe('Apr 30, 2026');
    });

    it('renders the time of day from the UTC hour and minute', () => {
      const date = new Date('2026-04-30T14:30:00Z');
      expect(formatSelectedDateTime('UTC', date)).toMatch(/02:30\s?PM/);
    });
  });

  describe('validating a date range', () => {
    it('rejects a range with no start date', () => {
      expect(
        dateRangeIsValid({
          startDate: undefined as unknown as Date,
          endDate: new Date('2026-04-30'),
        })
      ).toBe(false);
    });

    it('rejects a range with no end date', () => {
      expect(
        dateRangeIsValid({
          startDate: new Date('2026-04-01'),
          endDate: undefined as unknown as Date,
        })
      ).toBe(false);
    });

    it('rejects a null date range', () => {
      expect(dateRangeIsValid(null as unknown as DateRange)).toBe(false);
    });

    it('rejects a start date that is a date-shaped string', () => {
      expect(
        dateRangeIsValid({
          startDate: '2026-04-01' as unknown as Date,
          endDate: new Date('2026-04-30'),
        })
      ).toBe(false);
    });

    it('rejects an end date that is a date-shaped string', () => {
      expect(
        dateRangeIsValid({
          startDate: new Date('2026-04-01'),
          endDate: '2026-04-30' as unknown as Date,
        })
      ).toBe(false);
    });

    it('rejects a start date that is a Date holding NaN', () => {
      expect(
        dateRangeIsValid({
          startDate: new Date('not-a-date'),
          endDate: new Date('2026-04-30'),
        })
      ).toBe(false);
    });

    it('rejects an end date that is a Date holding NaN', () => {
      expect(
        dateRangeIsValid({
          startDate: new Date('2026-04-01'),
          endDate: new Date('not-a-date'),
        })
      ).toBe(false);
    });

    it('rejects a range whose start date is after its end date', () => {
      expect(
        dateRangeIsValid({
          startDate: new Date('2026-04-30'),
          endDate: new Date('2026-04-01'),
        })
      ).toBe(false);
    });

    it('accepts a range spanning multiple days', () => {
      expect(
        dateRangeIsValid({
          startDate: new Date('2026-04-01'),
          endDate: new Date('2026-04-30'),
        })
      ).toBe(true);
    });

    it('accepts a range where start and end are the same date', () => {
      const date = new Date('2026-04-15T12:00:00Z');
      expect(
        dateRangeIsValid({
          startDate: date,
          endDate: new Date(date.getTime()),
        })
      ).toBe(true);
    });

    it('accepts a range starting at the unix epoch', () => {
      expect(
        dateRangeIsValid({
          startDate: new Date(0),
          endDate: new Date('2026-04-30'),
        })
      ).toBe(true);
    });
  });

  describe('translating an date for the calendar grid', () => {
    describe('when running in local mode', () => {
      it('passes the date through unchanged in both directions', () => {
        const date = new Date('2026-04-30T01:00:00Z');
        expect(shiftToTimezone(date, 'system')).toBe(date);
        expect(shiftFromTimezone(date, 'system')).toBe(date);
      });
    });

    describe('when running in UTC mode on a host west of UTC', () => {
      // Pretend the host is UTC-7 (PDT, offset = 420 min).
      let offsetSpy: ReturnType<typeof vi.spyOn>;
      beforeEach(() => {
        offsetSpy = vi.spyOn(Date.prototype, 'getTimezoneOffset').mockReturnValue(420);
      });
      afterEach(() => {
        offsetSpy.mockRestore();
      });

      it('shifts the date forward by the host offset so local-time getters yield UTC values', () => {
        const original = new Date('2026-04-30T01:00:00Z');
        const shifted = shiftToTimezone(original, 'UTC');
        expect(shifted.getTime() - original.getTime()).toBe(420 * 60_000);
      });

      it('recovers midnight UTC when un-shifting a midnight-local cell from the calendar grid', () => {
        // Midnight Apr 30 on a UTC-7 host = 2026-04-30T07:00:00Z.
        const cell = new Date('2026-04-30T07:00:00Z');
        expect(shiftFromTimezone(cell, 'UTC').toISOString()).toBe(
          '2026-04-30T00:00:00.000Z'
        );
      });
    });

    describe('when a round-trip crosses a DST transition', () => {
      it('drifts by one hour because each direction reads its own offset', () => {
        // Fake a DST transition at 10:00Z (offset 480 → 420). Forward shift
        // crosses into DST; reverse shift uses the smaller offset, drifting +1h.
        const dstStart = new Date('2026-03-08T10:00:00Z').getTime();
        const offsetSpy = vi
          .spyOn(Date.prototype, 'getTimezoneOffset')
          .mockImplementation(function (this: Date) {
            return this.getTime() < dstStart ? 480 : 420;
          });
        try {
          const original = new Date('2026-03-08T07:30:00Z');
          const restored = shiftFromTimezone(shiftToTimezone(original, 'UTC'), 'UTC');
          expect(restored.getTime() - original.getTime()).toBe(60 * 60_000);
        } finally {
          offsetSpy.mockRestore();
        }
      });
    });
  });
});
