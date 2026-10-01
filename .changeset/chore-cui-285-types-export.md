---
'@clickhouse/click-ui': patch
---

Exported prop types now match what the components accept; removed stale copies from `GridContainerProps`, `RadioGroupItemProps`, `FileTabsProps`, `FileTabProps`, and `ToastProviderProps`. `Dropdown.Sub` now type-checks `open`, `defaultOpen` and `onOpenChange`, which it always passed to Radix.  
Code written against the old copies can fail to type-check: `Dropdown.Sub` no longer accepts DOM props such as `className`, which it never rendered, and `FileTabProps` and `FileTabsProps` now require the props the components always required.
