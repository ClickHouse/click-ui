---
'@clickhouse/click-ui': minor
---

Adds a new `isResponsive` prop to the Table component.

The default behavior (`isResponsive={true}`) remains unchanged, preserving the responsive mobile list view conversion.

When set to `false`, the table maintains its standard layout with horizontal scroll on narrow screens instead of automatically converting to a mobile list view.

**How to use?**

To disable the mobile list view and keep the table layout with horizontal scroll:

```tsx
<Table isResponsive={false}>
  {/* Table content */}
</Table>
```

If you don't define isResponsive it'll default to default behaviour:

```tsx
<Table>
  {/* Table content */}
</Table>
```
