---
'@clickhouse/click-ui': patch
---

Add circular dependency check to prevent and detect circular import cycles that can cause build issues, runtime errors, and bundle size problems.

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
