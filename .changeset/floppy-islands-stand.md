---
'@clickhouse/click-ui': minor
---

Given the request [813](https://github.com/ClickHouse/click-ui/issues/813), the following provides support for root colour theme attributes.

The process will provide control for the consumer's main html, e.g. data-cui-theme. It'll getg preferred theme from localStorage (if available), to prevent theme flashing, e.g. due to SSR vs browser runtime. Note that there'll be further changes once the set of PRs are merged (see https://github.com/ClickHouse/click-ui/pulls/punkbit).

It also provides documentation explaining how to use it in the consumer application.
