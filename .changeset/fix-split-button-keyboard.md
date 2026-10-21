---
'@clickhouse/click-ui': minor
---

Make the menu half of `SplitButton` a keyboard-accessible menu button: Tab reaches it after the main button, Enter, Space or ArrowDown opens the menu, and it is announced as a menu button named "More options". The new `menuAriaLabel` prop sets a different name. When the split button is `disabled`, the menu half is disabled and out of the tab order.

Visual: unchanged, apart from a focus ring on the menu half when it has keyboard focus.
