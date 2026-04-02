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
color/{palette}-{mode}/{step}           # For mode-specific palettes
color/{palette}-{mode}/{category}/{step} # For categorized mode palettes
```

Examples: `color/white`, `color/gray/50`, `color/blue/400`, `color/charcoal/surface/200`

**Gray Color Palettes:**

| Pattern                         | Purpose                                      | Example                               |
| ------------------------------- | -------------------------------------------- | ------------------------------------- |
| `color/gray/{step}`             | Cool gray scale with blue undertone (50-950) | `color/gray/50` = #f6f7fa             |
| `color/neutral/{step}`          | Pure neutral gray scale (100-900)            | `color/neutral/200` = #dfdfdf         |
| `color/charcoal/surface/{step}` | Deep surface tones (50-450)                  | `color/charcoal/surface/50` = #151515 |
| `color/charcoal/text/{step}`    | Light text for dark backgrounds (50-400)     | `color/charcoal/text/50` = #e8e7ea    |

**Gray Scale (slate-based, monotonic):**

The `gray` palette follows the original slate palette with cool blue undertones. Steps progress monotonically from light (50) to dark (950):

| Step | Value   | Description               |
| ---- | ------- | ------------------------- |
| 50   | #f6f7fa | Subtle surface            |
| 75   | #eaebee | Muted border light        |
| 100  | #e6e7e9 | Default border            |
| 200  | #cccfd3 | Active / strong border    |
| 300  | #b3b6bd | Muted border variant      |
| 400  | #9a9ea7 | Placeholder text          |
| 500  | #808691 | Table checkbox border     |
| 600  | #696e79 | Subtle text, muted icons  |
| 700  | #53575f | Neutral / muted text      |
| 800  | #302e32 | Primary action background |
| 850  | #232125 | Hover state dark          |
| 900  | #1c1a1e | Deep dark                 |
| 950  | #161517 | Primary text, near-black  |

**Neutral Scale (pure grays, monotonic):**

The `neutral` palette provides pure grays without color tint, used for disabled states and specific UI elements:

| Step | Value   | Description            |
| ---- | ------- | ---------------------- |
| 100  | #f9f9f9 | Pure neutral light     |
| 200  | #dfdfdf | Disabled background    |
| 300  | #c0c0c0 | Disabled border        |
| 400  | #a0a0a0 | Disabled text          |
| 500  | #808080 | Mid gray               |
| 600  | #606060 | Neutral badge solid bg |
| 650  | #505050 | Button group text      |
| 700  | #414141 | Dark neutral           |
| 800  | #282828 | Codeblock dark bg      |
| 900  | #151515 | Near black             |

**Rationale:** The `gray` + `neutral` + `charcoal` naming:

- `gray` = cool gray scale (slate-based) for typical UI needs, monotonically progressing light to dark
- `neutral` = pure grays without color tint, for disabled states and colorless elements
- `charcoal` = deep tones grouped by purpose (surface vs text) for dark mode
- Avoids "light/dark" terminology which implies theme modes
- Makes intent clear: `charcoal.surface` for dark backgrounds, `charcoal.text` for light text on dark

**When to use each palette:**

- **gray**: Default choice for borders, text hierarchy, and interactive states (has subtle cool tint)
- **neutral**: Disabled states, colorless badges, code blocks (pure gray, no tint)
- **charcoal**: Dark mode surfaces and text on dark backgrounds

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
  "$description": "white, base, color.white, #ffffff"
}
```

---

### 2. Spacing Tokens

