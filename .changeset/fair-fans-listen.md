---
'@clickhouse/click-ui': minor
---

Introduced a new date-range picker using a simple two-phase process for year and month selection to make the date selection user experience more elegant.

Currently, jumping through many years requires multiple clicks and scrolls, making the whole process tiring. The issue was originally reported in reported issue [#752](https://github.com/ClickHouse/click-ui/issues/752).

**How to use?**

To quickly navigate to a different month and year in the Datepicker:

1. Click the header showing the current month and year (e.g., "Feb 2026")
2. Select your desired year from the grid (current year is highlighted)
3. Select the month from the grid (current month is highlighted)
4. Select the day from the calendar

This allows you to jump to any date without clicking through months one at a time.

**Progressive input display**

As you progress through the two-phase selection, the input field updates to reflect your choices:

- After selecting a year: displays "2026"
- After selecting a month: displays "Feb 2026"
- After selecting a day: displays the full date "Feb 26, 2026"

If the picker is dismissed before completing the selection, the input reverts to the previously selected date.

**Visual improvements**

- Current day, month, and year are highlighted with an active background
- When a date is selected, only the selected date shows the active highlight (not today)
