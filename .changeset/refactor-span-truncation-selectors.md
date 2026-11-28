---
'@clickhouse/click-ui': patch
---

Stop `InputWrapper` and `Select` from applying text truncation to every first `span` inside them, which also matched icon wrappers. The date range value in `DateRangePicker` and `DateTimeRangePicker` now carries its own class and looks the same.

Visual: unchanged for Click UI components. A `span` you pass as `startContent` or `endContent` to a field is no longer truncated automatically, so use `TextTruncate` if you need that.
