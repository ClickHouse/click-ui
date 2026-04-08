---
"@clickhouse/design-tokens": minor
---

Add legacy backward compatibility exports for styled-components theme

Provides deprecated TypeScript theme exports for gradual migration from `@clickhouse/click-ui`.

**Usage:**

```typescript
// Before (deprecated in @clickhouse/click-ui)
import { useCUITheme } from '@clickhouse/click-ui';

// After (explicit legacy path)
import { useCUITheme } from '@clickhouse/design-tokens/legacy/hooks';
import { THEMES, InitCUIThemeScript } from '@clickhouse/design-tokens/legacy';
```

See [LEGACY.md](./packages/design-tokens/LEGACY.md) for migration guide.
