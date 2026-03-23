---
"@clickhouse/click-ui": minor
---

Makes the distributed files "unbundled", effectively moving optimisation to a consumer app concern, e.g. obfuscation, compression, bundling MUST be consumer concerns, the library SHOULD NOT make the consumer bundling process more difficult, it MUST facilitate it! It resolves cyclic imports or circular dependencies, enhances linting to prevent imports from barrel files, making the barrel files more of a public API than an internal API to help prevent circular dependencies.

From now on, bundling preserves the file tree, externalises packages based on the package.json dependency declaration automatically, instead of managing them manually as the current version does. It allows deep imports, e.g. @clickhouse/click-ui/components/Button.

Exports files are placed by target resolution, e.g. dist/esm|cjs. It has removed UMD until further notice (why is the original version providing UMD, what's the use-case?). As a component library, in principle, it should be ESM and CJS (due to NodeJS SSR) compatible in the worse case scenarios.

It reduces build times from > 1 minute to < 22 seconds.

More importantly, this initial revision provides tree-shaking support, helping reduce file size. Which can now be assessed with an optional builder feature to analyse and visualise the package dependency graph, file sizes, etc.
