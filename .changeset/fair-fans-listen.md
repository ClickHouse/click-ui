---
'@clickhouse/click-ui': minor
---

Introduced a new date-range picker using a simple two-phase process for year and month selection to make the date selection user experience more elegant.

Currently, jumping through many years requires multiple clicks and scrolls, making the whole process tiring. The issue was originally reported in reported issue [#752](https://github.com/ClickHouse/click-ui/issues/752).

## How to use?

To quickly navigate to a different month and year in the Datepicker:

1. Click the header showing the current month and year (e.g., "Feb 2026")
2. The view switches to month and year selection mode
3. Select your desired year first using the left and right chevrons in the header
4. Then select the month from the grid below

This allows you to jump to any date without clicking through months one at a time.
