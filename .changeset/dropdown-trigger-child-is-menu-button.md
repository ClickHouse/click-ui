---
'@clickhouse/click-ui': minor
---

**Breaking:** `Dropdown.Trigger` no longer wraps its child in a `<div>`. A single element child, for example a `Button`, is now the menu button itself: it takes focus and gets `aria-haspopup`, `aria-expanded` and the open handlers. Text children render inside a button.

Visual: an element child now sits directly in its parent's layout instead of inside a `fit-content` block, and a disabled `Dropdown.Trigger` now disables its child, so the child shows its own disabled style. Text triggers, the `SplitButton` chevron and the date range pickers now take keyboard focus and show a focus style.

Migration: a child element must forward its ref and props to a focusable element (`forwardRef` and spread the rest props). If it cannot, pass `asChild={false}` so the trigger wraps it in a button; do this only when the child has no interactive content inside.

```tsx
// before: MyChip ignores the ref and props it receives
<Dropdown.Trigger>
  <MyChip />
</Dropdown.Trigger>

// after
<Dropdown.Trigger asChild={false}>
  <MyChip />
</Dropdown.Trigger>
```
