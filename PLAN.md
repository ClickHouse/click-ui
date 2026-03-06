# CSS-Only Design Tokens Migration Plan

## Executive Summary

Migrate Click-UI from styled-components JavaScript theme tokens to CSS-only design tokens using CSS custom properties, CSS Modules, and CVA (Class Variance Authority). This eliminates ~8,000 lines of JS theme code, reduces bundle size by ~15-18KB (gzipped), and establishes a single source of truth in Tokens Studio JSON.

---

## Current State Analysis

### Architecture
- **91 styled-components files** using `theme.click.*` tokens
- **~4,001 lines** in `variables.light.ts`
- **~4,021 lines** in `variables.dark.ts`
- **Style Dictionary** generates TS files from Tokens Studio JSON
- **Theme switching** via `data-click-ui-theme` HTML attribute

### Key Patterns

#### 1. Static Token Access (60% of components)
```typescript
// Before: JS theme object
padding: ${({ theme }) => theme.click.button.basic.space.y};

// After: CSS custom property
padding: var(--click-button-basic-space-y);
```

#### 2. Dynamic Prop-Based Access (30% of components)
```typescript
// Before: Dynamic lookup
background: ${({ $styleType, theme }) => 
  theme.click.button.basic.color[$styleType].background.default};

// After: CVA class mapping + CSS variables
// CVA maps $styleType to CSS class, class references CSS var
```

#### 3. Complex Conditional Styles (10% of components)
- FileUpload: Nested `css`` templates
- Button: Disabled states, loading states
- Switch: Thumb position calculations

---

## Target Architecture

### Single Source of Truth
```
Tokens Studio JSON
       ↓
Style Dictionary
       ↓
   ┌────┴────┐
   ↓         ↓
CSS vars   (no JS output)
```

### Technology Stack
- **CSS Custom Properties**: All design tokens
- **CSS Modules**: Component-scoped styles
- **CVA**: Type-safe variant management
- **clsx + tailwind-merge**: Class name utilities

### File Structure
```
src/
├── theme/
│   ├── styles/
│   │   ├── tokens-light.css    # ~1,500 CSS variables
│   │   └── tokens-dark.css     # ~1,500 CSS variables
│   ├── core.ts                 # Type exports only
│   └── theme.tsx               # Simplified provider
├── lib/
│   └── cva.ts                  # CVA utility wrapper
└── components/
    ├── Button/
    │   ├── Button.tsx          # CVA + CSS modules
    │   └── Button.module.css   # CSS variables
    └── [91 components]/
```

---

## CSS Variable Naming Convention

### Mapping Strategy
```
Token Path                                      CSS Variable
─────────────────────────────────────────────────────────────────
click.button.basic.space.y              →  --click-button-basic-space-y
click.button.basic.color.primary        →  --click-button-basic-color-primary
click.global.color.background.default   →  --click-global-color-background-default
click.accordion.sm.icon.size.height     →  --click-accordion-sm-icon-size-height
```

### Naming Rules
1. Replace all `.` with `-`
2. Keep full path for uniqueness
3. Use kebab-case throughout
4. No abbreviations (clarity over brevity)

---

## Migration Strategy

### Phase 1: Infrastructure (Week 1)

#### 1.1 Install Dependencies
```bash
npm install class-variance-authority clsx tailwind-merge
```

#### 1.2 Extend Token Generator
**File**: `.scripts/js/generate-tokens.js`

Add CSS output format:
```javascript
StyleDictionary.registerFormat({
  name: 'css/variables',
  format: ({ dictionary, file }) => {
    const themeName = file.destination.replace('.css', '');
    const tokens = dictionary.allTokens
      .map(t => `  --${t.path.join('-')}: ${t.value};`)
      .join('\n');
    
    return themeName === 'tokens-light'
      ? `:root, [data-click-ui-theme="light"] {\n${tokens}\n}`
      : `[data-click-ui-theme="dark"] {\n${tokens}\n}`;
  },
});

