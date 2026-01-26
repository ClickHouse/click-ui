import { Dayjs } from "dayjs";

export const formatTimezone = ({
  date,
  timezone,
  locale = "en-US",
}: {
  date: Dayjs;
  timezone?: string;
  locale?: string;
}): string =>
  new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    timeZoneName: "short",
  })
    .formatToParts(date.toDate())
    .find(part => part.type === "timeZoneName")?.value ?? date.format("z");
