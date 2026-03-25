# DTCG Token Specification

## Overview

This specification defines the structure, naming conventions, and metadata strategies for [Design Tokens Community Group (DTCG)](https://www.designtokens.org/tr/2025.10) format files used in the Click UI Figma Variables migration.

---

## Token Categories

### 1. Color Tokens

**Files:** `primitives.dtcg.json`, `semantic.dtcg.json`

**Primitives Naming:**

```
color/{palette}/{step}
```

Examples: `color/white`, `color/gray/50`, `color/blue/400`

**Semantic Naming:**

```
color/{category}/{subcategory}/{hierarchy}/{state}
```

Examples:

- `color/background/interactive/primary/default`
- `color/foreground/feedback/error`
- `color/border/input/default`

**Structure:**

```json
{
  "$type": "color",
  "$value": "#ffffff",
  "$description": "8px, base, space.100, 0.5rem, standard"
}
```

---

### 2. Spacing Tokens

> [!INFO]
> The Spacing tokens are based in [Atlassian Conventions](https://atlassian.design/foundations/tokens/design-tokens)

**File:** `spacing.dtcg.json`

**Naming:** Percentage-based index following 8px base unit (no leading zeros)

```
space/{percentage}
```

Examples: `space.25` (2px), `space.100` (8px), `space.400` (32px)

**Rationale:** Continuous scale (0px → 80px) with mathematical progression. Designers understand `space.200` = 2× `space.100`.

**Values:**

- `space.0` = 0px
- `space.25` = 2px
- `space.50` = 4px
- `space.75` = 6px
- `space.100` = 8px (base)
- `space.150` = 12px
- `space.200` = 16px
- `space.250` = 20px
- `space.300` = 24px
- `space.400` = 32px
- `space.500` = 40px
- `space.600` = 48px
- `space.800` = 64px
- `space.1000` = 80px

---

### 3. Radius Tokens (Atlassian Convention)

> [!INFO]
> The Radius tokens are based in [Atlassian Conventions](https://atlassian.design/foundations/tokens/design-tokens)

**File:** `radius.dtcg.json`

**Naming:** Percentage-based following continuous scale (no leading zeros)

```
radius/{percentage}
```

Examples: `radius.25` (2px), `radius.100` (8px), `radius.999` (full)

**Values:**

- `radius.0` = 0px (none, square)
- `radius.25` = 2px (tiny, subtle)
- `radius.50` = 4px (extra-small, input)
- `radius.75` = 6px (small, button-small)
- `radius.100` = 8px (base, standard)
- `radius.150` = 12px (medium, panel)
- `radius.200` = 16px (large, container)
- `radius.300` = 24px (extra-large, feature)
- `radius.400` = 32px (2xl, pill-like)
- `radius.999` = 999px (full, pill, capsule)

---

### 4. Sizing Tokens

> [!INFO]
> The Sizing tokens are NOT based in Atlassian Conventions. It's a semantic exception as its easier to reason in T-Shirt sizes because sizing is categorical and not mathematically continuous.

**File:** `sizing.dtcg.json`

**Naming:** Categorical/T-shirt sizes

```
sizing/{type}/{size}
```

Examples: `sizing/icon/sm`, `sizing/component/md`, `sizing/stroke/default`

**Rationale:** Sizing is categorical, not continuous:

- Icon sizes: 12px, 16px, 20px, 24px, 32px (specific UI sizes)
- Component sizes: 24px, 32px, 40px, 48px, 64px (specific use cases)
- Stroke widths: 1px (default), 2px (emphasis)
- Designers think: "small icon" not "icon size 50"

**Icon Sizes:** xs (12px), sm (16px), md (20px), lg (24px), xl (32px)
**Component Sizes:** xs (24px), sm (32px), md (40px), lg (48px), xl (64px)
**Stroke Widths:** default (1px), emphasis (2px)

---

### 5. Typography Tokens

> [!INFO]
> The Typography tokens are inspired in [Atlassian-style scale](https://atlassian.design/foundations/tokens/design-tokens)

**File:** `typography.dtcg.json`

**Naming:** `font/{property}/{scale-or-semantic}`

Typography uses the `font/*` namespace with Atlassian percentage-based naming for sizes:

**Font Size Scale:**

```
font/size/{percentage}
```

- `font/size/50` = 10px (xs, tiny)
- `font/size/75` = 12px (sm, small)
- `font/size/100` = 14px (md, body-sm)
- `font/size/200` = 16px (base, body)
- `font/size/300` = 18px (lg)
- `font/size/400` = 20px (xl, title-sm)
- `font/size/500` = 32px (2xl, heading)

**Line Height Scale:**

```
font/lineHeight/{percentage}
```

- `font/lineHeight/100` = 1.3 (tight, headings)
- `font/lineHeight/200` = 1.5 (relaxed, body-text)
- `font/lineHeight/300` = 1.6 (comfortable)
- `font/lineHeight/400` = 1.7 (spacious)

**Font Weight (semantic naming):**

```
font/weight/{name}
```

- `font/weight/regular` = 400 (body text)
- `font/weight/medium` = 500 (emphasis)
- `font/weight/semibold` = 600 (titles)
- `font/weight/bold` = 700 (headings)

**Note:** Composite typography strings cannot be Figma variables. This decomposition allows individual properties to be variables while typography presets remain as Text Styles.

---

## Metadata Strategy

### Automatic Description Generation

The import script generates descriptions combining:

- **Value with unit:** "8px"
- **Index reference:** "space.100"
- **Semantic aliases:** "base", "standard", "gap"
- **Rem conversion:** "0.5rem"
- **Category keywords:** "spacing", "compact", "relaxed"

**Example Output:**

```
"8px, base, space.100, 0.5rem, spacing, standard, default-gap, comfortable"
```

**Manual Override:** Include `$description` in DTCG to override auto-generation.

---

## Private Primitives

> [!NOTE]
> Primitives are private, which means that their hidden from the Figma search

**Automatic Detection:**

Files named `primitives.dtcg.json` (case-insensitive) are automatically detected. All tokens within get **NO scope** (`scopes: []`), which hides them from Figma's variable pickers while keeping them referenceable via aliases.

**How It Works:**

1. Primitives are created with `scopes: []` (empty array)
2. Figma interprets empty scopes as "NO scope" - variables don't appear in pickers
3. Semantic tokens can still reference primitives via aliases
4. Designers see only semantic tokens in the UI

**Collection Structure:**

```
Primitives (NO scope - hidden)     Semantic (Public - visible)
├── color/white   ←────────────── color/background/base
├── color/gray/50  ←────────────── color/foreground/subtle
├── space/100     ←────────────── Layout/Card-Padding
└── space/200     ←────────────── Layout/Section-Gap
```

**Import Order:**

1. Import `primitives.dtcg.json` → Creates "Primitives" collection (NO scope)
2. Import `semantic.dtcg.json` → Creates "Semantic" collection (references primitives)
3. Import component tokens → Reference semantic tokens

**Note:** The plugin automatically detects primitives files by filename. Primitives have NO scope and are hidden from UI pickers, but remain fully referenceable by semantic tokens.

---

## Scope Assignment

Automatic Figma scope inference based on token path and file type:

**For Primitives** (files named `*primitives*.dtcg.json`):

- **NO scope** (`scopes: []`) - Hidden from Figma UI pickers but referenceable by aliases

**For Semantic Tokens** (all other files):

| Path Pattern         | Scope               |
| -------------------- | ------------------- |
| `color/background/*` | `["ALL_FILLS"]`     |
| `color/border/*`     | `["STROKE_COLOR"]`  |
| `color/shadow/*`     | `["EFFECT_COLOR"]`  |
| `space/*`            | `["GAP"]`           |
| `radius/*`           | `["CORNER_RADIUS"]` |
| `sizing/*`           | `["WIDTH_HEIGHT"]`  |
| `sizing/stroke/*`    | `["STROKE_FLOAT"]`  |
| `font/size/*`        | `["FONT_SIZE"]`     |
| `font/lineHeight/*`  | `["LINE_HEIGHT"]`   |
| `font/weight/*`      | `["FONT_WEIGHT"]`   |

**Note on Sizing:** The sizing check is performed **before** spacing to ensure "sizing" doesn't accidentally match the "space" substring check.

**Note on Stroke:** The `sizing/stroke/*` pattern is checked before the general `sizing/*` pattern to ensure stroke width tokens get `STROKE_FLOAT` scope instead of `WIDTH_HEIGHT`.

**Implementation Detail:** Scopes are set by assigning to `token.scopes` property after token creation, not via constructor options. This ensures primitives get `[]` (NO scope) and semantic tokens get appropriate scopes.

---

## Implementation Details

### Key Learnings from Development

**1. Scope Assignment via Property (Not Constructor)**

Figma's Plugin API requires setting scopes as a property after token creation:

```typescript
// Correct approach
const token = figma.variables.createVariable(name, collection, type);
token.scopes = []; // or token.scopes = ["GAP"], etc.

// Incorrect approach - passing in options parameter doesn't work reliably
const token = figma.variables.createVariable(name, collection, type, {
  scopes: [],
});
```

**2. NO Underscore Prefixing**

Early attempts used `_` prefix to hide primitives, but this caused:

- Double/triple underscore bugs in token names
- Inconsistent behavior between local and published libraries
- Cleaner solution: Use NO scope (`scopes: []`) instead

**3. Primitives Detection by Filename**

Files with "primitives" in the name (case-insensitive) are automatically treated as primitives:

- Get `scopes: []` (NO scope, hidden from UI)
- All other files are semantic and get inferred scopes

**4. Sizing Before Spacing**

The order of scope checks matters:

```typescript
// Check sizing BEFORE spacing to avoid "sizing" matching "space" substring
if (name.includes("sizing") || name.includes("size")) {
  return ["WIDTH_HEIGHT"];
}
// Then check spacing
if (name.includes("space") || name.includes("gap")) {
  return ["GAP"];
}
```

**5. Correct Figma Scope Names**

Use Figma's official scope enum values:

- `ALL_FILLS` (not `FILL_COLOR`)
- `STROKE_COLOR`
- `EFFECT_COLOR`
- `CORNER_RADIUS`
- `GAP`
- `WIDTH_HEIGHT`
- `OPACITY`
- `ALL_SCOPES`

**6. Alias Scope Inheritance**

Aliased tokens (semantic referencing primitives) also need explicit scope assignment:

- Aliases don't automatically inherit scopes from source
- Must infer and assign scopes based on the alias name pattern
- Same logic applies: primitives → `[]`, semantic → inferred

**7. Duplicate Detection**

Figma stores variable names with dots internally, but DTCG uses slashes:

- Check both formats: `color/white` and `color.white`
- Prevents "duplicate variable name" errors
- Allows re-importing without manual cleanup

**8. Update Process Implementation**

Critical for updating existing tokens without breaking component assignments:

**Collection Reuse:**

```typescript
// Use async API to check for existing collections
const existingCollections =
  await figma.variables.getLocalVariableCollectionsAsync();
const existingCollection = existingCollections.find((c) => c.name === name);

if (existingCollection) {
  // Reuse existing collection
  return {
    collection: existingCollection,
    modeId: existingCollection.modes[0].modeId,
  };
}
// Otherwise create new
```

**Mode ID Preservation:**

```typescript
// When updating, use the EXISTING variable's mode ID
const existingModeIds = Object.keys(token.valuesByMode);
const targetModeId = existingModeIds[0]; // Get from variable, not new collection
token.setValueForMode(targetModeId, value);
```

**Why This Matters:**

- Prevents "mode not defined" errors
- Component assignments remain intact
- Can update values without re-linking components
- Collection names must match exactly for updates to work

**Required Fields:**

- `$type`: "color" | "number"
- `$value`: Hex string (color) | Number (spacing/radius/sizing)

**Optional Fields:**

- `$description`: Searchable metadata (auto-generated or manual)
- `$extensions`: Additional metadata (future use)

**Example:**

```json
{
  "space": {
    "100": {
      "$type": "number",
      "$value": 8,
      "$description": "8px, base, space.100, 0.5rem, spacing, standard"
    }
  }
}
```

---

## Migration Notes

**From Token Studio → Figma Variables:**

- Remove intermediate `sizes` references (spaces.1 → {sizes.2})
- Use direct pixel values in DTCG
- Old `spaces.X` becomes `space.XXX`
- Component tokens reference new Atlassian names

**Breaking Changes:**

- `spaces.1` → `space.50`
- `spaces.2` → `space.100`
- etc.

**New Additions:**

- 5 spacing values (2px, 6px, 20px, 48px, 80px)
- 10 radius values (all new category)
- 10 sizing values (all new category)

---

## Import Order

**Important:** Import primitives FIRST, then semantic tokens. This ensures aliases can resolve properly.

1. `primitives.dtcg.json` (color base values) - Creates primitives with NO scope
2. `semantic.dtcg.json` (color semantic aliases) - References primitives, gets appropriate scopes
3. `spacing.dtcg.json` (number tokens with GAP scope)
4. `radius.dtcg.json` (number tokens with CORNER_RADIUS scope)
5. `sizing.dtcg.json` (number tokens with WIDTH_HEIGHT scope)
6. `typography.dtcg.json`
7. `component.dtcg.json` (component-specific overrides)

**Collection Name Consistency (CRITICAL for Updates):**

When re-importing to UPDATE existing tokens, you MUST use the **same collection name** as the original import:

✅ **Correct - Updates existing:**

```
First import:  "Primitives (DTCG)"
Second import: "Primitives (DTCG)"  ← Same name, updates values
```

❌ **Incorrect - Creates duplicates:**

```
First import:  "Primitives (DTCG)"
Second import: "Primitives"  ← Different name, creates new variables!
```

**Why this matters:**

- Variables are scoped to collections in Figma
- Different collection name = different variable (even with same token name)
- Consistent naming enables update mode instead of duplicate creation

---

## Distribution Strategy

### CSS Output for Consumer Apps

All tokens (primitives + semantic) are output to a single `./dist/tokens.css` file. This aligns with how major component libraries distribute tokens.

**Why expose primitives to consumers?**

| Context | Primitives Visibility | Reason |
|---------|----------------------|--------|
| **Figma** | Hidden (`scopes: []`) | Designers should use semantic tokens only |
| **CSS/Code** | Exposed | Theming, devtools debugging, variable resolution |

Semantic tokens reference primitives via `var(--cui-color-gray-50)`. Consumers need access to:
- Override primitives for custom themes
- Enable dark/light mode switching
- Debug resolved values in browser devtools

### Designer vs Developer Governance

Primitives are hidden from designers but exposed to developers. This asymmetry is intentional:

| Role | Access | Rationale |
|------|--------|-----------|
| **Designers** | Semantic only | Express intent ("error color"), not implementation ("red-500") |
| **Developers** | All tokens | Need primitives for theming, debugging, edge cases |

**Developer Usage Guidelines:**

- **Components**: Use semantic tokens (`--cui-color-text-secondary`)
- **Theming**: Use primitives to override base values (`--cui-color-gray-500`)
- **Avoid**: Using primitives directly in component styles

**Recommended Guardrails:**

> [!WARNING]
> Avoid "Design system theater" where there are rules for designers and chaos for developers by advising linting rules to prevent misuage of tokens.

- Stylelint/ESLint rules to warn on primitive usage in component CSS
- Code review to catch direct primitive usage
- Clear naming: primitives use palette names, semantics describe purpose