// Add to platforms
platforms: {
  css: {
    transformGroup: 'tokens-studio',
    buildPath: 'src/theme/styles/',
    files: [
      { destination: 'tokens-light.css', format: 'css/variables' },
      { destination: 'tokens-dark.css', format: 'css/variables' }
    ]
  }
}
```

#### 1.3 Update ThemeProvider
**File**: `src/theme/theme.tsx`

```typescript
import { createGlobalStyle } from 'styled-components';
import './styles/tokens-light.css';
import './styles/tokens-dark.css';

const GlobalStyle = createGlobalStyle`
  body {
    color: var(--click-global-color-text-default);
    background: var(--click-global-color-background-default);
  }
`;

export const ThemeProvider = ({ theme, children }) => (
  <div data-click-ui-theme={theme}>
    <GlobalStyle />
    {children}
  </div>
);
```

#### 1.4 Create CVA Utility
**File**: `src/lib/cva.ts`

```typescript
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { cva, type VariantProps };
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

---

### Phase 2: Component Migration (Weeks 2-5)

#### Migration Order (Simple → Complex)

**Week 2: Simple Static Components (15 files)**
1. Spacer
2. Separator
3. Badge
4. Text
5. Avatar
6. Alert
7. Skeleton
8. EmptyState
9. LoadingState
10. InlineMessage
11. Banner
12. Tag
13. Chip
14. Kbd
15. Highlight

**Week 3: Form Components (20 files)**
1. Input
2. TextArea
3. Checkbox
4. Switch
5. Radio
6. Label
7. Field
8. Select
9. MultiSelect
10. DatePicker
11. TimePicker
12. NumberInput
13. PasswordInput
14. SearchInput
15. AutoComplete
16. FormRoot (from commonElement.tsx)
17. Error
18. HelperText
19. InputGroup
20. FormField

**Week 4: Layout & Navigation (20 files)**
1. Card
2. CardHorizontal
3. Container
4. Grid
5. Flex
6. Stack
7. Box
8. Center
9. Tabs
10. Accordion
11. Breadcrumbs
12. Pagination
13. Stepper
14. Navigation
15. Sidebar
16. Toolbar
17. AppBar
18. Footer
19. Header
20. Page

**Week 5: Complex Interactive Components (20+ files)**
1. Button (complex variants)
2. IconButton
3. SplitButton
4. Dropdown
5. ContextMenu
6. Dialog
7. ConfirmationDialog
8. Toast
9. Flyout
10. Popover
11. Tooltip
12. Modal
13. Drawer
14. Sheet
15. FileUpload (complex conditionals)
16. Table
17. DataGrid
18. List
19. Tree
20. Calendar

---

### Phase 3: Pattern Examples

#### Pattern A: Static Tokens (Simplest)

**Before**:
```typescript
// Spacer.tsx
import { styled } from 'styled-components';

export const Spacer = styled.div<{ $size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>`
  height: ${({ theme, $size }) => theme.click.spacer.size[$size]};
`;
```

**After**:
```typescript
// Spacer.tsx
import { cva, type VariantProps } from '@/lib/cva';
import styles from './Spacer.module.css';

const spacerVariants = cva(styles.spacer, {
  variants: {
    size: {
      xs: styles['spacer--xs'],
      sm: styles['spacer--sm'],
      md: styles['spacer--md'],
      lg: styles['spacer--lg'],
      xl: styles['spacer--xl'],
    },
  },
  defaultVariants: { size: 'md' },
});

export interface SpacerProps extends VariantProps<typeof spacerVariants> {}

export const Spacer = ({ size }: SpacerProps) => (
  <div className={spacerVariants({ size })} />
);
```

```css
/* Spacer.module.css */
.spacer { height: var(--click-spacer-size-md); }
.spacer--xs { height: var(--click-spacer-size-xs); }
.spacer--sm { height: var(--click-spacer-size-sm); }
.spacer--md { height: var(--click-spacer-size-md); }
.spacer--lg { height: var(--click-spacer-size-lg); }
.spacer--xl { height: var(--click-spacer-size-xl); }
```

#### Pattern B: Component Variants (Button)

