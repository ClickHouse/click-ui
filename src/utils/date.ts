import { Dayjs } from "dayjs";

export const formatTimezone = (date: Dayjs, timezone?: string): string => (
    new Intl.DateTimeFormat('en-US', {
      timeZone: timezone,
      timeZoneName: "short",
    })
      .formatToParts(date.toDate())
      .find(part => part.type === "timeZoneName")?.value ?? date.format("z")
  );
