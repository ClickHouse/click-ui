---
'@clickhouse/click-ui': minor
---

Provides control to fix the the Date picker content misalignment on smaller viewports or resizing.

**What changed?**

- Exposed `responsivePositioning` prop on `DatePicker` and `DateRangePicker` components (default: `true`)
- When enabled, dropdowns automatically adjust position to stay within viewport with 100px padding
- This fixes the Date picker dropdown becoming misaligned on resize and smaller viewports

**How to use?**

All dropdowns now automatically adjust to stay within viewport by default.

To disable this behavior use the `responsivePositioning` prop:

```tsx
// Disable responsive positioning on Dropdown
<Dropdown>
  <Dropdown.Trigger>Open</Dropdown.Trigger>
  <Dropdown.Content responsivePositioning={false}>
    <Dropdown.Item>Item</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>

// Disable on DatePicker
<DatePicker 
  onSelectDate={handleSelect} 
  responsivePositioning={false} 
/>

// Disable on DateRangePicker
<DateRangePicker 
  onSelectDateRange={handleRange} 
  responsivePositioning={false} 
/>
```
