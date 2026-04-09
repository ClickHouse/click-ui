---
"@clickhouse/click-ui": patch
---

Use Radix Dialog primitives for accessibility compliance.

- Changed Dialog title from `styled.h2` to `styled(RadixDialog.Title)` so Radix recognizes it as a proper DialogTitle
- Added optional `description` prop to Dialog.Content that renders as `RadixDialog.Description`
