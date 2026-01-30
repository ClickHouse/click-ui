---
"@clickhouse/click-ui": patch
---

The previous versions of click-ui (e.g., <= 0.0.250), break on the latest of Nextjs, Vitejs, any React >= 19 or RSC enabled builds. To mitigate it, this initial change provides the minimal setup required for it to work in such environments, e.g. when installing the package, it should run in dev and build processes.
It does NOT try to modify, replace, introduce or change breaking changes; there might be a few subtle changes related to Radix. At the time of writing, the library requires a browser runtime, which means that is client-only. Separately, there'll be other PR to address other related concerns and expand on this initial PR, e.g. none interactive components shall render server-side.

# What changed?

The @clickhouse/click-ui package was updated, which includes an updated Radix UI dependency that removed the side, align, and sideOffset props from ContextMenu.Content.

Radix made this change because the ContextMenuContentProps TypeScript type now explicitly omits these props:

```
interface ContextMenuContentProps extends Omit<MenuContentProps, 'onEntryFocus' | 'side' | 'sideOffset' | 'align'> {}
```

1. Context menus are fundamentally different from dropdown menus — they open at the cursor position (where the user right-clicked), not relative to a trigger element

2. The side and align props don't make sense for context menus since there's no anchor element to position against

3. Smaller bundle size — removing unused positioning logic reduces the bundle for ContextMenu consumers

# Migration Guide

Before: <ContextMenu.Content side="bottom" align="start">
After: <ContextMenu.Content>

Before: sideOffset={5}
After: Use alignOffset for vertical spacing if needed

The props were never functionally useful for context menus (which position at the cursor), so removing them is just a cleanup.

Simply delete these props from your ContextMenu.Content components.

Sources:
- https://www.radix-ui.com/primitives/docs/overview/releases
- https://github.com/radix-ui/primitives/issues/3208
- https://www.radix-ui.com/primitives/docs/components/context-menu
