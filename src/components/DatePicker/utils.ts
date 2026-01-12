import dayjs from 'dayjs';

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

const locale = 'en-US';

export interface Time {
  hour: number;
  minutes: number;
}

export interface DateRangeListItem {
  dateRange: DateRange;
  label: string;
}

export const selectedDateFormatter = new Intl.DateTimeFormat(locale, {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short' });
export const selectedDateTimeFormatter = new Intl.DateTimeFormat(locale, {
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

export const selectedDateTimeDateFormatter = new Intl.DateTimeFormat(locale, {
  day: '2-digit',
  month: 'short',
});

export const timeFormatter = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
});

export const headerDateFormatter = new Intl.DateTimeFormat(locale, {
  month: 'short',
  year: 'numeric',
});

export const getPredefinedMonthsForDateRangePicker = (
  numberOfMonths: number
): Array<DateRange> => {
  const now = dayjs();

  if (numberOfMonths < 0) {
    const lastSixMonths: Array<DateRange> = [];
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

  const nextSixMonths: Array<DateRange> = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const date = now.add(i, 'month');
    nextSixMonths.push({
      startDate: date.startOf('month').toDate(),
      endDate: date.endOf('month').toDate(),
    });
  }

  return nextSixMonths;
};

export const getPredefinedTimePeriodsForDateTimePicker = (): Array<DateRangeListItem> => {
  const now = dayjs();

  const fifteenMinutesAgo = now.subtract(15, 'minute');
  const thirtyMinutesAgo = now.subtract(30, 'minute');
  const oneHourAgo = now.subtract(1, 'hour');
  const sixHoursAgo = now.subtract(6, 'hour');
  const oneDayAgo = now.subtract(1, 'day');
  const oneMonthAgo = now.subtract(1, 'month');

  const dateRangeList: Array<DateRangeListItem> = [
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

export const datesAreWithinMaxRange = (
  startDate: Date,
  endDate: Date,
  maxRangeLength: number
): boolean => {
  const daysDifference = Math.abs(dayjs(startDate).diff(dayjs(endDate), 'days'));

  return daysDifference <= maxRangeLength;
};

export const isDateRangeTheWholeMonth = ({ startDate, endDate }: DateRange): boolean => {
  if (startDate.getMonth() !== endDate.getMonth()) {
    return false;
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const startDateIsFirstDay = start.isSame(start.startOf('month'), 'day');
  const endDateIsLastDay = end.isSame(end.endOf('month'), 'day');

  return startDateIsFirstDay && endDateIsLastDay;
};
