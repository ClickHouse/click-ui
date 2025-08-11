import dayjs from "dayjs";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

const locale = "en-US";

export const selectedDateFormatter = new Intl.DateTimeFormat(locale, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
export const headerDateFormatter = new Intl.DateTimeFormat(locale, {
  month: "short",
  year: "numeric",
});

export const getPredefinedMonthsForDateRangePicker = (
  numberOfMonths: number
): Array<DateRange> => {
  const now = dayjs();

  if (numberOfMonths < 0) {
    const lastSixMonths: Array<DateRange> = [];
    for (let i = 0; i < Math.abs(numberOfMonths); i++) {
      const date = now.subtract(i, "month");
      if (date.date() === 1 && date.month() === now.month()) {
        continue;
      }
      lastSixMonths.push({
        startDate: date.startOf("month").toDate(),
        endDate: i === 0 ? now.toDate() : date.endOf("month").toDate(),
      });
    }

    return lastSixMonths.reverse();
  }

  const nextSixMonths: Array<DateRange> = [];
  for (let i = 0; i < numberOfMonths; i++) {
    const date = now.add(i, "month");
    nextSixMonths.push({
      startDate: date.startOf("month").toDate(),
      endDate: date.endOf("month").toDate(),
    });
  }

  return nextSixMonths;
};

export const datesAreWithinMaxRange = (
  startDate: Date,
  endDate: Date,
  maxRangeLength: number
): boolean => {
  const daysDifference = Math.abs(dayjs(startDate).diff(dayjs(endDate), "days"));

  return daysDifference <= maxRangeLength;
};

export const isDateRangeTheWholeMonth = ({ startDate, endDate }: DateRange): boolean => {
  if (startDate.getMonth() !== endDate.getMonth()) {
    return false;
  }

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const startDateIsFirstDay = start.isSame(start.startOf("month"), "day");
  const endDateIsLastDay = end.isSame(end.endOf("month"), "day");

  return startDateIsFirstDay && endDateIsLastDay;
};
