---
'@clickhouse/click-ui': minor
---

`Popover.Trigger` now supports `asChild`. The single child becomes the popover button: it gets the `aria-haspopup`, `aria-expanded` and `aria-controls` attributes, opens the popover from the keyboard, and gets focus back when the popover closes.

**Breaking:** before, `asChild` was accepted but did nothing, and your child was still wrapped in a `div` that acted as the trigger. If you already pass `asChild`, that wrapper is gone and your child is the trigger, so it must be focusable and forward its props and `ref`.

Visual: unchanged without `asChild`. With `asChild`, the wrapper `div` is no longer rendered around your child.

Migration: use a focusable child that forwards its props and `ref`, such as `Button` or a native `<button>`, or remove `asChild` to keep the wrapper.

```tsx
// Before
<Popover.Trigger asChild>
  <span>Details</span>
</Popover.Trigger>

// After
<Popover.Trigger asChild>
  <Button label="Details" />
</Popover.Trigger>

// Or keep today's output
<Popover.Trigger>
  <span>Details</span>
</Popover.Trigger>
```
