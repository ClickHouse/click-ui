# @clickhouse/click-ui

## 0.1.0-rc.80

### Patch Changes

- 56cb7f4: Consolidate dayjs imports and plugin configuration into `src/utils/date.ts`. The dayjs package does not declare exports for its plugins, requiring explicit `.js` extensions in ESM environments. Centralizing these imports ensures consistent usage across components.

## 0.1.0-rc.79

### Minor Changes

- 1869f03: Removes `react-dom/server` `renderToStaticMarkup` from copy grid elements of `Grid` to favour the recommended `createRoot` approach suggested by React's official documentation.

  According to React [renderToStaticMarkup](https://react.dev/reference/react-dom/server/renderToStaticMarkup#caveats) "The renderToStaticMarkup works in the browser, but using it in the client code is not recommended. If you need to render a component to HTML in the browser" and React [renderToString](https://react.dev/reference/react-dom/server/renderToString) "Importing react-dom/server on the client unnecessarily increases your bundle size and should be avoided. If you need to render some component to HTML in the browser, use createRoot and read HTML from the DOM".

### Patch Changes

- 3fbefc6: Restore `onOpenAutoFocus` and `onCloseAutoFocus` props to `FlyoutContentProps`.

  These focus management props were inadvertently removed during the decoupling from Radix UI types. They are now explicitly added back to provide parity with the `Dialog` component and support common accessibility use cases.

  Note: These props are optional and only needed when customizing default focus behavior.

  **How to use?**

  ```tsx
  <Flyout.Content
    onOpenAutoFocus={e => {
      // Prevent default focus behavior
      e.preventDefault();
      // Implement custom focus logic
    }}
    onCloseAutoFocus={() => {
      // Handle focus when flyout closes
    }}
  >
    {children}
  </Flyout.Content>
  ```

## 0.1.0-rc.78

### Minor Changes

- 4c4105f: Add Lakekeeper logo

  **How to use?**

  ```tsx
  import { Logo } from '@clickhouse/click-ui';

  <Logo name="lakekeeper" />;
  ```

- 96ab2a9: Enable consumers to import hooks directly via `@clickhouse/click-ui/hooks` following the same pattern as component imports.

  **How to use?**

  Import hooks from the new dedicated path:

  ```tsx
  import { useToast, useInitialTheme } from '@clickhouse/click-ui/hooks';
  ```

  Main entry point still works:

  ```tsx
  import { useToast, useInitialTheme } from '@clickhouse/click-ui';
  ```

## 0.1.0-rc.77

### Minor Changes

- d936174: Add `convert:regenerate` command to regenerate asset types (logos, icons, flags, payments) without adding new components. This allows refreshing types.ts and registry files (Light/Dark) when the converter script is updated or when imports need to be standardized.

  **How to use?**

  Regenerate all asset types:

  ```
  yarn convert:regenerate
  ```

  Regenerate a specific asset type only:

  ```
  yarn convert:regenerate --type=icons
  ```

  Supported values for `--type`: `logos`, `icons`, `flags`, `payments`

- 3616770: Improved TypeScript type exports for better support and consumer app integration:
  - **CardHorizontal**: Enhanced type definitions with proper ReactNode and event handler types
  - **CardSecondary**: Added explicit type exports for card states and sizes
  - **Collapsible**: Updated IconWrapper component types for better accessibility
  - **IconButton**: Refined type definitions for button states and sizes
  - **Sidebar components**: Improved type safety for navigation items and collapsible sections
  - **VerticalStepper**: Extracted VerticalStepProps to dedicated types file for reusability

- bc2821d: ### What's Changed

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

- 7b25a0e: ### What's Changed

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
  import {
    TextField,
    NumberField,
    PasswordField,
    SearchField,
    TextAreaField,
    InputWrapper,
  } from '@clickhouse/click-ui';
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
  import type {
    TextFieldProps,
    NumberFieldProps,
    PasswordFieldProps,
  } from '@clickhouse/click-ui';

  // Or granular:
  import type { TextFieldProps } from '@clickhouse/click-ui/TextField';
  ```

  ### Breaking Changes
  - Internal import paths changed from `@/components/Input/*` to `@/components/[ComponentName]`
  - `TextArea` renamed to `TextAreaField` for naming consistency
  - No breaking changes for public API consumers using main exports

- bd0f4f3: ### What's Changed

  Restructured Select components into atomic exports with dedicated type files:
  - **Select** - Single-select dropdown (renamed from SingleSelect for clarity)
  - **MultiSelect** - Multi-select dropdown with tag-style values
  - **CheckboxMultiSelect** - Multi-select with checkbox interface

  Each component now has:
  - Dedicated folder with index.ts exports
  - Separate `.types.ts` file for clean type exports
  - Stories and tests co-located with component

  ### Migration Guide

  For consumers using main index imports:

  ```typescript
  // No changes needed - these continue to work:
  import { Select, MultiSelect, CheckboxMultiSelect } from '@clickhouse/click-ui';
  ```

  For consumers wanting granular imports:

  ```typescript
  // New atomic imports available:
  import { Select } from '@clickhouse/click-ui/Select';
  import { MultiSelect } from '@clickhouse/click-ui/MultiSelect';
  import { CheckboxMultiSelect } from '@clickhouse/click-ui/CheckboxMultiSelect';
  ```

  Type imports:

  ```typescript
  import type {
    SelectProps,
    MultiSelectProps,
    CheckboxMultiSelectProps,
    SelectOptionListItem,
    SelectionType,
  } from '@clickhouse/click-ui';

  // Or granular:
  import type { SelectProps } from '@clickhouse/click-ui/Select';
  import type { MultiSelectProps } from '@clickhouse/click-ui/MultiSelect';
  ```

  ### Breaking Changes
  - Internal import paths changed from `@/components/Select/*` to `@/components/[ComponentName]`
  - No breaking changes for public API consumers using main exports

### Patch Changes

- 5ca8259: Add a new logo asset for Apache Iceberg

  **How to use?**

  ```tsx
  import { Logo } from '@clickhouse/click-ui';

  <Logo name="apache-iceberg" />;
  ```

- bfd8666: Fix SVG converter script to generate proper Props interfaces (LogoProps, IconProps, FlagProps, PaymentProps) in asset type files. Previously, the `propsTypeName` configuration was missing, causing Props interfaces to be absent from generated types.

## 0.1.0-rc.76

### Minor Changes

- 11a8c47: The `useLayoutEffect` watching `headers.length` wasn't triggered when headers were reordered (e.g., in sysadmin EntitiesTable with column selection), causing Column widths to be misaligned after reordering, NaN values appearing during resize operations and an incorrect null check (`-1 !== null`) that was always true.

## 0.1.0-rc.75

### Minor Changes

- ab8d42c: Rename the asset filenames to be more inline with branding styled

### Patch Changes

- 53a03d7: Add `:focus-visible` outline ring to Button, Select trigger, Dropdown trigger, and ContextMenu trigger for WCAG SC 2.4.7 (Focus Visible) compliance.
- 68685c0: Add visible keyboard focus ring to menu items (Dropdown, Select, ContextMenu) for WCAG SC 2.4.7 and SC 1.4.11 compliance. Introduces `useInputModality` hook and `stroke.focus` theme tokens.
- 62a0cb7: Remove unnecessary aliases due to asset name normalisation.
- 455f94b: Fix Table column resize producing NaN width values when columnWidths array is not fully initialized.

## 0.1.0-rc.74

### Minor Changes

- ae8b66c: Refactors themed logos to use single theme-aware components and adds simple aliases for commonly used asset names.

  **Theme-aware logos**

  Logos with light/dark variants (`kafka`, `github`, `clickhouse`, `rust`, `tableau`, `feature-database`, `feature-hexagon`) are now consolidated into single components that automatically switch based on the current theme. This follows the existing pattern used by `OVH` and `AWS` logos.

  Before:

  ```tsx
  // Had to explicitly choose the variant
  <Logo name="kafka-light" />
  <Logo name="kafka-dark" />
  ```

  After:

  ```tsx
  // Automatically switches based on theme
  <Logo name="kafka" />
  ```

  **Simple aliases for non-themed assets**

  Added aliases for commonly used asset names that map to their kebab-case equivalents:

  | Alias           | Resolves to     |
  | --------------- | --------------- |
  | `mysql`         | `my-sql`        |
  | `mongodb`       | `mongo-db`      |
  | `nodejs`        | `node-js`       |
  | `golang`        | `go-lang`       |
  | `warpstream`    | `warp-stream`   |
  | `digital_ocean` | `digital-ocean` |
  | `onelake`       | `one-lake`      |

  ```tsx
  // Both work identically
  <Logo name="mysql" />
  <Logo name="my-sql" />
  ```

### Patch Changes

- 25bfc23: Explicitly sets box-sizing: content-box on predefined date picker lists. This prevents them for being pushed to too small a size when the app they're in uses a different box sizing model"
- 1f6cda6: Expose narrow asset types from public API: `LogoName`, `LogoProps`, `FlagName`, `FlagProps`, `TextFieldProps`

## 0.1.0-rc.73

### Minor Changes

- 0a11bf7: Introduces a centralised asset configuration with unified aliases and deprecated name mappings. This provides a single source of truth for asset name resolution across all asset types (Icons, Logos, Flags, and Payments), helping to resolve circular dependencies while offering a flexible aliasing system.

  ### Why aliases?

  Asset naming conventions use kebab-case (e.g., `c-sharp`, `arrow-down`) to facilitate file organisation and ensure valid JavaScript identifiers. However, users may prefer more intuitive names that don't follow these conventions. Aliases bridge this gap.

  For example, `c#` contains a `#` character which is not a valid JavaScript identifier, but users might still prefer using `c#` over `c-sharp`.

  ### How to use aliases

  Aliases are defined in `src/components/Assets/config.ts` under `ASSET_NAME_MAPPINGS.aliases`:

  ```tsx
  export const ASSET_NAME_MAPPINGS = {
    aliases: {
      'c#': 'c-sharp',
      // Add more aliases as needed
    } as AssetAliasMap,
    // ...
  };
  ```

  The alias is then automatically resolved when using any asset component:

  ```tsx
  // Both of these work identically:
  <Logo name="c#" />
  <Logo name="c-sharp" />
  ```

- 1caeabb: Replaces the `isResponsive` boolean prop with a more explicit `mobileLayout` prop on the Table component. It clearly states the behavior, while isResponsive requires knowing what "responsive" means here and both are technically "responsive".

  The mobile layout version's more extensible, e.g. a new mode can be easily introduced such as `compact` without breaking changes.

  **Migration guide:**

  ```tsx
  // Before
  <Table isResponsive={true} />
  <Table isResponsive={false} />

  // After
  <Table mobileLayout="list" /> // or use just <Table />
  <Table mobileLayout="scroll" />
  ```

  The new `mobileLayout` prop accepts:
  - `"list"` (default): Converts to mobile list view on narrow screens
  - `"scroll"`: Maintains table layout with horizontal scroll on narrow screens

  **Data attribute change:**

  The `data-responsive-mode` attribute has been renamed to `data-mobile-layout`. If you have custom CSS targeting `[data-responsive-mode='list']` or `[data-responsive-mode='scroll']`, update to `[data-mobile-layout='list']` or `[data-mobile-layout='scroll']`.

- 93149dd: Expose `DateTimeRangePicker` component and related types to the public API.

  **What's new:**
  - `DateTimeRangePicker` - A date/time range picker component for selecting date and time ranges
  - `DateTimeRangePickerProps` - TypeScript props for the DateTimeRangePicker component
  - `DateRangePickerProps` - TypeScript props for the DateRangePicker component
  - `DatePickerProps` - TypeScript props for the DatePicker component

  **How to use?**

  ```tsx
  import { DateTimeRangePicker, DateTimeRangePickerProps } from '@clickhouse/click-ui';

  const MyComponent = () => (
    <DateTimeRangePicker onChange={range => console.log(range)} />
  );
  ```

### Patch Changes

- 2e1438f: Restore useCUITheme while flagging it as deprecated.
- e861899: Fix incorrect type export: `ImageName` (which includes icons, logos, flags, and payments) was incorrectly exported only as `IconName`. Now exports both `IconName` and `ImageName` types.

  **What changed?**

  This fix introduces a potential subtle breaking change. Previously, consumers importing `IconName` were actually getting `ImageName` (i.e., `IconName | LogoName | FlagName | PaymentName`). After this fix, `IconName` becomes the narrower type (icons only). If you were passing logo, flag, or payment names into a variable typed as `IconName`, you may now see TypeScript errors. Update those usages to use `ImageName` instead.

## 0.1.0-rc.72

### Minor Changes

- a54b59d: Adds a new `DateTimePicker` component for selecting date and time ranges with precision control. This component combines calendar-based date selection with time input fields, supporting both predefined time ranges and custom selections.

  ## What has changed?
  - New `DateTimePicker` component for selecting date-time ranges
  - Support for predefined time periods (e.g., "Past 15 minutes", "Past hour")
  - Custom date range selection with start/end calendars
  - Time input with hours, minutes, and optional seconds
  - AM/PM meridiem toggle for 12-hour format
  - Calendar can open to the left or right via `openDirection` prop
  - Time selection is retained when changing dates
  - Support for disabling future dates
  - Maximum range length constraint support
  - Helper function "predefined time periods for DateTimePicker" for common time ranges

  ## How to use?

  Basic usage with custom date range selection:

  ```tsx
  import { DateTimePicker } from '@clickhouse/click-ui';

  <DateTimePicker
    onSelectDateRange={(startDate, endDate) => {
      console.log('Selected range:', startDate, endDate);
    }}
    placeholder="Select date range"
  />;
  ```

  With predefined time periods:

  ```tsx
  import {
    DateTimePicker,
    getPredefinedTimePeriodsForDateTimePicker,
  } from '@clickhouse/click-ui';

  <DateTimePicker
    predefinedTimesList={getPredefinedTimePeriodsForDateTimePicker()}
    onSelectDateRange={(startDate, endDate) => {
      console.log('Selected range:', startDate, endDate);
    }}
  />;
  ```

  With all options:

  ```tsx
  <DateTimePicker
    startDate={new Date()}
    endDate={new Date()}
    disabled={false}
    futureDatesDisabled={true}
    futureStartDatesDisabled={false}
    maxRangeLength={30}
    onSelectDateRange={(startDate, endDate) => handleRangeChange(startDate, endDate)}
    openDirection="left"
    placeholder="start date – end date"
    predefinedTimesList={customPredefinedList}
    shouldShowSeconds={true}
  />
  ```

- b797f89: Provides control to fix the the Date picker content misalignment on smaller viewports or resizing.

  **What changed?**
  - Exposed `responsivePositioning` prop on `DatePicker` and `DateRangePicker` components (default: `true`)
  - When enabled, dropdowns automatically adjust position to stay within viewport with 100px padding
  - This fixes the Date picker dropdown becoming misaligned on resize and smaller viewports

  **How to use?**

  All dropdowns now automatically adjust to stay within viewport by default.

  To disable this behavior use the `responsivePositioning` prop:

  ```tsx
  // Disable responsive positioning on Dropdown
  <Dropdown>
    <Dropdown.Trigger>Open</Dropdown.Trigger>
    <Dropdown.Content responsivePositioning={false}>
      <Dropdown.Item>Item</Dropdown.Item>
    </Dropdown.Content>
  </Dropdown>

  // Disable on DatePicker
  <DatePicker
    onSelectDate={handleSelect}
    responsivePositioning={false}
  />

  // Disable on DateRangePicker
  <DateRangePicker
    onSelectDateRange={handleRange}
    responsivePositioning={false}
  />
  ```

- ae7584f: Introduced a new date-range picker using a simple two-phase process for year and month selection to make the date selection user experience more elegant.

  Currently, jumping through many years requires multiple clicks and scrolls, making the whole process tiring. The issue was originally reported in reported issue [#752](https://github.com/ClickHouse/click-ui/issues/752).

  **How to use?**

  To quickly navigate to a different month and year in the Datepicker:
  1. Click the header showing the current month and year (e.g., "Feb 2026")
  2. Select your desired year from the grid (current year is highlighted)
  3. Select the month from the grid (current month is highlighted)
  4. Select the day from the calendar

  This allows you to jump to any date without clicking through months one at a time.

  **Progressive input display**

  As you progress through the two-phase selection, the input field updates to reflect your choices:
  - After selecting a year: displays "2026"
  - After selecting a month: displays "Feb 2026"
  - After selecting a day: displays the full date "Feb 26, 2026"

  If the picker is dismissed before completing the selection, the input reverts to the previously selected date.

  **Visual improvements**
  - Current day, month, and year are highlighted with an active background
  - When a date is selected, only the selected date shows the active highlight (not today)

- 02a4854: The Click-UI source code has several circular dependencies that must be resolved.

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

- 7dad1bb: The team should have full control over the Public API to manage which resources are available for use in consumer applications. Previously, consumer applications had unrestricted access to internal resources, which is undesirable.

  For example, third-party APIs like the primitive components provided by Radix UI were directly exposed, meaning that if those primitives were ever swapped out, any consumer applications depending on them would break due to tight coupling.

  With these changes in place, core maintainers can now manage the Public API through a clear and friendlier interface.

  ## Removed Paths

  The following subpath exports have been removed as they were intended as internal implementation details:
  - `@clickhouse/click-ui/Collapsible`
  - `@clickhouse/click-ui/IconWrapper`
  - `@clickhouse/click-ui/MiddleTruncator`

  If you were importing from these paths, please migrate to the public API exports from the main entry point (`@clickhouse/click-ui`).

  ## How to use?

  The public API is controlled through the main barrel file at `src/index.ts`. This file serves as the single source of truth for all components, types, and utilities exported by the package.

  > **Note:** The `generate:exports` script uses the TypeScript Compiler API to parse `src/index.ts` directly and extract only the components that are explicitly exported. This ensures that only public API components get subpath exports in `package.json`, while internal components remain inaccessible via direct imports.

  Maintainers can add or remove components from the public API by updating the exports in this file. Each export should include both the component and its associated types to ensure consumers have full type support.

  Here's an example of `src/index.ts`:

  ```ts
  // Adding a new component to the public API
  export { Button } from './components/Button';
  export type { ButtonProps } from './components/Button';

  // Removing a component (simply delete)
  ```

  After, you must run the `generate:exports` to update the component-level exports in the package.json file.

  Once complete, commit your changes.

- f071983: Given the request [813](https://github.com/ClickHouse/click-ui/issues/813), the following provides support for root colour theme attributes.

  The process will provide control for the consumer's main html, e.g. data-cui-theme. It'll get preferred theme from localStorage (if available), to prevent theme flashing, e.g. due to SSR vs browser runtime. Note that there'll be further changes once the set of PRs are merged (see https://github.com/ClickHouse/click-ui/pulls/punkbit).

  It also provides documentation explaining how to use it in the consumer application.

  **How to use?**

  The `InitCUIThemeScript` applies a `data-cui-theme` attribute to the root `<html>` element, allowing you to style custom elements with vanilla CSS.

  For example, edit your consumer app `stylesheet` and introduce custom styles as follows:

  ```css
  [data-cui-theme='light'] {
    --my-app-bg: #ffffff;
    --my-app-text: #1a1a1a;
  }

  [data-cui-theme='dark'] {
    --my-app-bg: #0a0a0a;
    --my-app-text: #f5f5f5;
  }

  .my-custom-component {
    background: var(--my-app-bg);
    color: var(--my-app-text);
  }
  ```

- 450e947: Extend ButtonGroup with multi-selection support, offering both controlled and uncontrolled modes so consumers can manage state themselves or delegate it to the component when only the resulting selection is required.

  **What changed?**
  - Added `multiple` prop to enable multi-selection mode
  - `onClick` callback returns `string` in single mode (backward compatible) and `Set<string>` in multiple mode
  - Exported `SelectionValue` type for consumers

  **How to use?**

  Single selection (default) - backward compatible:

  ```tsx
  <ButtonGroup
    options={[
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ]}
    defaultSelected="a"
    onClick={(value, selected) => console.log(selected)}
  />
  ```

  Multiple selection which state is provided internally by component

  ```tsx
  <ButtonGroup
    multiple
    options={[
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ]}
    defaultSelected={new Set(['a'])}
    onClick={(value, selected) => console.log([...selected])}
  />
  ```

  Multiple selection which state's controlled by consumer app

  ```tsx
  const [selected, setSelected] = useState<Set<string>>(new Set(['a']));
  <ButtonGroup
    multiple
    options={[
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ]}
    selected={selected}
    onClick={(_, newSelection) => setSelected(newSelection as Set<string>)}
  />;
  ```

- 0f32e3f: Adds a new `isResponsive` prop to the Table component.

  The default behavior (`isResponsive={true}`) remains unchanged, preserving the responsive mobile list view conversion.

  When set to `false`, the table maintains its standard layout with horizontal scroll on narrow screens instead of automatically converting to a mobile list view.

  **How to use?**

  To disable the mobile list view and keep the table layout with horizontal scroll:

  ```tsx
  <Table isResponsive={false}>{/* Table content */}</Table>
  ```

  If you don't define isResponsive it'll default to default behaviour:

  ```tsx
  <Table>{/* Table content */}</Table>
  ```

- 61b90a5: Enable keyboard date picker selection

  Added keyboard navigation support to the DatePicker component, allowing users to select dates without using a mouse. This improves accessibility and provides a faster workflow for power users.

  **Keyboard Navigation**
  - Arrow keys (Up/Down/Left/Right) to navigate between days
  - Arrow keys (Left/Right) to navigate between header controls (chevron buttons and title)
  - Enter or Space to select a date
  - Tab to navigate to previous/next month chevrons
  - Current day, month, or year temporarily reverts to default styling when keyboard focused to make the yellow focus ring clearly visible

  **How to use?**

  To select a date using only your keyboard:
  1. Tab to the date picker input and press Enter to open the calendar
  2. Use Arrow keys to navigate to your desired day:
     - Left/Right arrows move between days
     - Up/Down arrows move between weeks
  3. Press Enter or Space to select the highlighted date
  4. The calendar will close automatically upon selection

  To navigate months and years:
  1. Tab to the month/year header and press Enter to open the year/month selector
  2. Use Arrow keys to navigate the year grid
  3. Press Enter to select a year
  4. Use Arrow keys to navigate the month grid
  5. Press Enter to select a month
  6. Navigate days and press Enter to select the final date

  To navigate header controls:
  1. When focused on a chevron button or the title, use Left/Right arrow keys to cycle between them
  2. In days view: navigate between prev chevron → title → next chevron
  3. In years view: navigate between the two visible chevron buttons

  **Implementation Changes**
  - Replaced Dropdown with Popover component for better focus management
  - Added focus management with refs to track keyboard position
  - Implemented keyboard event handlers for Arrow keys, Enter, and Space
  - Added horizontal navigation for header controls (chevron buttons and title)
  - Active elements (today's date, selected date) temporarily revert to default styling when keyboard focused to ensure the yellow focus ring is always visible

- 3c0312e: Improve current date visibility in the date picker. Previously, the current date used a subtle font weight increase that was barely noticeable depending on OS and browser font rendering. Now it uses a background highlight for better contrast.

  **How it works?**
  - Adds `$isToday` styling with a subtle background to day, month, and year cells
  - `$isActive` (yellow background) only applies when a date is actually selected
  - Hover state resets to yellow border with transparent background across all states
  - Year/month selection via title click is disabled for DateRangePicker

- 65a573d: Enforce generic type annotation style for arrays via ESLint
  - Added `@typescript-eslint/array-type` ESLint rule with `'generic'` option to enforce `Array<Type>` notation over `Type[]`
  - Auto-fixed all 36 existing array type violations across the codebase

- d45c526: Provide an elegant file architecture pattern inspired by major component libraries. It has a main component, whose name serves as a namespace for types, styles, tests, stories (storybook) and a public export file. This is a first pass; further passes and iterations will be required, which is done to lower the risk of breaking changes.

  **What has changed?**

  It aims to provide the following:

  ```
  components/
  ├── Button/
  │   ├── Button.tsx          # Main component (namespace)
  │   ├── Button.types.ts     # TypeScript types
  │   ├── Button.styles.ts    # Styles
  │   ├── Button.test.tsx     # Tests
  │   ├── Button.stories.tsx  # Storybook stories
  │   └── index.ts            # Component-level exports
  ├── Input/
  │   ├── Input.tsx
  │   ├── index.ts
  │   └── ...
  └── index.ts                # Exports
  ```

  **Fixes**
  - ContextMenu.types.ts: Added missing `type?: 'default' | 'danger'` prop to exported `ContextMenuItemProps`
  - ContextMenu.tsx: Removed duplicate `ArrowProps` and `ContextMenuItemProps` exports, now imports from `./ContextMenu.types`
  - Button.tsx: Removed duplicate `Alignment` type (already defined in Button.types.ts)
  - Flyout.types.ts: Replaced stale type definitions with correct types from Flyout.tsx (`DialogContentProps`, `FlyoutHeaderProps`, `FlyoutFooterProps`)
  - Flyout.types.ts: Fixed `'orientaion'` typo to `'orientation'` in `Omit` calls

- 71fb216: Introduces click-ui's own `DialogProps` and `DialogTriggerProps` types, replacing direct Radix UI type re-exports. This decouples the public API from internal implementation details.

  **What's new:**
  - `DialogProps`, `DialogTriggerProps` - click-ui's own types with the same API you're used to
  - `FlyoutContentProps`, `FlyoutTriggerProps` - for advanced use cases (e.g., creating typed wrapper components)

  **Example**

  ```tsx
  import { Flyout, FlyoutContentProps, FlyoutTriggerProps } from '@clickhouse/click-ui';

  const MyTrigger = (props: FlyoutTriggerProps) => <Flyout.Trigger {...props} />;
  const MyContent = (props: FlyoutContentProps) => <Flyout.Content {...props} />;
  ```

  **How to migrate?**

  For most users, no changes needed! `DialogProps` works exactly as before.

  If you were importing Radix types directly from click-ui (`HoverCardProps`, `PopoverProps`, `ContextMenuProps`), import from Radix instead:

  ```tsx
  // Before
  import { HoverCardProps } from '@clickhouse/click-ui';

  // After
  import { HoverCardProps } from '@radix-ui/react-hover-card';
  ```

- 74feae1: Adds an `openDirection` prop to `DateRangePicker` that controls which side the custom date range calendar opens. This is useful when the component is positioned near the right edge of the viewport, allowing the calendar to open on the left side to prevent overflow.

  ## What has changed?
  - New `openDirection` prop accepts `'left'` or `'right'` (defaults to `'right'`)
  - Automatic viewport detection, if the calendar would overflow the right side of the viewport, it automatically opens on the left
  - Calendar direction resets to the configured `openDirection` when the picker is closed

  ## How to use?

  Default behavior (opens to the right):

  ```tsx
  import { DateRangePicker } from '@clickhouse/click-ui';

  <DateRangePicker
    onSelectDateRange={(startDate, endDate) => {
      console.log('Selected range:', startDate, endDate);
    }}
  />;
  ```

  Open calendar on the left (useful when positioned on the right side of the page):

  ```tsx
  <DateRangePicker
    openDirection="left"
    predefinedDatesList={predefinedDatesList}
    onSelectDateRange={(startDate, endDate) => {
      console.log('Selected range:', startDate, endDate);
    }}
  />
  ```

- 29c6bc5: Resolve component path redundancy and allow public API encapsulation.

  As work progressed on reducing import path verbosity, several deeper issues surfaced that were addressed as part of this PR. Component import statements previously required the component name twice, e.g. clickhouse/click-ui/components/EllipsisContent/EllipsisContent, which was unnecessary. Beyond that, the original version inadvertently exposed internal implementation details, allowing consumers to directly access and depend on third-party APIs such as Radix UI components and types. This has led to applications incorrectly coupling themselves to these internals rather than the library's intended public API, a problem that now requires careful, incremental cleanup using @deprecated warnings.

  While addressing the above, circular dependencies were discovered throughout the source code. These were not anticipated but were resolved as part of this PR, and new ESLint rules have been introduced to prevent them from reappearing as the library grows.

  Finally, after #773 (distribute unbundled) was merged, which solved critical distribution size issues, could now confirm that tree-shaking works correctly under the revised conditions and both import strategies, e.g. top-package level and component-level.

  ### API improvements
  1. Elegant import statements with zero performance cost, e.g. gets rid of redundant component name on import, such as `@clickhouse/click-ui/components/EllipsisContent/EllipsisContent`

  ```tsx
  import { EllipsisContent } from '@clickhouse/click-ui/EllipsisContent';
  ```

  2. Decoupling consumers from the underlying implementation and improving the long-term maintainability of the library, e.g. The original version exposes internal implementation details, allowing consumers to directly access and depend on third-party APIs such as Radix UI elements/types. This has led to applications incorrectly coupling themselves to these internals rather than the library's intended public API, which now requires a lot of unwanted work as we have to rely on `@deprecated` warnings to remove them gradually! The PR addresses this by encapsulating these details, ensuring only the deliberate public API surface is accessible.

  ### Build output size improvements

  The [original production version](https://www.npmjs.com/package/@clickhouse/click-ui/v/0.0.250) of the Click UI library had a critical bundling issue, producing a build output of 1,216.21 kB with chunks exceeding the 500 kB threshold after minification.
  To benchmark the improvements, a baseline Vite app without Click UI was measured at 193.30 kB. After integrating the updated PR version of Click UI, the results were as follows:

  Importing a component via the main barrel file / public API produced a build output of 223.70 kB, an overhead of just ~30 kB over the baseline. Importing directly from the component-specific export path (e.g. @clickhouse/click-ui/Button) brought this down marginally further to 223.09 kB.

  Both approaches represent a dramatic reduction from the original, with the PR version adding less than 30 kB over a bare Vite app regardless of import strategy.

  This is made possible by several changes to resolve component paths and, of course, by the introduction of #773, which makes the package distribution unbundled and moves optimisation responsibility to the consumer side. Before, the consumer always had an unscalable bundled/unoptimizable package of 1,216.21 kB.

### Patch Changes

- 736477b: Removes the ESLint/TSLint rule that enforced arrays to be typed using generic syntax (Array<T>) instead of the shorthand array syntax (T[]).

  The generic array annotation style (Array<T>) adds verbosity without meaningful benefit. Removing this lint rule allows developers to use idiomatic TypeScript, such as the more concise T[] shorthand, which reduces friction and improves readability, e.g., TypeScript docs, LSP will show T[] and not Array<T>.

- 5831d60: Deprecated StyledLinkProps and linkStyles in the public API. These will be removed in a future release to prevent leaking styled-components implementation details, e.g. $size and $weight transient props in the Public API

  ## Migration Guide (Recommended)

  The Link component already:
  - Accepts a component prop to render as any element type
  - Accepts size and weight props
  - Passes through all other props, e.g. onClick, etc.

  We recommend migrating away from the deprecated APIs:
  - Replace StyledLinkProps and linkStyles usage
  - Remove the CuiStyledLink styled component definition
  - Use `<Link component={RouterLink} size="md" weight="normal" ...>` directly

  Current common consumer pattern uses the deprecated internal styling APIs:

  ```tsx
  import { Link } from 'react-router-dom';
  import { linkStyles, StyledLinkProps } from '@clickhouse/click-ui';

  const CuiStyledLink = styled(Link)<StyledLinkProps>`
    ${linkStyles}
  `;

  <CuiStyledLink
    $size="md"
    $weight="normal"
    to="/path"
  >
    text
  </CuiStyledLink>;
  ```

  Recommended Pattern:

  ```tsx
  import { Link as RouterLink } from 'react-router-dom';
  import { Link } from '@clickhouse/click-ui';

  <Link
    component={RouterLink}
    size="md"
    weight="normal"
    to="/path"
  >
    text
  </Link>;
  ```

  **Note:** These deprecated APIs will be removed in a future major release. Please migrate before then to avoid breaking changes.

- d4624f1: Restore changes lost in PR 841-845 merge conflict resolution.

  **What changed:**
  - Removed the `Common/` barrel-export directory that was causing circular dependency issues
  - Split shared components into their own directories: `CrossButton`, `EmptyButton`, `GridCenter`, `FormContainer`
  - Updated imports across components to use direct paths instead of `@/components/Common`

  This is an internal refactoring with no public API changes.

- b061496: Add circular dependency check to prevent and detect circular import cycles that can cause build issues, runtime errors, and bundle size problems.

  ## How to use?

  Run the circular dependency check:

  ```sh
  yarn circular-dependency:check
  ```

  The command analyzes the source code starting from the `src` directory and reports any circular dependencies found.

  To check a specific entry point:

  ```sh
  yarn circular-dependency:check src/components
  ```

  If circular dependencies are detected, the output will show the file paths involved in the cycle, helping you identify which imports need to be refactored to break the dependency chain.

- a984177: Remove package linker from postinstall hook in package.json

## 0.1.0-rc.69

### Minor Changes

- e8593d6: Extended the build process to include a build output health check. The health check occurs locally and as a separate step in the CI.

### Patch Changes

- 1a2cb02: Build error due to assets wrong type for theme name

## 0.1.0-rc.68

### Minor Changes

- a4a16b8: Added new icon components: ChartCloud and ChartSquare.
- 9dad00d: Add PlanetScale logo
- bbdfb43: Truncate filenames by shortening the middle revealing critical parts.

  Assume you have:

  ```
  console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-001.csv
  console.clickhouse.cloud_Archive.01-01-1975.lorem-ipsum-a-very-long-filename-005.csv
  dashboard.mongodb.atlas_Export.12-15-2024.customer-data-analysis-report-final-v2.json
  admin.postgresql.heroku_Backup.03-22-2023.transaction-logs-monthly-summary-march.sql
  ```

  In the current faulty version you'd get something like:

  ```
  console.clickhouse.cloud_Archive.01-~.csv
  console.clickhouse.cloud_Archive.01-~.csv
  dashboard.mongodb.atlas_Export.12-1~.csv
  admin.postgresql.heroku_Backup.03-2~.csv
  ```

  Notice that the first two filenames, when presented truncated, have the same shortened name, making it hard to differentiate.

  In the PR proposed version you'd find easier to identify files if these are named in a maintainable way:

  ```
  console.clickh...filename-001.csv
  console.clickh...filename-005.csv
  dashboard.mong...ort-final-v2.json
  admin.postgres...ummary-march.sql
  ```

  Notice that the first and last digits help identify the file more concisely, allowing for a shorter length.

- e0c3541: Makes the distributed files "unbundled", effectively moving optimisation to a consumer app concern, e.g. obfuscation, compression, bundling MUST be consumer concerns, the library SHOULD NOT make the consumer bundling process more difficult, it MUST facilitate it! It resolves cyclic imports or circular dependencies, enhances linting to prevent imports from barrel files, making the barrel files more of a public API than an internal API to help prevent circular dependencies.

  From now on, bundling preserves the file tree, externalises packages based on the package.json dependency declaration automatically, instead of managing them manually as the current version does. It allows deep imports, e.g. @clickhouse/click-ui/components/Button.

  Exports files are placed by target resolution, e.g. dist/esm|cjs. It has removed UMD until further notice (why is the original version providing UMD, what's the use-case?). As a component library, in principle, it should be ESM and CJS (due to NodeJS SSR) compatible in the worse case scenarios.

  It reduces build times from > 1 minute to < 22 seconds.

  More importantly, this initial revision provides tree-shaking support, helping reduce file size. Which can now be assessed with an optional builder feature to analyse and visualise the package dependency graph, file sizes, etc.

- d3b40ae: Reconcile FileUpload and FileMultiUpload to prevent and reduce concurrent implementations, e.g. behaviour, features, styles, etc. In the previous version, the multiple file upload component was recreating the file upload in its file context which is prone to mistakes and hard to maintain.
- 970cdfb: Cleans up the build configuration, token generation and related processes. By removing legacy styling setups and simplifying the token generation to only the required setup. This work is important before starting to migrate off styled components. Effectively, reducing technical debt.

  For example, the SCSS setup is not providing any value, e.g. there was an unused 320KB file named src/styles/tokens-light-dark.scss.

  It seems that the setup is [promoted as](https://github.com/ClickHouse/click-ui/pull/740) offering "tree-shaking" benefits, but I suspect this is not correct from what I could assess. With that being said, even if the consumer app, only use a single variable, the entire 320KB of CSS custom properties would be spit into the final CSS bundle!

  Considering that variables change with time, and if not managed correctly, might increase dramatically, the file size would increase and make the app's distributed bundle size increase for no additional value. Think that tree shaking means a sort of static analysis that has to determine which tokens (bits of code) are not used, to remove them safely. It's not the case here with the current setup, e.g. the whole ":root" stuff would go in.

  Other changes might have extended to removing legacy, unused or orphaned CSS files found in the project.

  Finally, the changes here help to clear or reduce some of the technical debt, e.g. taking a step back before jumping much further. There are other pending PR, which once merged will allow further progress to improve the code base.

- 133282b: Prevent dayjs mismatch version blocking package dependency install.
  On CI run, there's a step which installs with flag "immutable". Because there's a dayjs mismatch version, the install process errors.
- d0c50c0: A version maintenance branch strategy enables the Click UI team to support older versions simultaneously, which is important since consumer applications, e.g. control plane or hyperdx might depend on stable versions and cannot immediately upgrade to the latest release.

  The introduction of this branching strategy conceptually and in the release workflow, practically, allows the team to support active development, incentivise experimentation, change, improvements, iteration, etc while shipping critical bug fixes or security patches to older versions (as long as compatible). This ensures that "stable" versions still receive necessary fixes without forcing potential breaking changes or showing new untested features.

  In the release workflow, implemented automation for it by handling the tedious parts to help reduce human errors and ensure a consistent release flow; But also for our own sanity, as otherwise it'd cause overwhelming version/release management.

  ## How to use?

  To create a new release, locate the [create release](https://github.com/ClickHouse/click-ui/actions/workflows/create-release.yml) and use the interface to select the release type, e.g. release candidate (rc), testing, stable or latest.

  It'll create a new Pull request for review, e.g. changelog, version bump, etc. There, you have the opportunity to make any further tweaks, refinements and check if everything's correct.

  You can find the pull requests in the GitHub tab [Pull Request](https://github.com/ClickHouse/click-ui/pulls). E.g. let's say you're about to release v0.1.0-rc.1, you'd find `chore: 🤖 release v0.1.0-rc.1 (rc)`.

  To learn more read the [release](https://github.com/ClickHouse/click-ui/tree/chore/init-version-maintenance-branch-strategy?tab=readme-ov-file#release) worfklow documentation.

- aa6c34d: Current select breaks in smaller viewports. Notice that the Icon is misplaced, comparatively with desktop viewport.

  This change provides a fix, to make it work seamlessly across viewport sizes.

- 6b9c9d3: The previous versions of click-ui (e.g., <= 0.0.250), break on the latest of Nextjs, Vitejs, any React >= 19 or RSC enabled builds. To mitigate it, this initial change provides the minimal setup required for it to work in such environments, e.g. when installing the package, it should run in dev and build processes.
  It does NOT try to modify, replace, introduce or change breaking changes; there might be a few subtle changes related to Radix. At the time of writing, the library requires a browser runtime, which means that is client-only. Separately, there'll be other PR to address other related concerns and expand on this initial PR, e.g. none interactive components shall render server-side.

  # What changed?

  The @clickhouse/click-ui package was updated, which includes an updated Radix UI dependency that removed the side, align, and sideOffset props from ContextMenu.Content.

  Radix made this change because the ContextMenuContentProps TypeScript type now explicitly omits these props:

  ```
  interface ContextMenuContentProps extends Omit<MenuContentProps, 'onEntryFocus' | 'side' | 'sideOffset' | 'align'> {}
  ```

  1. Context menus are fundamentally different from dropdown menus — they open at the cursor position (where the user right-clicked), not relative to a trigger element
  2. The side and align props don't make sense for context menus since there's no anchor element to position against
  3. Smaller bundle size — removing unused positioning logic reduces the bundle for ContextMenu consumers

  # Migration Guide

  Before: <ContextMenu.Content side="bottom" align="start">
  After: <ContextMenu.Content>

  Before: sideOffset={5}
  After: Use alignOffset for vertical spacing if needed

  The props were never functionally useful for context menus (which position at the cursor), so removing them is just a cleanup.

  Simply delete these props from your ContextMenu.Content components.

  Sources:
  - https://www.radix-ui.com/primitives/docs/overview/releases
  - https://github.com/radix-ui/primitives/issues/3208
  - https://www.radix-ui.com/primitives/docs/components/context-menu

- 4d3733d: Adds keyboard support for resizing the table column, e.g. on the tab column separator "focus", the user can now press keyboard arrows/cursor keys (left or right) for controlling the resizing direction.

  The changes were made to let everyone use the resize feature, not just mouse users, e.g. improved accessibility.

  ## How to use?

  On a view that includes a table element, press the TAB key on your keyboard to select the column separator. Once the separator is focused, use the arrow/cursor left and right keys to control the resize direction. Press escape key (ESC) to leave focus.

- 00211aa: Adapts file upload filename truncation responsiveness, e.g. shows truncated file name on smaller container sizes, showing the original otherwise. It shows the complete filename on element hover.

  This is a variation of [779](https://github.com/ClickHouse/click-ui/pull/781), which shortens the middle of the text responsively but over breakpoints. Ideally, it should be fluid, but that'd require computation/listener/observables, through container size, it might be hard to justify the time.

  As an alternative, we introduce text number of characters responsive fluidity by faking it, e.g. does not introduce listeners/observables, uses native css resulting in a fluid, well-performing responsive truncation.

- 0f5c56c: Allow users ability to choose whether text within cells wraps or truncates when space is limited, e.g. text wrap, truncated at the end, or middle.

  The consumer can now control the overflow mode preference at table/column level by declaring the preferred overflow mode when defining the table header items (columns), e.g. declare "overflowMode" to "truncated-middle" along label "filename".

- 5831e6b: Introducing logos in the library is a manual process which is prone to mistakes and relies on developer time. Furthermore, originally, it lacked documentation, which caused further confusion and wasted time due to context switching; Although the documentation was introduced recently, there's still space for improvement.

  To help improve collaboration with the design team, an SVG to React Component workflow is offered to enable anyone to contribute as easily and quickly as possible. Including documentation, providing information on topics, such as further customisation for theme-based computed logos, e.g. light VS dark.

  While this helps standardise the introduction of logos consistently, there's still space for improvement, e.g. there are two separate registries for light and dark logos and icons introduction, which are similar SVG data types, and are still a manual process. These and others will be addressed separately in the next iterations.

  # What has changed?

  The logos API remains the same, you can update Click UI without any further changes. Although, the logo name `c#` was renamed to `c-sharp` due to need to use valid javascript identifiers during the auto-conversation process and usage of `c#` is NOT recommended as its being dropped to favour `c-sharp`.

