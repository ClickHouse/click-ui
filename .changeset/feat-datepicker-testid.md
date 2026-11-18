---
'@clickhouse/click-ui': minor
---

Add a `data-testid` prop to `DatePicker`, `DateRangePicker` and `DateTimeRangePicker`. It is set on the trigger that opens the picker, so tests can target one picker when a page has several. Before, the attribute was accepted but never rendered, so any `data-testid` you already pass will now appear on the trigger.
