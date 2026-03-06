---
'@clickhouse/click-ui': minor
---

Adds a new `isResponsive` prop to the Table component. When set to `false`, the table maintains its standard layout with horizontal scroll on narrow screens instead of automatically converting to a mobile list view. The default behavior (`isResponsive={true}`) remains unchanged, preserving the responsive mobile list view conversion.

The implementation uses a data-responsive-mode data attribute to conditionally apply mobile list styles.

**How to use?**

To disable the mobile list view and keep the table layout with horizontal scroll:

```tsx
<Table isResponsive={false}>
  {/* Table content */}
</Table>
```
