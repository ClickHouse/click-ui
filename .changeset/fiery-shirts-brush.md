---
'@clickhouse/click-ui': minor
---

The team should have full control over the Public API to manage which resources are available for use in consumer applications. Previously, consumer applications had unrestricted access to internal resources, which is undesirable.

For example, third-party APIs like the primitive components provided by Radix UI were directly exposed, meaning that if those primitives were ever swapped out, any consumer applications depending on them would break due to tight coupling.

With these changes in place, core maintainers can now manage the Public API through a clear and friendlier interface.

## Removed Paths

The following subpath exports have been removed as they were intended as internal implementation details:

- `@clickhouse/click-ui/Collapsible`
- `@clickhouse/click-ui/IconWrapper`
- `@clickhouse/click-ui/MiddleTruncator`

If you were importing from these paths, please migrate to the public API exports from the main entry point (`@clickhouse/click-ui`).

## How to use?

The public API is controlled through the main barrel file at `src/index.ts`. This file serves as the single source of truth for all components, types, and utilities exported by the package.

> **Note:** The `generate:exports` script uses the TypeScript Compiler API to parse `src/index.ts` directly and extract only the components that are explicitly exported. This ensures that only public API components get subpath exports in `package.json`, while internal components remain inaccessible via direct imports.

Maintainers can add or remove components from the public API by updating the exports in this file. Each export should include both the component and its associated types to ensure consumers have full type support.

Here's an example of `src/index.ts`:

```ts
// Adding a new component to the public API
export { Button } from './components/Button';
export type { ButtonProps } from './components/Button';

// Removing a component (simply delete)
```

After, you must run the `generate:exports` to update the component-level exports in the package.json file.

Once complete, commit your changes.
