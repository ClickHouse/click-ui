---
'@clickhouse/click-ui': minor
---

`EllipsisContent` now shows the Click UI `Tooltip` with the full text when its content is truncated, instead of setting the native `title` attribute. Also adds an `asChild` prop to `Tooltip.Trigger` so a caller's own element can be used as the trigger without the default wrapping `div`.