**Before**:
```typescript
// Button.tsx (excerpt)
const StyledButton = styled(BaseButton)<{
  $styleType: ButtonType;
  $align?: Alignment;
  $fillWidth?: boolean;
  $loading?: boolean;
}>`
  color: ${({ $styleType = 'primary', theme }) =>
    theme.click.button.basic.color[$styleType].text.default};
  background-color: ${({ $styleType = 'primary', theme }) =>
    theme.click.button.basic.color[$styleType].background.default};
  border: ${({ theme }) => theme.click.button.stroke} solid
    ${({ $styleType = 'primary', theme }) =>
      theme.click.button.basic.color[$styleType].stroke.default};
  
  &:hover {
    background-color: ${({ $styleType = 'primary', theme }) =>
      theme.click.button.basic.color[$styleType].background.hover};
  }
  
  ${({ $loading }) => $loading && css`...`}
`;
```

**After**:
```typescript
// Button.tsx
import { cva, type VariantProps } from '@/lib/cva';
import styles from './Button.module.css';

const buttonVariants = cva(styles.button, {
  variants: {
    type: {
      primary: styles['button--primary'],
      secondary: styles['button--secondary'],
      empty: styles['button--empty'],
      danger: styles['button--danger'],
    },
    align: {
      center: styles['button--center'],
      left: styles['button--left'],
    },
    fillWidth: {
      true: styles['button--fill'],
    },
    loading: {
      true: styles['button--loading'],
    },
  },
  defaultVariants: {
    type: 'primary',
    align: 'center',
  },
  compoundVariants: [
    {
      type: 'empty',
      loading: true,
      className: styles['button--empty-loading'],
    },
  ],
});

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  label?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  disabled?: boolean;
}

export const Button = ({
  type,
  align,
  fillWidth,
  loading,
  disabled,
  ...props
}: ButtonProps) => (
  <button
    className={buttonVariants({ type, align, fillWidth, loading })}
    disabled={disabled || loading}
    {...props}
  >
    {/* button content */}
  </button>
);
```

```css
/* Button.module.css */
.button {
  display: flex;
  align-items: center;
  border-radius: var(--click-button-radii-all);
  font: var(--click-button-basic-typography-label-default);
  gap: var(--click-button-basic-space-gap);
  padding: var(--click-button-basic-space-y) var(--click-button-basic-space-x);
}

.button--primary {
  background: var(--click-button-basic-color-primary-background-default);
  color: var(--click-button-basic-color-primary-text-default);
  border: var(--click-button-stroke) solid var(--click-button-basic-color-primary-stroke-default);
}

.button--primary:hover:not(:disabled) {
  background: var(--click-button-basic-color-primary-background-hover);
  color: var(--click-button-basic-color-primary-text-hover);
  border-color: var(--click-button-basic-color-primary-stroke-hover);
}

.button--primary:active:not(:disabled) {
  background: var(--click-button-basic-color-primary-background-active);
  color: var(--click-button-basic-color-primary-text-active);
  border-color: var(--click-button-basic-color-primary-stroke-active);
}

.button--primary:disabled,
.button--primary:disabled:hover {
  background: var(--click-button-basic-color-primary-background-disabled);
  color: var(--click-button-basic-color-primary-text-disabled);
  border-color: var(--click-button-basic-color-primary-stroke-disabled);
  cursor: not-allowed;
}

/* Secondary, Empty, Danger variants... */

.button--loading {
  cursor: not-allowed;
  opacity: 0.7;
}

.button--loading::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.button--fill {
  width: 100%;
}

.button--left {
  justify-content: flex-start;
}

.button--center {
  justify-content: center;
}
```

#### Pattern C: Complex Conditionals (FileUpload)

**Before**:
```typescript
// FileUploadArea.tsx
const UploadArea = styled.div<{
  $isDragging: boolean;
  $size: 'sm' | 'md';
  $hasFile: boolean;
  $isError: boolean;
}>`
  ${props =>
    !props.$hasFile &&
    css`
      border-style: dashed;
      ${props.$isDragging &&
        css`
          background-color: ${theme.click.fileUpload.color.background.active};
        `}
    `}
  
  ${props => props.$isError && css`...`}
  
  flex-direction: ${props => 
    props.$hasFile ? 'row' : props.$size === 'sm' ? 'row' : 'column'};
