---
'@clickhouse/click-ui': patch
---

`Dropdown.Item` with `asChild` now renders its child element (for example an `<a>`) as the menu item, with the icon and truncated label inside it, so a link item is focusable and activates from the keyboard. With `asChild`, `children` must be a single element; `DropdownItemProps` is now a union type, so an `interface` can no longer extend it.
