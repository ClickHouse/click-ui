---
"@clickhouse/click-ui": patch
---

Add missing 'warning' color option to TextColor type and design tokens.

The `warning` value was available in theme tokens but missing from the `TextColor` type definition, causing TypeScript errors when using `<Text color="warning">`. This fix:

- Adds `'warning'` to the `TextColor` type union in `Text.tsx`
- Adds warning color tokens to both light (`#a33c00`) and dark (`#ffb88f`) theme variables
- Adds warning token definitions to `light.json` and `dark.json` design token files
