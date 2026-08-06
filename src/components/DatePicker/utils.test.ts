import {
  DateRange,
  areDatesWithinMaxRange,
  formatSelectedDate,
  formatSelectedDateTime,
  isDateNotInAllowList,
  isDateRangeTheWholeMonth,
  isDateRangeValid,
  isDateRangeWithinRange,
  shiftFromTimezone,
  shiftToTimezone,
} from './utils';

describe('DatePicker utils', () => {
  describe('checking if two dates fall within a range', () => {
    it('returns true if the two dates are within the range', () => {
      const startDate = new Date('07-01-2025');
      const endDate = new Date('07-08-2025');

      expect(areDatesWithinMaxRange(startDate, endDate, 15)).toBeTruthy();
    });

    it('returns false if the two dates are not within the range', () => {
      const startDate = new Date('07-01-2025');
      const endDate = new Date('07-31-2025');

      expect(areDatesWithinMaxRange(startDate, endDate, 15)).toBeFalsy();
    });

    it('counts both endpoints towards the range', () => {
      const startDate = new Date('07-01-2025');

      expect(areDatesWithinMaxRange(startDate, new Date('07-15-2025'), 15)).toBeTruthy();
      expect(areDatesWithinMaxRange(startDate, new Date('07-16-2025'), 15)).toBeFalsy();
    });

    it('ignores the time of day', () => {
      const startDate = new Date('07-01-2025 12:00');

      expect(
        areDatesWithinMaxRange(startDate, new Date('07-15-2025 00:00'), 15)
      ).toBeTruthy();
      expect(
        areDatesWithinMaxRange(startDate, new Date('07-16-2025 00:00'), 15)
      ).toBeFalsy();
    });
  });

  describe('matching a selected range against a predefined range', () => {
    const pastWeek: DateRange = {
      startDate: new Date('July 28 2025 14:30'),
      endDate: new Date('August 04 2025 14:30'),
    };

    it('matches a multi-day range picked by hand on the same dates', () => {
      const handPicked: DateRange = {
        startDate: new Date('July 28 2025 12:00'),
        endDate: new Date('August 04 2025 12:00'),
      };

      expect(isDateRangeWithinRange(handPicked, pastWeek)).toBeTruthy();
    });

    it('does not match a multi-day range on different dates', () => {
      const handPicked: DateRange = {
        startDate: new Date('July 27 2025 12:00'),
        endDate: new Date('August 04 2025 12:00'),
      };

      expect(isDateRangeWithinRange(handPicked, pastWeek)).toBeFalsy();
    });

    it('tolerates the drift of a predefined list rebuilt a moment later', () => {
      const rebuilt: DateRange = {
        startDate: new Date('July 28 2025 14:30:02'),
        endDate: new Date('August 04 2025 14:30:02'),
      };

      expect(isDateRangeWithinRange(rebuilt, pastWeek)).toBeTruthy();
    });

    describe('when configured for the UTC timezone', () => {
      it('matches on UTC calendar days, not local ones', () => {
        // Same UTC days at both ends, but times that land on a different local day.
        const predefinedRange: DateRange = {
          startDate: new Date('2025-08-04T02:00:00Z'),
          endDate: new Date('2025-08-11T02:00:00Z'),
        };
        const middleOfTheUtcDay: DateRange = {
          startDate: new Date('2025-08-04T12:00:00Z'),
          endDate: new Date('2025-08-11T12:00:00Z'),
        };
        const endOfTheUtcDay: DateRange = {
          startDate: new Date('2025-08-04T22:00:00Z'),
          endDate: new Date('2025-08-11T22:00:00Z'),
        };

        expect(
          isDateRangeWithinRange(middleOfTheUtcDay, predefinedRange, 'UTC')
        ).toBeTruthy();
        expect(
          isDateRangeWithinRange(endOfTheUtcDay, predefinedRange, 'UTC')
        ).toBeTruthy();
      });

      it('does not match a range on a different UTC day', () => {
        const predefinedRange: DateRange = {
          startDate: new Date('2025-08-04T02:00:00Z'),
          endDate: new Date('2025-08-11T02:00:00Z'),
        };
        const aDayLate: DateRange = {
          startDate: new Date('2025-08-05T02:00:00Z'),
          endDate: new Date('2025-08-11T02:00:00Z'),
        };

        expect(isDateRangeWithinRange(aDayLate, predefinedRange, 'UTC')).toBeFalsy();
      });
    });

    describe('for ranges shorter than a day', () => {
      const pastHour: DateRange = {
        startDate: new Date('August 04 2025 13:30'),
        endDate: new Date('August 04 2025 14:30'),
      };

      it('matches on time, within a minute of drift', () => {
        const rebuilt: DateRange = {
          startDate: new Date('August 04 2025 13:30:20'),
          endDate: new Date('August 04 2025 14:30:20'),
        };

        expect(isDateRangeWithinRange(rebuilt, pastHour)).toBeTruthy();
      });

      it('does not match another range on the same dates', () => {
        const pastSixHours: DateRange = {
          startDate: new Date('August 04 2025 08:30'),
          endDate: new Date('August 04 2025 14:30'),
        };

        expect(isDateRangeWithinRange(pastSixHours, pastHour)).toBeFalsy();
      });
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

  describe('checking if a date is excluded by an allow-list', () => {
    it('returns false when there is no allow-list (undefined)', () => {
      expect(isDateNotInAllowList(undefined, new Date('07-04-2025'))).toBe(false);
    });

    it('returns false when the allow-list is empty', () => {
      expect(isDateNotInAllowList([], new Date('07-04-2025'))).toBe(false);
    });

    it('returns false when the date is in the allow-list', () => {
      const allowList = [new Date('07-04-2025'), new Date('07-06-2025')];
      expect(isDateNotInAllowList(allowList, new Date('07-06-2025'))).toBe(false);
    });

    it('returns true when the date is not in the allow-list', () => {
      const allowList = [new Date('07-04-2025'), new Date('07-06-2025')];
      expect(isDateNotInAllowList(allowList, new Date('07-05-2025'))).toBe(true);
    });

    it('matches by calendar day, ignoring the time of day', () => {
      const allowList = [new Date('2025-07-04T00:00:00')];
      // Same calendar day, different time — still counts as allowed.
      expect(isDateNotInAllowList(allowList, new Date('2025-07-04T23:59:59'))).toBe(
        false
      );
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
        isDateRangeValid({
          startDate: undefined as unknown as Date,
          endDate: new Date('2026-04-30'),
        })
      ).toBe(false);
    });

    it('rejects a range with no end date', () => {
      expect(
        isDateRangeValid({
          startDate: new Date('2026-04-01'),
          endDate: undefined as unknown as Date,
        })
      ).toBe(false);
    });

    it('rejects a null date range', () => {
      expect(isDateRangeValid(null as unknown as DateRange)).toBe(false);
    });

    it('rejects a start date that is a date-shaped string', () => {
      expect(
        isDateRangeValid({
          startDate: '2026-04-01' as unknown as Date,
          endDate: new Date('2026-04-30'),
        })
      ).toBe(false);
    });

    it('rejects an end date that is a date-shaped string', () => {
      expect(
        isDateRangeValid({
          startDate: new Date('2026-04-01'),
          endDate: '2026-04-30' as unknown as Date,
        })
      ).toBe(false);
    });

    it('rejects a start date that is a Date holding NaN', () => {
      expect(
        isDateRangeValid({
          startDate: new Date('not-a-date'),
          endDate: new Date('2026-04-30'),
        })
      ).toBe(false);
    });

    it('rejects an end date that is a Date holding NaN', () => {
      expect(
        isDateRangeValid({
          startDate: new Date('2026-04-01'),
          endDate: new Date('not-a-date'),
        })
      ).toBe(false);
    });

    it('rejects a range whose start date is after its end date', () => {
      expect(
        isDateRangeValid({
          startDate: new Date('2026-04-30'),
          endDate: new Date('2026-04-01'),
        })
      ).toBe(false);
    });

    it('accepts a range spanning multiple days', () => {
      expect(
        isDateRangeValid({
          startDate: new Date('2026-04-01'),
          endDate: new Date('2026-04-30'),
        })
      ).toBe(true);
    });

    it('accepts a range where start and end are the same date', () => {
      const date = new Date('2026-04-15T12:00:00Z');
      expect(
        isDateRangeValid({
          startDate: date,
          endDate: new Date(date.getTime()),
        })
      ).toBe(true);
    });

    it('accepts a range starting at the unix epoch', () => {
      expect(
        isDateRangeValid({
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
