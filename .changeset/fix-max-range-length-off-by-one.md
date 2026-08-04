---
'@clickhouse/click-ui': patch
---

Fix `maxRangeLength` off-by-one error in `DateRangePicker` and `DateTimeRangePicker`. `maxRangeLength={31}` now only allows a 31 day range instead of 32. `DateTimeRangePicker` now measures the range in calendar days, so a start date's time of day prevents an off-by-two error.
