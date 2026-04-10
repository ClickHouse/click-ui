---
"@clickhouse/click-ui": patch
---

Suppress Radix `Missing Description` console warning when no `description` prop is provided to `Dialog.Content`. A hidden `RadixDialog.Description` is now rendered by default so Radix's accessibility check passes silently.
