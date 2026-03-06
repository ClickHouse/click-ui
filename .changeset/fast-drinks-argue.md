---
'@clickhouse/click-ui': minor
---

The Click-UI source code has several circular dependencies that must be resolved.

During the resolution of component path redundancies and public API encapsulation in #798, several circular dependencies were exposed. There, some quick basic fixes were applied to allow to progress, but it was found that a separate PR was needed to resolve them.

**What changed?**

The `InitCUIThemeScript` component and `InitCUIThemeScriptProps` type were previously exported via `src/theme/index.ts` (which has been removed). They are now explicitly exported from the main entry point (`src/index.ts`). Consumers using SSR theme injection must update their imports:

```tsx
// Before
import { InitCUIThemeScript } from '@clickhouse/click-ui/theme';

// After
import { InitCUIThemeScript } from '@clickhouse/click-ui';
```
