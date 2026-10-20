---
'@clickhouse/click-ui': minor
---

Add `preserveLineBreaks` to `Alert`. When it is true, string `text` and `title` keep `\n` line breaks and wrap long unbroken tokens.

Visual: unchanged by default. Set `preserveLineBreaks` on `Alert`, `WarningAlert`, `DangerAlert`, `InfoAlert`, or `SuccessAlert` to opt in. ReactNode `text` and `title` are unchanged.