- 8de3cc4: Filenames can be long, which causes issues as found in the reported issue [693](https://github.com/ClickHouse/click-ui/issues/693).

  Since upload file error status messages add extra length, it's found best to move it. Here, we move the failure message after the file details container.

- 87018e4: Response for reported issue in [#785](https://github.com/ClickHouse/click-ui/issues/785), which reports a missing prop forwarding option for component customisation on the consumer application side. For example, it doesn't expose className or other props that forward to the common InternalSelect -> StyledSelectTrigger. Thus, we provide the requested changes to allow component customisation!

  ## How to use?

  Declare a triggerProps with desired elements, for example:

  ```tsx
  <Select
    {...props}
    triggerProps={{
        className: 'custom-trigger',
        style: {
          border: '2px dashed #00f',
          borderRadius: '8px',
          maxWidth: '200px',
        },
        onFocus: () => console.log('🤖 Trigger focused!'),
        onMouseEnter: () => console.log('👀 Mouse entered trigger!'),
    }}
  >
  ```

- 476e6ff: Users should also be able to choose whether text within cells wraps or truncates when space is limited, e.g. text wrap, truncated at the end, or middle.

  The consumer can now define at the cell/item level the text overflow mode (priority). A table-level text overflow model preference should be introduced, but the cell-level settings will take precedence.

- 8fb0736: Allow the user to resize table columns. Originally, preferred to solve using native CSS but due to limitations, introduced a set of DOM event listeners for computed drag events on mouse move and values. From now on, the user can set the Table to have resizable columns by setting the property `resizableColumns`.
- 85f9e50: FileMultiUpload reflects FileUpload style. It now shows the error status after the upload details container, doesn't show file size and filename is now displayed in a middle truncator.
- 071bbb7: Show the success icon instead of the document icon, on file upload success.
- 2a342c9: Add OVH Company logo for white and dark mode
- f70e04f: Declares the test runner target dirname as src. At the time of writing, the test runner looks for files in any directory, e.g., if you'd add a directory named .ignoreMe, it'd effectively look for test files in this location. For this reason, updated the include and exclude of test property in vite config specifying explicit pathnames.
- 3048b2a: Add AlloyDB logo
- 4fc641e: Prevent FileUpload success state icon from squashing in smaller or responsive container sizes.
- a822a3f: Reconciles SVG asset management for Flags, Icons, and Logos by restructuring file locations for React SVG components to match the conventions established in the original SVG-to-React conversion [#828](https://github.com/ClickHouse/click-ui/pull/828).

  It also modifies the original SVG to React Component process to support all three asset types: Flags, Icons and Logos. Included some safeguards, to try to help enforce naming conventions to facilitate. This bit might require further attempts, as it relies on the same retroactive~mapping to old names encountered or established in the Logo conversation version.

  For now, this second iterative pass creates a consistent asset management flow across all three asset types.

- ac3ebad: Added logo components for new data sources: Supabase, Crunchy Bridge, NeonDB, AWS RDS, AWS Aurora, TigerData.
- 8cc22ba: The current Storybook build and publish process relies on webhooks, with outputs only accessible through the Vercel project dashboard, e.g. a contributor without a paid seat has no access to build output which is an impediment when troubleshooting.

  To reduce costs and make troubleshooting easier when builds fail or other issues occur, migrating to Vercel CLI-based build and publish is preferred. By making the process a GitHub action, anyone can investigate and resolve issues much more quickly and independently at the time of contribution. Until the proposed process change, it's required to ask an account holder for detailed build information, which wastes time.

### Patch Changes

- b34ec6d: Introduces a simple workflow to manage versioning and changelogs
- e2191bb: Show deprecation warning for TableHeaderType to favour type TableColumnConfigProps
- 2eee805: Updates package.json for consistency
- dd63c70: Removes nonsense types which are utterly complex and not readable and shows inconsistency in Figma theme provided data structures.

  The src/theme/index.ts has a few utility types that seem unnecessarily complex, e.g. they are not human-readable, cause confusion and are meaningless in the context of providing utility or any sort of added value. Here, we introduce changes that make it much more idiomatic, minimal or simpler.

  Consequently, found an issue which is being reported internally, as after simplifying it, it's found that there's an   inconsistency between light and dark theme data structures; Bear in mind that the data structures MUST be equal (not discussing the values but structure wise). While this has to be solved in the origin or source, e.g. Figma, the changes in the Figma theme provided data structures to expose them.

  Note that it's solely to facilitate communication and help pinpoint where the problem is located: it does NOT mean or suggest this has to be done manually or that it's ok to change these two files directly in the source code. These MUST be resolved in the source Figma file.
