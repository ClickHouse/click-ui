---
'@clickhouse/click-ui': patch
---

Preserve line breaks in string `Alert` `text` and `title`, and wrap long unbroken tokens inside the alert.

Visual: string content uses `white-space: pre-wrap` and `overflow-wrap: anywhere`. Single-line alerts look the same. Multi-line strings now show each `\n` as a line break. ReactNode `text` and `title` are unchanged.
