---
'@clickhouse/click-ui': minor
---

Refactors themed logos to use single theme-aware components and adds simple aliases for commonly used asset names.

**Theme-aware logos**

Logos with light/dark variants (`kafka`, `github`, `clickhouse`, `rust`, `tableau`, `feature-database`, `feature-hexagon`) are now consolidated into single components that automatically switch based on the current theme. This follows the existing pattern used by `OVH` and `AWS` logos.

Before:
```tsx
// Had to explicitly choose the variant
<Logo name="kafka-light" />
<Logo name="kafka-dark" />
```

After:
```tsx
// Automatically switches based on theme
<Logo name="kafka" />
```

**Simple aliases for non-themed assets**

Added aliases for commonly used asset names that map to their kebab-case equivalents:

| Alias | Resolves to |
|-------|-------------|
| `mysql` | `my-sql` |
| `mongodb` | `mongo-db` |
| `nodejs` | `node-js` |
| `golang` | `go-lang` |
| `warpstream` | `warp-stream` |
| `digital_ocean` | `digital-ocean` |
| `onelake` | `one-lake` |

```tsx
// Both work identically
<Logo name="mysql" />
<Logo name="my-sql" />
```
