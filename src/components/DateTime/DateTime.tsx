import dayjs from "dayjs";
import duration, { DurationUnitType } from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

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

import { Container } from "../Container/Container";
import { Panel } from "../Panel/Panel";
import { Popover } from "../Popover/Popover";
import { Text } from "../Typography/Text/Text";

export interface DateTimeProps {
  date: Date;
  systemTimeZone?: string;
}

export const DateTime = ({ date, systemTimeZone }: DateTimeProps) => {
  console.log(systemTimeZone);

  const FORMAT = "YYYY-MM-DD hh:mm:ss";

  const dayjsDate = dayjs(date);

  let systemTime;
  if (systemTimeZone) {
    dayjs.extend(timezone);
    systemTime = dayjsDate.tz(systemTimeZone);
  }

  return (
    <Popover>
      <Popover.Trigger>
        <Text size="sm">{dayjs.utc(date).fromNow()}</Text>
      </Popover.Trigger>
      <Popover.Content showArrow>
        <Container
          orientation="vertical"
          padding="none"
        >
          <Container orientation="horizontal">
            <Text size="sm">{date.getTime()}</Text>
          </Container>
          <Panel orientation="vertical">
            <Container
              orientation="horizontal"
              justifyContent="space-between"
            >
              <Text size="md">UTC:</Text>
              <Text size="md">{dayjsDate.utc().format(FORMAT)}</Text>
            </Container>
            <Container
              orientation="horizontal"
              justifyContent="space-between"
            >
              <Text size="md">Local:</Text>
              <Text size="md">{dayjsDate.format(FORMAT)}</Text>
            </Container>
            {systemTime && (
              <Container
                orientation="horizontal"
                justifyContent="space-between"
                minWidth="210px"
              >
                <Text size="md">System:</Text>
                <Text size="md">{systemTime.format(FORMAT)}</Text>
              </Container>
            )}
          </Panel>
        </Container>
      </Popover.Content>
    </Popover>
  );
};
