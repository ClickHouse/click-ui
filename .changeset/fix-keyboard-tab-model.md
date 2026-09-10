---
'@clickhouse/click-ui': patch
---

Give table column resizers a single roving tab stop, default Tooltip triggers to a focusable button, and remove the extra tab stop inside Grid.

**Potentially breaking (`Tooltip.Trigger`):** the default trigger is now a `<button type="button">`, not a `div`. This is so tooltip content is available on keyboard focus, not hover only.

If you wrap an existing interactive element (`Button`, `IconButton`, `Link`, `<a>`, or `<button>`), you **must** pass `asChild`. Without it you get a nested button: invalid HTML and a worse accessible name.

```tsx
// Before (worked because the wrapper was a div)
<Tooltip.Trigger>
  <IconButton icon="info" />
</Tooltip.Trigger>

// After
<Tooltip.Trigger asChild>
  <IconButton icon="info" />
</Tooltip.Trigger>
```

Plain text or other non-interactive children do not need `asChild`.
