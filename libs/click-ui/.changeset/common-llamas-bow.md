---
'@clickhouse/click-ui': minor
---

Cleans up the build configuration, token generation and related processes. By removing legacy styling setups and simplifying the token generation to only the required setup. This work is important before starting to migrate off styled components. Effectively, reducing technical debt.

For example, the SCSS setup is not providing any value, e.g. there was an unused 320KB file named src/styles/tokens-light-dark.scss.

It seems that the setup is [promoted as](https://github.com/ClickHouse/click-ui/pull/740) offering "tree-shaking" benefits, but I suspect this is not correct from what I could assess. With that being said, even if the consumer app, only use a single variable, the entire 320KB of CSS custom properties would be spit into the final CSS bundle!

Considering that variables change with time, and if not managed correctly, might increase dramatically, the file size would increase and make the app's distributed bundle size increase for no additional value. Think that tree shaking means a sort of static analysis that has to determine which tokens (bits of code) are not used, to remove them safely. It's not the case here with the current setup, e.g. the whole ":root" stuff would go in.

Other changes might have extended to removing legacy, unused or orphaned CSS files found in the project.

Finally, the changes here help to clear or reduce some of the technical debt, e.g. taking a step back before jumping much further. There are other pending PR, which once merged will allow further progress to improve the code base.
