---
'@clickhouse/click-ui': minor
---

Replaces the `isResponsive` boolean prop with a more explicit `mobileLayout` prop on the Table component.

**Migration guide:**

```tsx
// Before
<Table isResponsive={true} />
<Table isResponsive={false} />

// After
<Table mobileLayout="list" /> // or use just <Table />
<Table mobileLayout="scroll" />
```

The new `mobileLayout` prop accepts:
- `"list"` (default): Converts to mobile list view on narrow screens
- `"scroll"`: Maintains table layout with horizontal scroll on narrow screens
