---
'@clickhouse/click-ui': patch
---

Fix Select no-data/no-results dropdown row losing its font and padding. The row now renders with the generic-menu button label typography (14px/21px/500) and its intended 8px 16px padding, restoring the correct row height.
