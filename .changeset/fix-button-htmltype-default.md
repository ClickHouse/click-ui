---
'@clickhouse/click-ui': patch
---

Default `htmlType` to `"button"` on `Button` and `IconButton`. Both components already accepted an `htmlType` prop, but left it undefined by default, so the native `<button>` fell back to the browser's own default of `type="submit"`. Any `Button` or `IconButton` rendered inside a `<form>` without an explicit `htmlType` would submit that form on click. Consumers who want a submit button still set `htmlType="submit"` explicitly.
