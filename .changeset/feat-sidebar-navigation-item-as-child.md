---
'@clickhouse/click-ui': minor
---

Add `asChild` to `SidebarNavigationItem`. The child link (for example a router `Link`) becomes the item, so `selected` sets `aria-current="page"` on it and `disabled` sets `aria-disabled="true"`, takes it out of the Tab order and blocks navigation. The link also gets a visible focus ring. Without `asChild` nothing changes.
