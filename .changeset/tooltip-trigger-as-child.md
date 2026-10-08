---
"@clickhouse/click-ui": minor
---

`Tooltip.Trigger` now forwards its `ref`, and with `asChild` it passes its props (event handlers, `aria-*`, `data-*`, `className`, …) on to the child instead of dropping them. You can now compose `Tooltip.Trigger asChild` inside another `asChild` part, such as `Dropdown.Item asChild`.

**Breaking:** `EllipsisContent` with `component={Tooltip.Trigger}` inside your own `Tooltip` now gets its ref. When its text is cut off, it shows its own tooltip with that text, in place of your `Tooltip.Content`.

Visual: unchanged, except for that tooltip.

Migration: put the trigger outside the truncated text, and turn off the truncation tooltip.

```tsx
// Before
<Tooltip>
  <EllipsisContent component={Tooltip.Trigger}>{label}</EllipsisContent>
  <Tooltip.Content>{details}</Tooltip.Content>
</Tooltip>

// After
<Tooltip>
  <Tooltip.Trigger>
    <TextTruncate showTooltip={false}>{label}</TextTruncate>
  </Tooltip.Trigger>
  <Tooltip.Content>{details}</Tooltip.Content>
</Tooltip>
```

If the trigger has no text that can be cut off, such as an icon button, use `Tooltip.Trigger` alone.
