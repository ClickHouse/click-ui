---
'@clickhouse/click-ui': patch
---

Fix IconButton silently overriding a consumer-supplied aria-label with the icon name. A consumer-provided aria-label now wins, falling back to the icon name only when none is given.
