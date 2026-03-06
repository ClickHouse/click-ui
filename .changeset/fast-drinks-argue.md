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


**Additional cleanup:**

Removed orphaned subpath exports for `CrossButton`, `EmptyButton`, and `GridCenter`. These components were moved to `@/components/Common` in a previous refactor but duplicate directories were left behind. They are now exclusively available via the Common module:

```tsx
// Before
import { CrossButton } from '@clickhouse/click-ui/CrossButton';

// After
import { CrossButton } from '@clickhouse/click-ui';
// or for internal use:
import { CrossButton } from '@/components/Common';
```

**Bug fix:**

Fixed a broken type export in `src/components/Common/index.ts` that was referencing a deleted file (`Common.types.ts`). The `TextSize`, `TextWeight`, and `CursorOptions` types are now correctly exported from their respective source files (`Typography` and `Panel`).
