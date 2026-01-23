import { Dayjs } from "dayjs";

export const formatTimezone = ({
  date,
  timezone,
  locales = "en-US",
}: {
  date: Dayjs;
  timezone?: string;
  locales?: string;
}): string =>
  new Intl.DateTimeFormat(locales, {
    timeZone: timezone,
    timeZoneName: "short",
  })
    .formatToParts(date.toDate())
    .find(part => part.type === "timeZoneName")?.value ?? date.format("z");
