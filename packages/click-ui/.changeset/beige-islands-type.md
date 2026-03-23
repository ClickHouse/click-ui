---
'@clickhouse/click-ui': minor
---

Adds a new `DateTimePicker` component for selecting date and time ranges with precision control. This component combines calendar-based date selection with time input fields, supporting both predefined time ranges and custom selections.

## What has changed?

- New `DateTimePicker` component for selecting date-time ranges
- Support for predefined time periods (e.g., "Past 15 minutes", "Past hour")
- Custom date range selection with start/end calendars
- Time input with hours, minutes, and optional seconds
- AM/PM meridiem toggle for 12-hour format
- Calendar can open to the left or right via `openDirection` prop
- Time selection is retained when changing dates
- Support for disabling future dates
- Maximum range length constraint support
- Helper function "predefined time periods for DateTimePicker" for common time ranges

## How to use?

Basic usage with custom date range selection:

```tsx
import { DateTimePicker } from '@clickhouse/click-ui';

<DateTimePicker
  onSelectDateRange={(startDate, endDate) => {
    console.log('Selected range:', startDate, endDate);
  }}
  placeholder="Select date range"
/>
```

With predefined time periods:

```tsx
import { DateTimePicker, getPredefinedTimePeriodsForDateTimePicker } from '@clickhouse/click-ui';

<DateTimePicker
  predefinedTimesList={getPredefinedTimePeriodsForDateTimePicker()}
  onSelectDateRange={(startDate, endDate) => {
    console.log('Selected range:', startDate, endDate);
  }}
/>
```

With all options:

```tsx
<DateTimePicker
  startDate={new Date()}
  endDate={new Date()}
  disabled={false}
  futureDatesDisabled={true}
  futureStartDatesDisabled={false}
  maxRangeLength={30}
  onSelectDateRange={(startDate, endDate) => handleRangeChange(startDate, endDate)}
  openDirection="left"
  placeholder="start date – end date"
  predefinedTimesList={customPredefinedList}
  shouldShowSeconds={true}
/>
```
