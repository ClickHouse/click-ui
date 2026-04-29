import { dayjs } from '@/utils/date';

export type Timezone = 'local' | 'UTC';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

const locale = 'en-US';

export type Meridiem = 'am' | 'pm';

export interface Time {
  hour: number;
  minutes: number;
}

export interface DateRangeListItem {
  dateRange: DateRange;
  label: string;
}

const createFormatter = (options: Intl.DateTimeFormatOptions) => {
  const timezoneFormatters: Partial<Record<Timezone, Intl.DateTimeFormat>> = {};

  return (timezone: Timezone, date: Date): string => {
    if (!timezoneFormatters[timezone]) {
      const opts = timezone === 'UTC' ? { ...options, timeZone: 'UTC' } : options;
      timezoneFormatters[timezone] = new Intl.DateTimeFormat(locale, opts);
    }
    return timezoneFormatters[timezone].format(date);
  };
};

export const formatSelectedDate = createFormatter({
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const formatWeekday = createFormatter({ weekday: 'short' });

export const formatSelectedDateTime = createFormatter({
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

export const formatSelectedDateTimeWithSeconds = createFormatter({
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export const formatDateHeader = createFormatter({
  month: 'short',
  year: 'numeric',
});

// In UTC mode, shift by the host offset so local-time getters return UTC
// values. shiftFromTimezone reverses it.
//
// Caveat: round-tripping across a DST boundary drifts by an hour — each
// direction reads getTimezoneOffset on its own input. Call sites don't
// round-trip the same Date, so this hasn't bitten us.
export const shiftToTimezone = (date: Date, timezone: Timezone): Date => {
  if (timezone !== 'UTC') {
    return date;
  }
  return new Date(date.getTime() + date.getTimezoneOffset() * 60_000);
};

export const shiftFromTimezone = (date: Date, timezone: Timezone): Date => {
  if (timezone !== 'UTC') {
    return date;
  }
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
};

export const getPredefinedMonthsForDateRangePicker = (
  numberOfMonths: number
): DateRange[] => {
  const now = dayjs();

  if (numberOfMonths < 0) {
    const lastSixMonths: DateRange[] = [];
    for (let i = 0; i < Math.abs(numberOfMonths); i++) {
      const date = now.subtract(i, 'month');
      if (date.date() === 1 && date.month() === now.month()) {
        continue;
      }
      lastSixMonths.push({
        startDate: date.startOf('month').toDate(),
        endDate: i === 0 ? now.toDate() : date.endOf('month').toDate(),
      });
    }

    return lastSixMonths.reverse();
  }

  const nextSixMonths: DateRange[] = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const date = now.add(i, 'month');
    nextSixMonths.push({
      startDate: date.startOf('month').toDate(),
      endDate: date.endOf('month').toDate(),
    });
  }

  return nextSixMonths;
};

export const getPredefinedTimePeriodsForDateTimePicker = (): DateRangeListItem[] => {
  const now = dayjs();

  const fifteenMinutesAgo = now.subtract(15, 'minute');
  const thirtyMinutesAgo = now.subtract(30, 'minute');
  const oneHourAgo = now.subtract(1, 'hour');
  const sixHoursAgo = now.subtract(6, 'hour');
  const oneDayAgo = now.subtract(1, 'day');
  const oneMonthAgo = now.subtract(1, 'month');

  const dateRangeList: DateRangeListItem[] = [
    {
      dateRange: {
        startDate: fifteenMinutesAgo.toDate(),
        endDate: now.toDate(),
      },
      label: 'Past 15 minutes',
    },
    {
      dateRange: {
        startDate: thirtyMinutesAgo.toDate(),
        endDate: now.toDate(),
      },
      label: 'Past 30 minutes',
    },
    {
      dateRange: {
        startDate: oneHourAgo.toDate(),
        endDate: now.toDate(),
      },
      label: 'Past hour',
    },
    {
      dateRange: {
        startDate: sixHoursAgo.toDate(),
        endDate: now.toDate(),
      },
      label: 'Past 6 hours',
    },
    {
      dateRange: {
        startDate: oneDayAgo.toDate(),
        endDate: now.toDate(),
      },
      label: 'Past day',
    },
    {
      dateRange: {
        startDate: oneMonthAgo.toDate(),
        endDate: now.toDate(),
      },
      label: 'Past month',
    },
  ];

  return dateRangeList;
};

export const getNextNDatesForDatePickerAllowOnlyList = (numberOfDays: number): Date[] => {
  const now = dayjs();

  return Array.from({ length: numberOfDays }, (_, i) =>
    now.add(i, 'day').startOf('day').toDate()
  );
};

export const datesAreWithinMaxRange = (
  startDate: Date,
  endDate: Date,
  maxRangeLength: number
): boolean => {
  const daysDifference = Math.abs(dayjs(startDate).diff(dayjs(endDate), 'days'));

  return daysDifference <= maxRangeLength;
};

export const isDateRangeTheWholeMonth = (
  { startDate, endDate }: DateRange,
  timezone: Timezone = 'local'
): boolean => {
  const start = timezone === 'UTC' ? dayjs.utc(startDate) : dayjs(startDate);
  const end = timezone === 'UTC' ? dayjs.utc(endDate) : dayjs(endDate);

  if (start.month() !== end.month()) {
    return false;
  }

  const startDateIsFirstDay = start.isSame(start.startOf('month'), 'day');
  const endDateIsLastDay = end.isSame(end.endOf('month'), 'day');

  return startDateIsFirstDay && endDateIsLastDay;
};
