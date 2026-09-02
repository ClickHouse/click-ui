---
'@clickhouse/click-ui': minor
---

`EllipsisContent` now accepts `tooltipProps`, forwarded to the `Tooltip.Content` it renders when its text is truncated. The tooltip previously always used the default `side="top"`, which inside a menu covers the items above the hovered one. `IconWrapper`, `Dropdown.Item` and `Dropdown.Trigger sub` forward the same prop, so menu labels can move their truncation tooltip out of the way.

**How to use?**

```tsx
<EllipsisContent tooltipProps={{ side: 'right' }}>{organization.name}</EllipsisContent>

<Dropdown.Item tooltipProps={{ side: 'right' }}>{organization.name}</Dropdown.Item>
```

`tooltipProps` is positioning only — `side`, `align` and `sideOffset`. `TooltipContentProps` and `EllipsisContentProps` are now exported for typing wrappers around it. Omitting `tooltipProps` keeps today's behavior.
