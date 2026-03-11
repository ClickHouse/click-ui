---
'@clickhouse/click-ui': minor
---

Enable consumers to import hooks directly via `@clickhouse/click-ui/hooks` following the same pattern as component imports.

**How to use?**

Import hooks from the new dedicated path:

```tsx
import { useCUITheme, useToast, useInitialTheme } from '@`clickhouse/click-ui/hooks';
```

Main entry point still works:

```tsx
import { useCUITheme, useToast } from '@clickhouse/click-ui';
```
