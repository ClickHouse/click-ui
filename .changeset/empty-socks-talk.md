---
'@clickhouse/click-ui': minor
---

Adds `timezone` field to `DatePicker`, `DateRangePicker` and `DateTimeRangePicker`, allowing the user to configure whether to display dates in local or utc.

Defaults to `local`

### Usage

#### DatePicker
```ts
<DatePicker
  onSelectDate={handleDateSelect}
  timezone="local"
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
  timezone="local"
/>
```
