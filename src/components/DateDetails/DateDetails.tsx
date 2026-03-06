import dayjs, { Dayjs } from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import duration from 'dayjs/plugin/duration.js';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import timezone from 'dayjs/plugin/timezone.js';
import updateLocale from 'dayjs/plugin/updateLocale.js';
import utc from 'dayjs/plugin/utc.js';

import { styled } from 'styled-components';

import { Popover } from '@/components/Popover';
import { Text } from '@/components/Typography';
import { linkStyles, StyledLinkProps } from '@/components/Link/common';
import { GridContainer } from '@/components/GridContainer';
import { Container } from '@/components/Container';
import { TextSize, TextWeight } from '../commonTypes';

import { formatTimezone } from '@/utils/date';

dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
dayjs.extend(updateLocale);
dayjs.extend(utc);

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

const UnderlinedTrigger = styled(Popover.Trigger)<StyledLinkProps>`
  ${linkStyles}
`;

const formatDateDetails = (date: Dayjs, timezone?: string): string => {
  const isCurrentYear = dayjs().year() === date.year();
  const formatForCurrentYear = 'MMM D, h:mm a';
  const formatForPastYear = 'MMM D, YYYY, h:mm a';

  if (isCurrentYear) {
    if (timezone) {
      const dateWithTimezone = date.tz(timezone);
      return dateWithTimezone
        .format(formatForCurrentYear)
        .replace('am', 'a.m.')
        .replace('pm', 'p.m.');
    }

    return date.format(formatForCurrentYear).replace('am', 'a.m.').replace('pm', 'p.m.');
  }

  if (timezone) {
    const dateWithTimezone = date.tz(timezone);
    return dateWithTimezone
      .format(formatForPastYear)
      .replace('am', 'a.m.')
      .replace('pm', 'p.m.');
  }
  return date.format(formatForPastYear).replace('am', 'a.m.').replace('pm', 'p.m.');
};

export type ArrowPosition = 'top' | 'right' | 'left' | 'bottom';

export interface DateDetailsProps {
  /** The date to display */
  date: Date;
  /** The side to show the popover */
  side?: ArrowPosition;
  /** The font size of the trigger text */
  size?: TextSize;
  /** Optional system timezone to display */
  systemTimeZone?: string;
  /** The font weight of the trigger text */
  weight?: TextWeight;
}

export const DateDetails = ({
  date,
  side = 'top',
  size = 'sm',
  systemTimeZone,
  weight = 'normal',
}: DateDetailsProps) => {
  const dayjsDate = dayjs(date);

  let systemTime;
  if (systemTimeZone) {
    try {
      systemTime = dayjsDate.tz(systemTimeZone);
    } catch {
      systemTime = dayjsDate.tz('America/New_York');
    }
  }

  return (
    <Popover>
      <UnderlinedTrigger
        $size="sm"
        $weight="medium"
      >
        <Text
          size={size}
          weight={weight}
        >
          {dayjs.utc(date).fromNow()}
        </Text>
      </UnderlinedTrigger>
      <Popover.Content
        side={side}
        showArrow
      >
        <GridContainer
          columnGap="xl"
          gridTemplateColumns="repeat(2, auto)"
          gap="sm"
        >
          <Text
            color="muted"
            size="sm"
          >
            Local
          </Text>
          <Container justifyContent="end">
            <Text size="sm">
              {formatDateDetails(dayjsDate)} (
              {formatTimezone({
                date: dayjsDate,
                timezone: dayjs.tz.guess(),
              })}
              )
            </Text>
          </Container>

          {systemTime && (
            <>
              <Text
                color="muted"
                size="sm"
              >
                System
              </Text>

              <Container justifyContent="end">
                <Text size="sm">
                  {formatDateDetails(systemTime, systemTimeZone)} (
                  {formatTimezone({
                    date: systemTime,
                    timezone: systemTimeZone,
                  })}
                  )
                </Text>
              </Container>
            </>
          )}

          <Text
            color="muted"
            size="sm"
          >
            UTC
          </Text>
          <Container justifyContent="end">
            <Text size="sm">{formatDateDetails(dayjsDate.utc(), 'UTC')}</Text>
          </Container>

          <Text
            color="muted"
            size="sm"
          >
            Unix
          </Text>
          <Container justifyContent="end">
            <Text size="sm">{Math.round(date.getTime() / 1000)}</Text>
          </Container>
        </GridContainer>
      </Popover.Content>
    </Popover>
  );
};
