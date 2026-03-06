---
'@clickhouse/click-ui': minor
---

Provide an elegant file architecture pattern inspired by major component libraries. It has a main component, whose name serves as a namespace for types, styles, tests, stories (storybook) and a public export file. This is a first pass; further passes and iterations will be required, which is done to lower the risk of breaking changes.

**What has changed?**

It aims to provide the following:

```
components/
├── Button/
│   ├── Button.tsx          # Main component (namespace)
│   ├── Button.types.ts     # TypeScript types
│   ├── Button.styles.ts    # Styles
│   ├── Button.test.tsx     # Tests
│   ├── Button.stories.tsx  # Storybook stories
│   └── index.ts            # Component-level exports 
├── Input/
│   ├── Input.tsx
│   ├── index.ts
│   └── ...
└── index.ts                # Exports
```

**Fixes**

- ContextMenu.types.ts: Added missing `type?: 'default' | 'danger'` prop to exported `ContextMenuItemProps`
- ContextMenu.tsx: Removed duplicate `ArrowProps` and `ContextMenuItemProps` exports, now imports from `./ContextMenu.types`
- Button.tsx: Removed duplicate `Alignment` type (already defined in Button.types.ts)
- Flyout.types.ts: Replaced stale type definitions with correct types from Flyout.tsx (`DialogContentProps`, `FlyoutHeaderProps`, `FlyoutFooterProps`)
- Flyout.types.ts: Fixed `'orientaion'` typo to `'orientation'` in `Omit` calls
