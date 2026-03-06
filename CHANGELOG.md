# @clickhouse/click-ui

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
