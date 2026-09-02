---
'@clickhouse/click-ui': minor
---

`EllipsisContent` now accepts `tooltipProps`, forwarded to the `Tooltip.Content` it renders when its text is truncated. The tooltip previously always used the default `side="top"`, which inside a menu covers the items above the hovered one. `IconWrapper`, `Dropdown.Item` and `Dropdown.Trigger sub` forward the same prop, so menu labels can move their truncation tooltip out of the way.

**How to use?**

```tsx
<EllipsisContent tooltipProps={{ side: 'right' }}>{organization.name}</EllipsisContent>
```

`tooltipProps` is positioning only — `side`, `align` and `sideOffset`. `TooltipContentProps` and `EllipsisContentProps` are now exported for typing wrappers around it. On `EllipsisContent` and `IconWrapper`, omitting it keeps today's behavior.

`Dropdown.Item` and `Dropdown.Trigger sub` are the exception: they now default their truncation tooltip to `side: 'right'` rather than inheriting `side="top"`. A tooltip covering the item above the hovered one is wrong in any menu, so the good default belongs here instead of in every caller. Pass `tooltipProps` to override it. When the menu sits at the edge of the viewport, Radix's collision handling flips the tooltip to `left`, never back to `top`.
