---
'@clickhouse/click-ui': major
---

Default `htmlType` to `"button"` on `Button`, `IconButton`, and `SplitButton`. All three already accepted an `htmlType` prop, but left it undefined by default, so the native `<button>` fell back to the browser's own default of `type="submit"`. Any of these rendered inside a `<form>` without an explicit `htmlType` would submit that form on click.

**Breaking change.** This affects any consumer with a `Button`, `IconButton`, or `SplitButton` inside a `<form>` that relied on the old default-submit behavior — i.e. you never passed `htmlType` and expected a click to submit the form anyway. To keep that behavior, pass `htmlType="submit"` explicitly on the affected button.
