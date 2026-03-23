---
'@clickhouse/click-ui': minor
---

Given the request [813](https://github.com/ClickHouse/click-ui/issues/813), the following provides support for root colour theme attributes.

The process will provide control for the consumer's main html, e.g. data-cui-theme. It'll get preferred theme from localStorage (if available), to prevent theme flashing, e.g. due to SSR vs browser runtime. Note that there'll be further changes once the set of PRs are merged (see https://github.com/ClickHouse/click-ui/pulls/punkbit).

It also provides documentation explaining how to use it in the consumer application.

**How to use?**

The `InitCUIThemeScript` applies a `data-cui-theme` attribute to the root `<html>` element, allowing you to style custom elements with vanilla CSS.

For example, edit your consumer app `stylesheet` and introduce custom styles as follows:

```css
[data-cui-theme="light"] {
  --my-app-bg: #ffffff;
  --my-app-text: #1a1a1a;
}

[data-cui-theme="dark"] {
  --my-app-bg: #0a0a0a;
  --my-app-text: #f5f5f5;
}

.my-custom-component {
  background: var(--my-app-bg);
  color: var(--my-app-text);
}
```
