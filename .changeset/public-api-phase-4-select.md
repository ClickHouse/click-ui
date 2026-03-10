---
"@clickhouse/click-ui": minor
---

**Component Architecture: Select Components Restructure**

### What's Changed

Restructured Select components into atomic exports with dedicated type files:

- **Select** - Single-select dropdown (renamed from SingleSelect for clarity)
- **MultiSelect** - Multi-select dropdown with tag-style values
- **CheckboxMultiSelect** - Multi-select with checkbox interface

Each component now has:
- Dedicated folder with index.ts exports
- Separate `.types.ts` file for clean type exports
- Stories and tests co-located with component

### Migration Guide

**For consumers using main index imports:**
```typescript
// No changes needed - these continue to work:
import { Select, MultiSelect, CheckboxMultiSelect } from '@clickhouse/click-ui';
```

**For consumers wanting granular imports (new feature):**
```typescript
// New atomic imports available:
import { Select } from '@clickhouse/click-ui/Select';
import { MultiSelect } from '@clickhouse/click-ui/MultiSelect';
import { CheckboxMultiSelect } from '@clickhouse/click-ui/CheckboxMultiSelect';
```

**Type imports:**
```typescript
import type { 
  SelectProps, 
  MultiSelectProps, 
  CheckboxMultiSelectProps,
  SelectOptionListItem,
  SelectionType 
} from '@clickhouse/click-ui';

// Or granular:
import type { SelectProps } from '@clickhouse/click-ui/Select';
import type { MultiSelectProps } from '@clickhouse/click-ui/MultiSelect';
```

### Breaking Changes
- `SingleSelect` component renamed to `Select` for clarity (old name still works via deprecation)
- Internal import paths changed from `@/components/Select/*` to `@/components/[ComponentName]`
- No breaking changes for public API consumers using main exports

### Benefits
- Clearer component naming (Select vs SingleSelect)
- Better type organization with dedicated .types.ts files
- Improved tree-shaking for consumers
- Easier to maintain and extend individual select variants
