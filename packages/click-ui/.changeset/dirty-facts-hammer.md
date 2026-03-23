---
'@clickhouse/click-ui': minor
---

Introduces a centralised asset configuration with unified aliases and deprecated name mappings. This provides a single source of truth for asset name resolution across all asset types (Icons, Logos, Flags, and Payments), helping to resolve circular dependencies while offering a flexible aliasing system.

### Why aliases?

Asset naming conventions use kebab-case (e.g., `c-sharp`, `arrow-down`) to facilitate file organisation and ensure valid JavaScript identifiers. However, users may prefer more intuitive names that don't follow these conventions. Aliases bridge this gap.

For example, `c#` contains a `#` character which is not a valid JavaScript identifier, but users might still prefer using `c#` over `c-sharp`.

### How to use aliases

Aliases are defined in `src/components/Assets/config.ts` under `ASSET_NAME_MAPPINGS.aliases`:

```tsx
export const ASSET_NAME_MAPPINGS = {
  aliases: {
    'c#': 'c-sharp',
    // Add more aliases as needed
  } as AssetAliasMap,
  // ...
};
```

The alias is then automatically resolved when using any asset component:

```tsx
// Both of these work identically:
<Logo name="c#" />
<Logo name="c-sharp" />
```