> [!INFO]
> The Spacing tokens are based on [Atlassian Conventions](https://atlassian.design/foundations/tokens/design-tokens) with a two-tier system: primitives (numeric percentage-based indices) and semantic (T-shirt sizes).

**Files:** `spacing.dtcg.json` (primitives), `semantic.dtcg.json` (semantic aliases)

**Type:** `$type: "dimension"` with DTCG object format:

```json
{
  "$type": "dimension",
  "$value": {
    "value": 8,
    "unit": "px"
  }
}
```

**Primitives Naming:**

```
space/{percentage}
```

Where `index` is percentage of 8px base unit:
- `space.100` = 8px (8 × 1)
- `space.200` = 16px (8 × 2)
- `space.400` = 32px (8 × 4)

**Semantic Naming (Consolidated T-shirt sizes):**

```
space/{size}
```

**Scale:**

| Primitive | Value | Semantic | Use Case |
|-----------|-------|----------|----------|
| `space.0` | 0px | `space.none` | No spacing, reset, compact |
| `space.50` | 4px | `space.xs` | Extra-small gaps, icon spacing |
| `space.100` | 8px | `space.sm` | Small gaps, base unit, inline |
| `space.150` | 12px | `space.md` | Medium gaps, component padding |
| `space.200` | 16px | `space.lg` | Large gaps, card padding |
| `space.300` | 24px | `space.xl` | Extra-large, container gaps |
| `space.400` | 32px | `space.2xl` | 2x large, layout sections |
| `space.600` | 48px | `space.3xl` | 3x large, major layout gaps |
| `space.1000` | 80px | `space.4xl` | 4x large, page sections |

**Skipped Values:** 25 (2px), 75 (6px), 250 (20px), 500 (40px), 800 (64px) — consolidated into adjacent semantic sizes.

**Semantic Aliases:**

```json
{
  "space": {
    "sm": {
      "$type": "dimension",
      "$value": "{space.100}",
      "$description": "Small spacing — 8px, base unit, standard gaps"
    }
  }
}
```

**Rationale:** Following Atlassian's two-tier approach:
- **Primitives** (numeric): Hidden from Figma UI, continuous mathematical scale (8px base)
- **Semantic** (T-shirt): Public-facing tokens designers use, consolidated to 9 essential sizes
- Continuous primitives allow fine-grained theming; semantic aliases provide designer-friendly names
- 8px base unit makes mental math easy: `space.200` = 2× `space.100` = 16px

---

### 3. Radius Tokens

> [!INFO]
> The Radius tokens are based on [Atlassian Conventions](https://atlassian.design/foundations/radius) with a two-tier system: primitives (numeric) and semantic (categorical).

**Files:** `radius.dtcg.json` (primitives), `semantic.dtcg.json` (semantic aliases)

**Type:** `$type: "dimension"` with DTCG object format `{ "value": 8, "unit": "px" }`

**Primitives Naming:**

```
radius/{index}
```

Examples: `radius.0`, `radius.50`, `radius.100`, `radius.999`

**Semantic Naming:**

```
radius/{size}
```

Examples: `radius.none`, `radius.sm`, `radius.md`, `radius.all`

**Scale:**

| Primitive | Value | Semantic Token | Use Case |
|-----------|-------|----------------|----------|
| `radius.0` | 0px | `radius.none` | Square corners, sharp, angular elements |
| `radius.25` | 2px | `radius.minimal` | Subtle rounding — data tables, micro UI |
| `radius.50` | 4px | `radius.sm` | Input fields, chips, tags, compact elements |
| `radius.75` | 6px | — | (Unused intermediate) |
| `radius.100` | 8px | `radius.md` | Standard buttons, cards, default components |
| `radius.150` | 12px | — | (Unused intermediate) |
| `radius.200` | 16px | `radius.lg` | Containers, modals, dialogs, panels |
| `radius.300` | 24px | `radius.xl` | Large cards, feature sections, prominent |
| `radius.400` | 32px | — | (Unused intermediate) |
| `radius.999` | 999px | `radius.all` | Fully rounded — pills, capsules, circular |

**Semantic Aliases:**

```json
{
  "radius": {
    "sm": {
      "$type": "dimension",
      "$value": "{radius.50}",
      "$description": "Small radius — input fields, chips, tags"
    }
  }
}
```

**Rationale:** Following Atlassian's approach with a two-tier system:
- **Primitives** (numeric): Hidden from Figma UI, used as base values for theming
- **Semantic** (categorical): Public-facing tokens designers use, aliased to primitives
- Allows overriding radius primitives for custom themes while maintaining semantic consistency

Designers use semantic names like "small radius for inputs" while developers can theme via primitives.

---

### 4. Sizing Tokens

> [!INFO]
> The Sizing tokens follow [Atlassian Conventions](https://atlassian.design/foundations/tokens/design-tokens) with a two-tier system: primitives (percentage-based indices following 8px base unit) and semantic (categorical T-shirt sizes).

**Files:** `sizing.dtcg.json` (primitives), `semantic.dtcg.json` (semantic aliases)

**Type:** `$type: "dimension"` with DTCG object format `{ "value": 16, "unit": "px" }`

**Primitives Naming:**

```
sizing/{category}/{index}
```

Where `index` is percentage of 8px base unit:
- `sizing/icon/150` = 12px (8 × 1.5)
- `sizing/icon/200` = 16px (8 × 2)
- `sizing/stroke/13` = 1px (8 × 0.125)
- `sizing/stroke/25` = 2px (8 × 0.25)

**Semantic Naming:**

```
sizing/{category}/{size}
```

Examples: `sizing/icon/sm`, `sizing/component/md`, `sizing/stroke/default`

**Scale:**

| Category | Primitive | Value | Semantic | Use Case |
|----------|-----------|-------|----------|----------|
| **Icon** | `icon/150` | 12px | `icon/xs` | Extra-small icons, micro UI |
| | `icon/200` | 16px | `icon/sm` | Small icons, compact UI |
| | `icon/250` | 20px | `icon/md` | Medium icons, default |
| | `icon/300` | 24px | `icon/lg` | Large icons, prominent |
| | `icon/400` | 32px | `icon/xl` | Extra-large icons, feature |
| **Component** | `component/300` | 24px | `component/xs` | Tiny buttons, micro inputs |
| | `component/400` | 32px | `component/sm` | Compact buttons, tight inputs |
| | `component/500` | 40px | `component/md` | Standard buttons, default inputs |
| | `component/600` | 48px | `component/lg` | Roomy buttons, relaxed inputs |
| | `component/800` | 64px | `component/xl` | Spacious buttons, generous inputs |
| **Stroke** | `stroke/13` | 1px | `stroke/default` | Default borders, thin outlines |
| | `stroke/25` | 2px | `stroke/emphasis` | Strong borders, selected states |

**Semantic Aliases:**

```json
{
  "sizing": {
    "icon": {
      "sm": {
        "$type": "dimension",
        "$value": "{sizing/icon/200}",
        "$description": "Small icon — 16px, compact icons, dense UI"
      }
    }
  }
}
```

**Rationale:** Following Atlassian's two-tier approach:
- **Primitives** (percentage-based): Hidden from Figma UI, aligned to 8px base unit for mathematical consistency
- **Semantic** (categorical): Public-facing tokens designers use, aliased to primitives
- Icon and component sizes are specific UI sizes that don't follow simple doubling
- Stroke widths are small values (1px, 2px) represented as fractions of the base unit
- Allows theming via primitives while designers work with intuitive T-shirt sizes

---

### 5. Typography Tokens

> [!INFO]
> The Typography tokens are inspired in [Atlassian-style scale](https://atlassian.design/foundations/tokens/design-tokens)

**File:** `typography.dtcg.json`

**Types:**

- Font sizes: `$type: "dimension"` with DTCG object format `{ "value": 16, "unit": "px" }`
- Line heights: `$type: "number"` with unitless values (e.g., `1.5`, `1.3`)
- Font weights: `$type: "number"` with integer values (e.g., `400`, `700`)

**Naming:** `font/{property}/{scale-or-semantic}`

Typography uses the `font/*` namespace with T-shirt size naming for sizes:

**Font Size Scale:**

```
font/size/{size}
```

| Token | Value | Notes |
|-------|-------|-------|
| `font/size/xs` | 10px | Extra small, tiny |
| `font/size/sm` | 12px | Small |
| `font/size/md` | 14px | Medium, body-sm |
| `font/size/lg` | 16px | Large, base, body |
| `font/size/xl` | 18px | Extra large |
| `font/size/2xl` | 20px | 2x large, title-sm |
| `font/size/3xl` | 32px | 3x large, heading |

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

Files named `primitives.dtcg.json`, `radius.dtcg.json`, `sizing.dtcg.json`, or `spacing.dtcg.json` (case-insensitive) are automatically detected. All tokens within get **NO scope** (`scopes: []`), which hides them from Figma's variable pickers while keeping them referenceable via aliases.

**How It Works:**

1. Primitives are created with `scopes: []` (empty array)
2. Figma interprets empty scopes as "NO scope" - variables don't appear in pickers
3. Semantic tokens can still reference primitives via aliases
4. Designers see only semantic tokens in the UI

**Collection Structure:**

```
Primitives (NO scope - hidden)          Semantic (Public - visible)
├── color/white               ←──────── color/background/base (light)
├── color/gray/50             ←──────── color/background/subtle (light)
├── color/charcoal/surface/50 ←──────── color/background/base (dark)
├── color/charcoal/text/50    ←──────── color/foreground/default (dark)
├── space/0                   ←──────── space/none
├── space/50                  ←──────── space/xs
├── space/100                 ←──────── space/sm
├── space/200                 ←──────── space/lg
├── radius/0                  ←──────── radius/none
├── radius/50                 ←──────── radius/sm
├── radius/999                ←──────── radius/all
├── sizing/icon/150           ←──────── sizing/icon/xs
├── sizing/icon/200           ←──────── sizing/icon/sm
├── sizing/component/500      ←──────── sizing/component/md
└── sizing/stroke/13          ←──────── sizing/stroke/default
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

| Path Pattern             | Scope               |
| ------------------------ | ------------------- |
| `color/background/*`     | `["ALL_FILLS"]`     |
| `color/border/*`         | `["STROKE_COLOR"]`  |
| `utility/color/shadow/*` | `["EFFECT_COLOR"]`  |
| `utility/color/scrim/*`  | `["EFFECT_COLOR"]`  |
| `color/foreground/*`     | `["TEXT_FILL"]`     |
| `space/*`                | `["GAP"]`           |
| `radius/*`               | `["CORNER_RADIUS"]` |
| `sizing/*`               | `["WIDTH_HEIGHT"]`  |
| `sizing/stroke/*`        | `["STROKE_FLOAT"]`  |
| `font/size/*`            | `["FONT_SIZE"]`     |
| `font/lineHeight/*`      | `["LINE_HEIGHT"]`   |
| `font/weight/*`          | `["FONT_WEIGHT"]`   |

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
const existingCollections = await figma.variables.getLocalVariableCollectionsAsync();
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

- `$type`: "color" | "dimension" | "number"
- `$value`:
  - Hex string or color object for colors
  - Object with numeric `value` and `unit` for dimensions: `{ "value": 8, "unit": "px" }`
  - Number for unitless values (e.g., line-heights, font-weights)

**Optional Fields:**

- `$description`: Searchable metadata (auto-generated or manual)
- `$extensions`: Additional metadata (future use)

**Example:**

```json
{
  "space": {
    "100": {
      "$type": "dimension",
      "$value": {
        "value": 8,
        "unit": "px"
      },
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

- 14 spacing primitive values (0, 25, 50, 75, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000)
- 9 spacing semantic aliases (none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl) referencing primitives — consolidated from 14 to 9 values
- 10 radius primitive values (0, 25, 50, 75, 100, 150, 200, 300, 400, 999)
- 7 radius semantic aliases (none, minimal, sm, md, lg, xl, all) referencing primitives
- 12 sizing primitive values (icon/150-400, component/300-800, stroke/13-25)
- 12 sizing semantic aliases (icon/xs-xl, component/xs-xl, stroke/default-emphasis) referencing primitives

---

## Import Order

**Important:** Import primitives FIRST, then semantic tokens. This ensures aliases can resolve properly.

1. `primitives.dtcg.json` (color base values) - Creates color primitives with NO scope
2. `radius.dtcg.json` (radius base values) - Creates radius primitives with NO scope
3. `sizing.dtcg.json` (sizing base values) - Creates sizing primitives with NO scope  
4. `spacing.dtcg.json` (spacing base values) - Creates spacing primitives with NO scope
5. `semantic.dtcg.json` (color + radius + sizing + spacing semantic aliases) - References primitives, gets appropriate scopes
6. `typography.dtcg.json` (dimension and number tokens for font properties) - Standalone, no semantic layer
7. `component.dtcg.json` (component-specific overrides) - References semantic tokens

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

| Context      | Primitives Visibility | Reason                                           |
| ------------ | --------------------- | ------------------------------------------------ |
| **Figma**    | Hidden (`scopes: []`) | Designers should use semantic tokens only        |
| **CSS/Code** | Exposed               | Theming, devtools debugging, variable resolution |

Semantic tokens reference primitives via CSS variables like `var(--cui-color-gray-50)` or `var(--cui-color-charcoal-surface-200)`. Consumers need access to:

- Override primitives for custom themes
- Enable dark/light mode switching
- Debug resolved values in browser devtools

**CSS Variable Examples:**

```css
/* Standard grays */
--cui-color-gray-50: rgb(96.471% 96.863% 98.039%);
--cui-color-gray-950: rgb(8.6275% 8.2353% 9.0196%);

/* Charcoal surfaces (deep tones for dark backgrounds) */
--cui-color-charcoal-surface-50: rgb(8.2353% 8.2353% 8.2353%);
--cui-color-charcoal-surface-200: rgb(13.725% 13.725% 14.51%);

/* Charcoal text (light text for dark backgrounds) */
--cui-color-charcoal-text-50: rgb(90.98% 90.588% 91.765%);
--cui-color-charcoal-text-300: rgb(50.196% 51.373% 53.333%);
```

### Designer vs Developer Governance

Primitives are hidden from designers but exposed to developers. This asymmetry is intentional:

| Role           | Access        | Rationale                                                      |
| -------------- | ------------- | -------------------------------------------------------------- |
| **Designers**  | Semantic only | Express intent ("error color"), not implementation ("red-500") |
| **Developers** | All tokens    | Need primitives for theming, debugging, edge cases             |

**Developer Usage Guidelines:**

- **Components**: Use semantic tokens (`--cui-color-foreground-subtle`)
- **Theming**: Use primitives to override base values (`--cui-color-gray-500`, `--cui-color-charcoal-surface-200`)
- **Avoid**: Using primitives directly in component styles

**Recommended Guardrails:**

> [!WARNING]
> Avoid "Design system theater" where there are rules for designers and chaos for developers by advising linting rules to prevent misuse of tokens.

- Stylelint/ESLint rules to warn on primitive usage in component CSS
- Code review to catch direct primitive usage
- Clear naming: primitives use palette names, semantics describe purpose
