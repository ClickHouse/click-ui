import { styled } from 'styled-components';

import { Popover } from '@/components/Popover';
import { Text } from '@/components/Text';
import { linkStyles, StyledLinkProps } from '@/components/Link/common';
import { GridContainer } from '@/components/GridContainer';
import { Container } from '@/components/Container';

import { dayjs, Dayjs, formatTimezone } from '@/utils/date';

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

import { DateDetailsProps } from './DateDetails.types';

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
            <Text size="sm">{Math.round(dayjsDate.valueOf() / 1000)}</Text>
          </Container>
        </GridContainer>
      </Popover.Content>
    </Popover>
  );
};
