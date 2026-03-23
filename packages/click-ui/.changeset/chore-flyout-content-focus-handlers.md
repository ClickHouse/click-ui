---
'@clickhouse/click-ui': patch
---

Restore `onOpenAutoFocus` and `onCloseAutoFocus` props to `FlyoutContentProps`.

These focus management props were inadvertently removed during the decoupling from Radix UI types. They are now explicitly added back to provide parity with the `Dialog` component and support common accessibility use cases.

Note: These props are optional and only needed when customizing default focus behavior.

**How to use?**

```tsx
<Flyout.Content
  onOpenAutoFocus={(e) => {
    // Prevent default focus behavior
    e.preventDefault();
    // Implement custom focus logic
  }}
  onCloseAutoFocus={() => {
    // Handle focus when flyout closes
  }}
>
  {children}
</Flyout.Content>
```
