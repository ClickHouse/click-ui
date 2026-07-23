---
'@clickhouse/click-ui': patch
---

Fix IconButton silently overriding a consumer-supplied aria-label with the icon name. A consumer-provided aria-label now wins, falling back to the icon name when none is given (including an empty string). The inner icon is also marked aria-hidden so the button exposes a single accessible name instead of two.
