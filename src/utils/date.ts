import { parseDate } from "@h6s/calendar";

export const isDateInFuture = (date: Date): boolean => {
  const today = new Date();

  const { day, month, year } = parseDate(date);
  const { day: todayDay, month: todayMonth, year: todayYear } = parseDate(today);

  if (year > todayYear) {
    return true;
  }

  if (year === todayYear) {
    if (month > todayMonth) {
      return true;
    }

    if (month === todayMonth) {
      if (day > todayDay) {
        return true;
      }
    }
  }

  return false;
};
