import { Dayjs } from 'dayjs';

const DEFAULT_DATE_LOCALE = 'en-US';

export const formatTimezone = ({
  date,
  timezone,
  locale = DEFAULT_DATE_LOCALE,
}: {
  date: Dayjs;
  timezone?: string;
  locale?: string;
}): string =>
  new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    timeZoneName: 'short',
  })
    .formatToParts(date.toDate())
    .find(part => part.type === 'timeZoneName')?.value ?? date.format('z');

type MonthNamesFormat = 'short' | 'long';

export const getMonthNames = (format: MonthNamesFormat = 'long') =>
  Array.from({ length: 12 }, (_, i) =>
    new Date(1970, i).toLocaleString(DEFAULT_DATE_LOCALE, { month: format })
  );
