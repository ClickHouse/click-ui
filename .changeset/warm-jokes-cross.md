---
'@clickhouse/click-ui': minor
---

Adds an `openDirection` prop to `DateRangePicker` that controls which side the custom date range calendar opens. This is useful when the component is positioned near the right edge of the viewport, allowing the calendar to open on the left side to prevent overflow.

## What has changed?

- New `openDirection` prop accepts `'left'` or `'right'` (defaults to `'right'`)
- Automatic viewport detection, if the calendar would overflow the right side of the viewport, it automatically opens on the left
- Calendar direction resets to the configured `openDirection` when the picker is closed

## How to use?

Default behavior (opens to the right):

```tsx
import { DateRangePicker } from '@clickhouse/click-ui';

<DateRangePicker
  onSelectDateRange={(startDate, endDate) => {
    console.log('Selected range:', startDate, endDate);
  }}
/>
```

Open calendar on the left (useful when positioned on the right side of the page):

```tsx
<DateRangePicker
  openDirection="left"
  predefinedDatesList={predefinedDatesList}
  onSelectDateRange={(startDate, endDate) => {
    console.log('Selected range:', startDate, endDate);
  }}
/>
```
