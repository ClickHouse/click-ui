# Accessibility

**Target:** WCAG 2.2 Level AA for everything new. Existing components must reach 2.1 AA first and 2.2 AA by the first external audit.

**Severity:** axe impact × reach × WCAG level. Reach = how many consumer apps render the component, estimated from the consumer repos we know; when in doubt, assume high. Critical or Serious in a widely used component blocks a release; a maintainer decides, in review, until the automated gates land. Once the Storybook a11y gate runs, a component with a Critical finding cannot stay in `todo`.

**Definition of Done:** the Accessibility section of the PR template (Keyboard, Names, Vision), ticked after the "Before you declare done" checks in [AGENTS.md](./AGENTS.md) section 7: Storybook a11y panel clean, manual keyboard pass. Say in the PR description what you did not test.

**Debt:** lint violations that existed when `eslint-plugin-jsx-a11y` was switched on are frozen in `eslint-suppressions.json`, per file and rule. That file is the counter: it should only shrink, and the lint part of the work is done when it is empty. Everything else has a Linear ticket (`CUI-123`), marked on the story as `parameters.a11y.test: 'todo' // CUI-123` once Storybook a11y runs at `error` (not in effect yet).

**Status (W39 2026):** program started. `eslint-plugin-jsx-a11y` (recommended plus two rules, see `eslint.config.js`) runs in `yarn lint` at `error`: frozen violations do not block; a new one fails CI, except in a file already frozen for the same rule, where only a rising count trips it.

**Report a problem:** GitHub issue with the `a11y` label · internal: Linear team CUI, label `a11y`. Include: what you tried, the browser and assistive technology, the story or URL.

---

Last reviewed: W39 2026 | Next review: W41 2026
