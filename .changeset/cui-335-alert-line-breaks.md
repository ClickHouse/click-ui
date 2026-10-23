---
'@clickhouse/click-ui': minor
---

Add `preserveLineBreaks` to `Alert`. When it is true, string `text` keeps `\n` line breaks.

Visual: unchanged by default. Set `preserveLineBreaks` on `Alert`, `WarningAlert`, `DangerAlert`, `InfoAlert`, or `SuccessAlert` to opt in. ReactNode `text` is unchanged.
