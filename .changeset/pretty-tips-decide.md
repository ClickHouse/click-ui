---
'@clickhouse/click-ui': minor
---

Improve current date visibility in the date picker. Previously, the current date used a subtle font weight increase that was barely noticeable depending on OS and browser font rendering. Now it uses a background highlight for better contrast.

**How it works?**

- Adds `$isToday` styling with a subtle background to day, month, and year cells
- `$isActive` (yellow background) only applies when a date is actually selected
- Hover state resets to yellow border with transparent background across all states
- Year/month selection via title click is disabled for DateRangePicker
