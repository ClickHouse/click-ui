import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import duration from 'dayjs/plugin/duration.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import timezone from 'dayjs/plugin/timezone.js';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import utc from 'dayjs/plugin/utc.js';

const thresholds = [
  { l: 's', r: 1, d: 'second' },
  { l: 'ss', r: 56, d: 'second' },
  { l: 'm', r: 90, d: 'second' },
  { l: 'mm', r: 55, d: 'minute' },
  { l: 'h', r: 90, d: 'minute' },
  { l: 'hh', r: 22, d: 'hour' },
  { l: 'd', r: 40, d: 'hour' },
  { l: 'dd', r: 31, d: 'day' },
  { l: 'M', r: 45, d: 'day' },
  { l: 'MM', r: 11, d: 'month' },
  { l: 'y', r: 17, d: 'month' },
  { l: 'yy', r: 2, d: 'year' },
];

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(updateLocale);
dayjs.extend(utc);
dayjs.extend(relativeTime, { thresholds });

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'In %s',
    past: '%s ago',
    s: 'a few seconds',
    ss: '%d seconds',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    w: '1 week',
    ww: '%d weeks',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years',
  },
});

export { dayjs };
export type { Dayjs };

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

export const DAYS = 'days';
export const MONTHS = 'months';
export const YEARS = 'years';

export const DAYS_IN_WEEK = 7;

type MonthNamesFormat = 'short' | 'long';

export const getMonthNames = (format: MonthNamesFormat = 'long') =>
  Array.from({ length: 12 }, (_, i) =>
    new Date(1970, i).toLocaleString(DEFAULT_DATE_LOCALE, { month: format })
  );
