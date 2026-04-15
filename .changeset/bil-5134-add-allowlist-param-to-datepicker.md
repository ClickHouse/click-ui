---
'@clickhouse/click-ui': minor
---

Adds optional `allowOnlyDatesList` prop to `DatePicker`, which enables the user to provide a predefined allowlist of dates that can be selected.

### How to use?

```tsx
<DatePicker
  allowOnlyDatesList={[
    new Date('2026-01-15'),
    new Date('2026-01-20'),
    new Date('2026-02-01'),
  ]}
  onSelectDate={(date) => console.log('Selected:', date)}
/>
```
Only the dates in `allowOnlyDatesList` will be selectable. All other dates will be disabled.
