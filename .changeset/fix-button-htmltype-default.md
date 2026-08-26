---
'@clickhouse/click-ui': minor
---

Default `htmlType` to `"button"` on `Button`, `IconButton`, and `SplitButton`. All three already accepted an `htmlType` prop, but left it undefined by default, so the native `<button>` fell back to the browser's own default of `type="submit"`. Any of these rendered inside a `<form>` without an explicit `htmlType` would submit that form on click.

**This is a behavior change, not just a bugfix.** If your app relied on the old (buggy) default-submit behavior — for example a `Button` inside a `<form>` that you expected to submit without ever passing `htmlType="submit"` — set `htmlType="submit"` explicitly to keep that behavior. Marked as a minor release rather than patch because of this risk.
