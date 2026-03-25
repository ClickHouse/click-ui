---
"@clickhouse/design-tokens": minor
---

Initial release of the design-tokens package. Provides DTCG-compliant design token definitions for colors, spacing, radius, sizing, and typography. Includes Terrazzo-based CSS output generation.

**Package pathname:** `packages/design-tokens`

**Token Dictionary Location:** `packages/design-tokens/dictionary/`

- `primitives.dtcg.json`
- `semantic.dtcg.json` - Semantic color tokens (references primitives)
- `spacing.dtcg.json` - Spacing scale (8px base unit)
- `radius.dtcg.json` - Border radius scale
- `sizing.dtcg.json` - Icon and component sizes
- `typography.dtcg.json` - Font sizes, weights, and line heights

**Creating Tokens:** Add or modify tokens in the dictionary files following DTCG format:

```json
{
  "$type": "dimension",
  "$value": { "value": 8, "unit": "px" },
  "$description": "8px, base spacing"
}
```

**Building:** Run `yarn tokens:build` to generate `packages/design-tokens/dist/tokens.css`.

See `packages/design-tokens/SPECIFICATION.md` for naming conventions and detailed guidelines.
