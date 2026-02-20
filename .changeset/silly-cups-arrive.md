---
'@clickhouse/click-ui': minor
---

Provide an elegant file architecture pattern inspired by major component libraries. It has a main component, whose name serves as a namespace for types, styles, tests, stories (storybook) and a public export file. This is a first pass; further passes and iterations will be required, which is done to lower the risk of breaking changes.

It aims to provide the following:

```
components/
├── Button/
│   ├── Button.tsx          # Main component (namespace)
│   ├── Button.types.ts     # TypeScript types
│   ├── Button.styles.ts    # Styles
│   ├── Button.test.tsx     # Tests
│   ├── Button.stories.tsx  # Storybook stories
│   └── index.ts            # Public
├── Input/
│   ├── Input.tsx
│   ├── index.ts
│   └── ...
└── index.ts
```
