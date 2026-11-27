---
'@clickhouse/click-ui': patch
---

Fix `TypeError: _interopRequireDefault is not a function` when a Vite dev server runs `@clickhouse/click-ui` on the server eg. waku. Importing any component from the package root loaded `CodeBlock` and its ESM build pulled its highlighting languages from the `react-syntax-highlighter` cjs build. Now it uses the ESM build there and the cjs build in the cjs output. Highlighting is unchanged.
