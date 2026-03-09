---
'@clickhouse/click-ui': minor
---

Expose `DateTimeRangePicker` component and related types to the public API.

**What's new:**

- `DateTimeRangePicker` - A date/time range picker component for selecting date and time ranges
- `DateTimeRangePickerProps` - TypeScript props for the DateTimeRangePicker component
- `DateRangePickerProps` - TypeScript props for the DateRangePicker component
- `DatePickerProps` - TypeScript props for the DatePicker component

**How to use?**

```tsx
import { DateTimeRangePicker, DateTimeRangePickerProps } from '@clickhouse/click-ui';

const MyComponent = () => (
  <DateTimeRangePicker
    onChange={(range) => console.log(range)}
  />
);
```