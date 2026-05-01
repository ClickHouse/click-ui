---
'@clickhouse/click-ui': minor
---

Adds `timezone` field to `DatePicker`, `DateRangePicker` and `DateTimeRangePicker`, allowing the user to configure whether to display dates in system (local) or utc.

```ts
type Timezone = 'system' | 'UTC'
````

Defaults to `system`

### Usage

#### DatePicker
```ts
<DatePicker
  onSelectDate={handleDateSelect}
  timezone="system"
/>

```

#### DateRangePicker
```ts
<DateRangePicker
  onSelectDateRange={(startDate, endDate) =>
    setStartDate(startDate);
    setEndDate(endDate);
  }
  timezone="UTC"
/>

```

#### DateTimeRangePicker
```ts
<DateTimeRangePicker
  endDate={endDate}
  onSelectDateRange={handleDateRangeSelected}
  startDate={startDate}
  timezone="system"
/>
```
