---
'@clickhouse/click-ui': patch
---

Fixes a bug in DateRangePicker that didn't allow changing to past dates when start date and end date were set and the past date was > maxRangeLength
