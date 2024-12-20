import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import { styled } from "styled-components";

import { Popover } from "@/components/Popover/Popover";
import { Text } from "@/components/Typography/Text/Text";
import { linkStyles, StyledLinkProps } from "@/components/Link/common";
import { GridContainer } from "@/components/GridContainer/GridContainer";
import { Container } from "@/components/Container/Container";

dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(utc);

const thresholds = [
  { l: "s", r: 1, d: "second" },
  { l: "ss", r: 56, d: "second" },
  { l: "m", r: 90, d: "second" },
  { l: "mm", r: 55, d: "minute" },
  { l: "h", r: 90, d: "minute" },
  { l: "hh", r: 22, d: "hour" },
  { l: "d", r: 40, d: "hour" },
  { l: "dd", r: 31, d: "day" },
  { l: "M", r: 45, d: "day" },
  { l: "MM", r: 11, d: "month" },
  { l: "y", r: 17, d: "month" },
  { l: "yy", r: 2, d: "year" },
];

dayjs.extend(relativeTime, { thresholds });

dayjs.updateLocale("en", {
  relativeTime: {
    future: "In %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    w: "1 week",
    ww: "%d weeks",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

const UnderlinedTrigger = styled(Popover.Trigger)<StyledLinkProps>`
  ${linkStyles}
`;

const dateStyle = "medium";
const timeStyle = "medium";

const createBasicDateTimeFormatter = () => {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle,
    timeStyle,
  });
};

const formatDateTime = (date: Date, locale?: Intl.Locale, timeZone?: string) => {
  let dateTimeFormatter;
  try {
    dateTimeFormatter = new Intl.DateTimeFormat(locale, {
      dateStyle,
      timeStyle,
      timeZone,
    });
  } catch (error) {
    if ((error as Error).message.includes("invalid time zone")) {
      try {
        dateTimeFormatter = new Intl.DateTimeFormat(locale, {
          dateStyle,
          timeStyle,
        });
      } catch {
        dateTimeFormatter = createBasicDateTimeFormatter();
      }
    } else if ((error as Error).message.includes("invalid language tag")) {
      try {
        dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
          dateStyle,
          timeStyle,
          timeZone,
        });
      } catch {
        dateTimeFormatter = createBasicDateTimeFormatter();
      }
    } else {
      dateTimeFormatter = createBasicDateTimeFormatter();
    }
  }

  return dateTimeFormatter.format(date);
};

export type ArrowPosition = "top" | "right" | "left" | "bottom";

export interface DateTimeProps {
  date: Date;
  locale?: Intl.Locale;
  side?: ArrowPosition;
  systemTimeZone?: string;
}

export const DateTime = ({
  date,
  locale,
  side = "top",
  systemTimeZone,
}: DateTimeProps) => {
  const dayjsDate = dayjs(date);

  let systemTime;
  if (systemTimeZone) {
    dayjs.extend(timezone);
    try {
      systemTime = dayjsDate.tz(systemTimeZone);
    } catch {
      systemTime = dayjsDate.tz("America/New_York");
    }
  }

  return (
    <Popover>
      <UnderlinedTrigger
        $size="md"
        $weight="medium"
      >
        <Text size="sm">{dayjs.utc(date).fromNow()}</Text>
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
          <Text size="md">Local</Text>
          <Container justifyContent="end">
            <Text size="md">
              {formatDateTime(dayjsDate.toDate(), locale)} ({dayjsDate.format("z")})
            </Text>
          </Container>

          {systemTime && (
            <>
              <Text size="md">System</Text>

              <Container justifyContent="end">
                <Text size="md">
                  {formatDateTime(systemTime.toDate(), locale, systemTimeZone)} (
                  {systemTime.format("z")})
                </Text>
              </Container>
            </>
          )}

          <Text size="md">UTC</Text>
          <Container justifyContent="end">
            <Text size="md">
              {formatDateTime(dayjsDate.utc().toDate(), locale, "UTC")}
            </Text>
          </Container>

          <Text size="md">Unix</Text>
          <Container justifyContent="end">
            <Text size="md">{Math.round(date.getTime() / 1000)}</Text>
          </Container>
        </GridContainer>
      </Popover.Content>
    </Popover>
  );
};
