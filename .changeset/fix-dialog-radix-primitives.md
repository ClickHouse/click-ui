---
"@clickhouse/click-ui": patch
---

Use Radix Dialog primitives for accessibility compliance.

- Changed Dialog title from `styled.h2` to `styled(RadixDialog.Title)` so Radix recognizes it as a proper DialogTitle
- Added optional `description` prop to Dialog.Content that renders as `RadixDialog.Description`

### Before

```tsx
<Dialog.Content title="Confirm Action" showClose>
  <Text color="muted">
  Dialog body content goes here
  </Text>
  <Spacer />
  <Separator size="lg" />
  <ActionArea>
    <Dialog.Close label="Close" />
    <Button iconRight="arrow-right">Continue</Button>
  </ActionArea>
</Dialog.Content>
```

### After

```tsx
<Dialog.Content
  title="Confirm Action"
  description="Dialog body content goes here"
  showClose
>
  <Spacer />
  <Separator size="lg" />
  <ActionArea>
    <Dialog.Close label="Cancel" />
    <Button type="primary">Confirm</Button>
  </ActionArea>
</Dialog.Content>
```
