---
'@clickhouse/click-ui': minor
---

Replaces the `isResponsive` boolean prop with a more explicit `mobileLayout` prop on the Table component. It clearly states the behavior, while isResponsive requires knowing what "responsive" means here and both are technically "responsive".

The mobile layout version's more extensible, e.g. a new mode can be easily introduced such as `compact` without breaking changes.

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

**Data attribute change:**

The `data-responsive-mode` attribute has been renamed to `data-mobile-layout`. If you have custom CSS targeting `[data-responsive-mode='list']` or `[data-responsive-mode='scroll']`, update to `[data-mobile-layout='list']` or `[data-mobile-layout='scroll']`.
