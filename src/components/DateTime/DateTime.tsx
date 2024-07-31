import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

import { Container } from "@/components/Container/Container";
import { Panel } from "@/components/Panel/Panel";
import { Popover } from "@/components/Popover/Popover";
import { Text } from "@/components/Typography/Text/Text";
import styled from "styled-components";

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

const UnderlinedTrigger = styled(Popover.Trigger)`
  text-decoration: wavy underline;
`;

const dateStyle = "medium";
const timeStyle = "medium";

const createBasicDateTimeFormatter = () => {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
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

export interface DateTimeProps {
  date: Date;
  locale?: Intl.Locale;
  systemTimeZone?: string;
}

export const DateTime = ({ date, locale, systemTimeZone }: DateTimeProps) => {
  console.log(systemTimeZone, locale);

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
      <UnderlinedTrigger>
        <Text size="sm">{dayjs.utc(date).fromNow()}</Text>
      </UnderlinedTrigger>
      <Popover.Content showArrow>
        <Container
          orientation="vertical"
          padding="none"
        >
          <Container orientation="vertical">
            <Text size="sm">{Math.round(date.getTime() / 1000)}</Text>
            <Text size="sm">{date.toISOString()}</Text>
          </Container>
          <Panel orientation="vertical">
            <Container
              orientation="horizontal"
              justifyContent="space-between"
            >
              <Text size="md">UTC:</Text>
              <Text size="md">
                {formatDateTime(dayjsDate.utc().toDate(), locale, "UTC")}
              </Text>
            </Container>
            <Container
              orientation="horizontal"
              justifyContent="space-between"
            >
              <Text size="md">Local ({dayjs.tz.guess()}):</Text>
              <Text size="md">{formatDateTime(dayjsDate.toDate(), locale)}</Text>
            </Container>
            {systemTime && (
              <Container
                orientation="horizontal"
                justifyContent="space-between"
                minWidth="260px"
              >
                <Text size="md">System ({systemTimeZone}):</Text>
                <Text size="md">
                  {formatDateTime(systemTime.toDate(), locale, systemTimeZone)}
                </Text>
              </Container>
            )}
          </Panel>
        </Container>
      </Popover.Content>
    </Popover>
  );
};
