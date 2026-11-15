---
'@clickhouse/click-ui': minor
---

`Popover.Trigger` now supports `asChild`. The single child becomes the popover button: it gets the `aria-haspopup`, `aria-expanded` and `aria-controls` attributes, opens the popover from the keyboard, and gets focus back when the popover closes. Before, `asChild` was accepted but did nothing, so if you already pass it, the wrapper `div` is no longer rendered around your child.

Visual: unchanged without `asChild`.