`;
```

**After**:
```typescript
// FileUploadArea.tsx
import { cva, type VariantProps } from '@/lib/cva';
import styles from './FileUploadArea.module.css';

const uploadAreaVariants = cva(styles['upload-area'], {
  variants: {
    hasFile: {
      true: styles['upload-area--has-file'],
      false: styles['upload-area--no-file'],
    },
    size: {
      sm: styles['upload-area--sm'],
      md: styles['upload-area--md'],
    },
    isDragging: {
      true: styles['upload-area--dragging'],
    },
    isError: {
      true: styles['upload-area--error'],
    },
  },
  compoundVariants: [
    // No file + dragging
    { hasFile: false, isDragging: true, className: styles['upload-area--drop-target'] },
    // No file + small
    { hasFile: false, size: 'sm', className: styles['upload-area--sm-empty'] },
  ],
  defaultVariants: {
    size: 'md',
    hasFile: false,
  },
});

export const FileUploadArea = ({ isDragging, size, hasFile, isError }: Props) => (
  <div className={uploadAreaVariants({ hasFile, size, isDragging, isError })}>
    {/* content */}
  </div>
);
```

```css
/* FileUploadArea.module.css */
.upload-area {
  display: flex;
  border-radius: var(--click-fileUpload-radii-all);
  padding: var(--click-fileUpload-space-y) var(--click-fileUpload-space-x);
  transition: all var(--click-transition-default);
}

/* Direction based on props */
.upload-area--has-file {
  flex-direction: row;
  justify-content: space-between;
}

.upload-area--no-file.upload-area--sm {
  flex-direction: row;
  justify-content: space-between;
}

.upload-area--no-file.upload-area--md {
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

/* Border states */
.upload-area--no-file {
  border: 2px dashed var(--click-fileUpload-color-stroke-default);
  cursor: pointer;
}

.upload-area--has-file {
  border: 1px solid var(--click-fileUpload-color-stroke-default);
  cursor: default;
}

/* Dragging states */
.upload-area--dragging {
  background: var(--click-fileUpload-color-background-active);
  border-color: var(--click-fileUpload-color-stroke-active);
}

/* Error states */
.upload-area--error {
  border-color: var(--click-alert-color-danger);
}

/* Compound: no file + dragging */
.upload-area--drop-target {
  background: var(--click-fileUpload-color-background-active);
  border-color: var(--click-fileUpload-color-stroke-active);
  border-style: dashed;
}
```

#### Pattern D: Shared Base Components

**Before**:
```typescript
// commonElement.tsx
export const BaseButton = styled.button`
  ${({ theme }) => `
    padding: ${theme.click.button.basic.space.y} ${theme.click.button.basic.space.x};
    border-radius: ${theme.click.button.radii.all};
    gap: ${theme.click.button.basic.space.gap};
  `}
`;
```

**After**:
```typescript
// commonElement.tsx (or convert to CSS modules)
// Option 1: Keep as CSS module
// base.module.css
```

```css
/* base.module.css */
.base-button {
  padding: var(--click-button-basic-space-y) var(--click-button-basic-space-x);
  border-radius: var(--click-button-radii-all);
  gap: var(--click-button-basic-space-gap);
}

.base-input {
  padding: var(--click-field-space-y) var(--click-field-space-x);
  border-radius: var(--click-field-radii-all);
}

/* ... other shared bases */
```

---

### Phase 4: Cleanup (Week 5)

#### Delete These Files
```
src/theme/tokens/variables.light.ts      (4,001 lines)
src/theme/tokens/variables.dark.ts       (4,021 lines)
```

#### Simplify These Files
```
src/theme/core.ts                        # Remove theme objects, keep types only
src/theme/theme.tsx                      # Simplified provider
src/styled.d.ts                          # Remove DefaultTheme extension
```

#### Core.ts After
```typescript
// src/theme/core.ts
export const THEMES = {
  Dark: 'dark',
  Light: 'light',
} as const;

export type ThemeName = (typeof THEMES)[keyof typeof THEMES];
export type ActiveThemeName = ThemeName;

// No theme objects - CSS variables only
```

---

