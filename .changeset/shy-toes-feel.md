---
'@clickhouse/click-ui': minor
---

Adds a new `isResponsive` prop to the Table component. When set to `true`, the table maintains its standard layout with horizontal scroll on narrow screens instead of automatically converting to a mobile list view. The default behavior (`isResponsive={false}`) remains unchanged.

The implementation uses a data-responsive-mode data attribute to conditionally apply mobile list styles.

**How to use?**

Use the property `isResponsive` as follows:

```tsx
<Table isResponsive>
  {/* Table content */}
</Table>
```
