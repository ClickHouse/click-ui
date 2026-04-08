---
"@clickhouse/click-ui": patch
---

Redirect theme and hook exports to @clickhouse/design-tokens/legacy

`@clickhouse/click-ui` now re-exports theme utilities and hooks from `@clickhouse/design-tokens/legacy/*` subpaths instead of providing them directly. This establishes a runtime dependency on `@clickhouse/design-tokens`.

**Affected imports (now re-exported from legacy paths):**

These continue to work via re-export

```typescript
import { useCUITheme } from '@clickhouse/click-ui';
import { InitCUIThemeScript } from '@clickhouse/click-ui';
import { THEMES } from '@clickhouse/click-ui';
```

Alternatively, consumer apps can import directly from legacy exports path:

```typescript
import { useCUITheme } from '@clickhouse/design-tokens/legacy/hooks';
```

**Removed legacy token generator:**

The old Style Dictionary-based token generator (`yarn generate:tokens`) has been removed along with its dependencies (`@tokens-studio/sd-transforms`, `style-dictionary`) and the `tokens/` source directory. The legacy TypeScript theme objects remain available in `@clickhouse/design-tokens/legacy` as frozen snapshots, but the modern CSS-based token system in `packages/design-tokens` is now the only maintained system.
