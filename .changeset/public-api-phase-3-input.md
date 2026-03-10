---
"@clickhouse/click-ui": minor
---

### What's Changed

Split the monolithic `Input/` component folder into 6 separate atomic components, each with dedicated exports:

- **InputWrapper** - Shared form element primitives (Wrapper, InputElement, NumberInputElement, etc.)
- **TextField** - Standard text input with label and error support
- **NumberField** - Numeric input with increment/decrement controls
- **PasswordField** - Secure text input with visibility toggle
- **SearchField** - Search-optimized input with clear button
- **TextAreaField** - Multiline text input (renamed from TextArea for consistency)

### Migration Guide

For consumers using main index imports:

```typescript
// No changes needed - these continue to work:
import { TextField, NumberField, PasswordField, SearchField, TextAreaField, InputWrapper } from '@clickhouse/click-ui';
```

For consumers wanting granular imports:

```typescript
// New atomic imports available:
import { TextField } from '@clickhouse/click-ui/TextField';
import { NumberField } from '@clickhouse/click-ui/NumberField';
import { PasswordField } from '@clickhouse/click-ui/PasswordField';
import { SearchField } from '@clickhouse/click-ui/SearchField';
import { TextAreaField } from '@clickhouse/click-ui/TextAreaField';
import { InputWrapper } from '@clickhouse/click-ui/InputWrapper';
```

Type imports:

```typescript
import type { TextFieldProps, NumberFieldProps, PasswordFieldProps } from '@clickhouse/click-ui';

// Or granular:
import type { TextFieldProps } from '@clickhouse/click-ui/TextField';
```

### Breaking Changes

- Internal import paths changed from `@/components/Input/*` to `@/components/[ComponentName]`
- `TextArea` renamed to `TextAreaField` for naming consistency
- No breaking changes for public API consumers using main exports
