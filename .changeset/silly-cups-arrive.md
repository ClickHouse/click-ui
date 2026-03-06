---
'@clickhouse/click-ui': minor
---

Provide an elegant file architecture pattern inspired by major component libraries. It has a main component, whose name serves as a namespace for types, styles, tests, stories (storybook) and a public export file. This is a first pass; further passes and iterations will be required, which is done to lower the risk of breaking changes.

**Fixes**

- ContextMenu.types.ts: Added missing `type?: 'default' | 'danger'` prop to exported `ContextMenuItemProps`
- Button.tsx: Removed duplicate `Alignment` type (already defined in Button.types.ts)

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
