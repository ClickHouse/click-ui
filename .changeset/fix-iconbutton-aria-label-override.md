---
'@clickhouse/click-ui': patch
---

IconButton no longer leaves the button nameless when a consumer passes an empty aria-label, and hides the inner icon from assistive tech so the control exposes a single accessible name.
