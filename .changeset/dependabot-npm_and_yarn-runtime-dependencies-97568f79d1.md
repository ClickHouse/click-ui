---
'@clickhouse/click-ui': patch
---

Bump the `@radix-ui/react-*` runtime dependencies. A consumer `aria-describedby` on `Tooltip.Trigger` or its `asChild` child is now merged with the tooltip's id instead of replacing it. This also applies to `EllipsisContent` and `TextTruncate` while their text is cut off. `Tabs` triggers move focus before the tab switches, and non-modal popovers inside a `Dialog` or `Flyout` keep focus and scroll.

If your app also installs `@radix-ui/react-*` packages directly, update them to the versions click-ui pins (for example `@radix-ui/react-dialog` 1.2.0, `@radix-ui/react-dropdown-menu` 2.1.25) so nested dialogs and menus share one focus trap.
