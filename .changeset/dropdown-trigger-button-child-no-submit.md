---
'@clickhouse/click-ui': patch
---

A `Button` used as the child of `Dropdown.Trigger` no longer submits an enclosing form when it opens the menu. Pass `htmlType="submit"` to the `Button` to keep the old behavior. A `type` given to `Dropdown.Trigger` now reaches a `Button` or `IconButton` child as its native type.
