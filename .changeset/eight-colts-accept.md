---
'@clickhouse/click-ui': minor
---

This library will now use CSS Modules for styling and because it's distributed unbundled, gives the consumer application full control over bundling and optimisations. You'll only include what you actually use, resulting in smaller bundle sizes and better performance!

NOTE: We're currently migrating from Styled-Components to CSS Modules. Some components may still use Styled-Components during the transition period.

To learn more about CSS modules support, check our documentation [here](https://github.com/ClickHouse/click-ui?tab=readme-ov-file#css-modules)
