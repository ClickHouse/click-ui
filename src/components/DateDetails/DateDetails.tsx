import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";

import { Popover } from "@/components/Popover/Popover";
import { Text } from "@/components/Typography/Text/Text";
import { GridContainer } from "@/components/GridContainer/GridContainer";
import { Container } from "@/components/Container/Container";
import { TextSize, TextWeight } from "@/components/commonTypes";
import styles from "./DateDetails.module.scss";

dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
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

const formatDateDetails = (date: Dayjs, timezone?: string): string => {
  const isCurrentYear = dayjs().year() === date.year();
  const formatForCurrentYear = "MMM D, h:mm a";
  const formatForPastYear = "MMM D, YYYY, h:mm a";

  if (isCurrentYear) {
    if (timezone) {
      const dateWithTimezone = date.tz(timezone);
      return dateWithTimezone
        .format(formatForCurrentYear)
        .replace("am", "a.m.")
        .replace("pm", "p.m.");
    }

    return date.format(formatForCurrentYear).replace("am", "a.m.").replace("pm", "p.m.");
  }

  if (timezone) {
    const dateWithTimezone = date.tz(timezone);
    return dateWithTimezone
      .format(formatForPastYear)
      .replace("am", "a.m.")
      .replace("pm", "p.m.");
  }
  return date.format(formatForPastYear).replace("am", "a.m.").replace("pm", "p.m.");
};

const formatTimezone = (date: Dayjs, timezone?: string): string => {
  return (
    new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      timeZoneName: "short",
    })
      .formatToParts(date.toDate())
      .find(part => part.type === "timeZoneName")?.value ?? date.format("z")
  );
};

export type ArrowPosition = "top" | "right" | "left" | "bottom";

export interface DateDetailsProps {
  date: Date;
  side?: ArrowPosition;
  size?: TextSize;
  systemTimeZone?: string;
  weight?: TextWeight;
}

export const DateDetails = ({
  date,
  side = "top",
  size = "sm",
  systemTimeZone,
  weight = "normal",
}: DateDetailsProps) => {
  const dayjsDate = dayjs(date);

  let systemTime;
  if (systemTimeZone) {
    try {
      systemTime = dayjsDate.tz(systemTimeZone);
    } catch {
      systemTime = dayjsDate.tz("America/New_York");
    }
  }

  return (
    <Popover>
      <Popover.Trigger className={styles.cuiUnderlinedTrigger}>
        <Text
          size={size}
          weight={weight}
        >
          {dayjs.utc(date).fromNow()}
        </Text>
      </Popover.Trigger>
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
              {formatTimezone(dayjsDate, dayjs.tz.guess())})
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
                  {formatTimezone(systemTime, systemTimeZone)})
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
            <Text size="sm">{formatDateDetails(dayjsDate.utc(), "UTC")}</Text>
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