## CVA Best Practices

### 1. Variant Naming
- Use prop names as variant keys
- Use clear, semantic values
- Match prop types exactly

```typescript
const buttonVariants = cva(styles.button, {
  variants: {
    // Good: matches prop name
    type: { primary: ..., secondary: ... },
    
    // Good: clear values
    size: { sm: ..., md: ..., lg: ... },
    
    // Good: boolean prop
    loading: { true: ..., false: null },
  }
});
```

### 2. Compound Variants
Use for combinations that need special handling:

```typescript
compoundVariants: [
  // Primary button + loading state
  {
    type: 'primary',
    loading: true,
    className: styles['button--primary-loading'],
  },
  // Empty button + any state (opacity change)
  {
    type: 'empty',
    loading: true,
    className: styles['button--empty-loading'],
  },
]
```

### 3. Default Variants
Always provide defaults:

```typescript
defaultVariants: {
  type: 'primary',
  size: 'md',
  align: 'center',
}
```

### 4. CSS Module Organization
```css
/* Component.module.css */

/* Base styles */
.component { ... }

/* Variants */
.component--variantA { ... }
.component--variantB { ... }

/* States */
.component:hover { ... }
.component:focus { ... }
.component:disabled { ... }

/* Modifiers */
.component--fill { ... }
.component--loading { ... }

/* Complex combinations */
.component--variantA-loading { ... }
```

---

## Expected Outcomes

### Bundle Size Impact
| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| JS Theme Objects | ~8KB gzipped | 0KB | 8KB |
| styled-components runtime | ~12KB gzipped | 0KB | 12KB |
| CSS Variables | 0KB | ~3KB gzipped | -3KB |
| CVA Runtime | 0KB | ~1KB gzipped | -1KB |
| **Net** | **20KB** | **4KB** | **16KB (80% reduction)** |

### Additional Benefits
- **Better caching**: CSS files cached longer than JS
- **No runtime overhead**: CSS variables are native browser feature
- **Standards compliance**: CSS custom properties, CSS modules
- **Framework agnostic**: Easy migration to any framework later
- **Single source of truth**: Tokens Studio JSON → CSS only
- **Type safety**: CVA provides full TypeScript support for variants

---

## Testing Strategy

### Component Testing
1. Visual regression tests for each migrated component
2. Storybook stories for all variant combinations
3. Unit tests for CVA variant logic
4. Accessibility tests (keyboard navigation, screen readers)

### Theme Testing
1. Light/dark theme switching
2. CSS variable values match original JS tokens
3. No visual regressions in any theme
4. Theme persistence (localStorage integration)

### Bundle Testing
1. Analyze bundle size before/after
2. Verify tree-shaking of unused components
3. Check CSS chunking and lazy loading

---

## Rollback Plan

If issues arise:
1. **Per-component rollback**: Keep both versions during transition
2. **Theme provider**: Keep JS tokens alongside CSS for gradual migration
3. **Feature flags**: Use build-time flags to switch between implementations

---

## Success Criteria

- [ ] All 91 components migrated to CSS modules + CVA
- [ ] Zero `theme.click.*` references remaining
- [ ] `variables.light.ts` and `variables.dark.ts` deleted
- [ ] Bundle size reduced by ≥15KB gzipped
- [ ] All tests passing
- [ ] No visual regressions
- [ ] Theme switching works correctly
- [ ] Build process generates CSS tokens only

---

## Commands Reference

```bash
# Install dependencies
npm install class-variance-authority clsx tailwind-merge

# Generate CSS tokens
npm run generate:tokens

# Run tests
npm test

# Build for analysis
npm run build:analyze

# Visual regression tests
npm run test:visual

# Type checking
npm run typecheck

# Linting
npm run lint
```

---

## Next Steps

1. **Approve this plan**
2. **Begin Phase 1** (infrastructure setup)
3. **Migrate first component** (Spacer - simple, establishes pattern)
4. **Review and refine** pattern before bulk migration
5. **Execute remaining phases** according to timeline

---

*Plan created: March 2026*
*Estimated duration: 5 weeks*
*Risk level: Low (progressive migration, rollback capability)*
