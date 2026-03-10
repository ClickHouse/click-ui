---
"@clickhouse/click-ui": minor
---

### What's Changed

Typography Split (breaking for internal imports only):
- Split monolithic `Typography/` folder into atomic `Text/` and `Title/` components
- Each component now has dedicated folder with stories, tests, and exports
- Enables granular imports: `import { Text } from '@clickhouse/click-ui/Text'`

Hooks Organization:
- Moved `useToast` from `components/Toast/` to `hooks/` for consistent hook exports
- All hooks now centralized in `src/hooks/` directory

Build Improvements:
- Added dist directory cleanup before builds to prevent stale artifacts

### Migration Guide

For consumers using main index imports:

```typescript
// No changes needed - these continue to work:
import { Text, Title } from '@clickhouse/click-ui';
```

For consumers wanting granular imports:

```typescript
import { Text } from '@clickhouse/click-ui/Text';
import { Title } from '@clickhouse/click-ui/Title';
import { useToast } from '@clickhouse/click-ui';
```

For internal development:

```typescript
// Old paths (removed):
import { Text } from '@/components/Typography/Text';

// New paths:
import { Text } from '@/components/Text';
import { Title } from '@/components/Title';
```

### Breaking Changes

- Internal import paths changed from `@/components/Typography/*` to `@/components/Text` and `@/components/Title`
