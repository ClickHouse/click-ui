# Accessibility

**Target:** WCAG 2.2 Level AA for everything new. Existing components must reach 2.1 AA first and 2.2 AA by the first external audit.

**Severity:** axe impact × reach × WCAG level. Reach = how many consumer apps render the component, estimated from the consumer repos we know; when in doubt, assume high. Critical or Serious in a widely used component blocks a release; a maintainer decides, in review, until the automated gates land. Once the Storybook a11y gate runs, a component with a Critical finding cannot stay in `todo`.

**Definition of Done:** the Accessibility section of the PR template (Keyboard, Names, Vision), ticked after the "Before you declare done" checks in [AGENTS.md](./AGENTS.md) section 7: Storybook a11y panel clean, manual keyboard pass. Say in the PR description what you did not test.

**Debt:** every known violation has a Linear ticket (`CUI-123`). The gates being built will reference it in code: `parameters.a11y.test: 'todo' // CUI-123` on the story once Storybook a11y runs at `error`, an inline lint disable with a reason and the ID once the lint gate runs. Neither is in effect yet.

**Status (W38 2026):** program started. Automated gates (`eslint-plugin-jsx-a11y`, Storybook a11y at `error`, stylelint focus-outline rule) are being built — see the Linear project *Click UI Accessibility*. The testing guide, component contracts and page patterns land together with the code they describe; until then this file is the whole policy.

**Report a problem:** GitHub issue with the `a11y` label · internal: Linear team CUI, label `a11y`. Include: what you tried, the browser and assistive technology, the story or URL.

---

Last reviewed: W38 2026 | Next review: W40 2026
