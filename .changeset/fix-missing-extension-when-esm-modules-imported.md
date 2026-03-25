---
'@clickhouse/click-ui': patch
---

Consolidate dayjs imports and plugin configuration into `src/utils/date.ts`. The dayjs package does not declare exports for its plugins, requiring explicit `.js` extensions in ESM environments. Centralizing these imports ensures consistent usage across components.
