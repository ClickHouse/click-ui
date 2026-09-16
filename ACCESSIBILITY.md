# Accessibility

**Target:** WCAG 2.2 Level AA for everything new. Existing components must reach 2.1 AA first and 2.2 AA by the first external audit.

**Severity:** axe impact × reach × WCAG level. Reach = how many consumer apps render the component, estimated from the consumer repos we know; when in doubt, assume high. Critical or Serious in a widely used component blocks a release; a maintainer decides, in review, until the automated gates land. Once the Storybook a11y gate runs, a component with a Critical finding cannot stay in `todo`.

**Definition of Done:** the Accessibility checkboxes in the PR template, plus the "Before you declare done" list in [AGENTS.md](./AGENTS.md) section 7, written into the PR description: what you tested, what you did not, and which WCAG 2.2 criteria.

**Debt:** every known violation carries a Linear ID — `parameters.a11y.test: 'todo' // CUI-123` on the story, or an inline lint disable with a reason and the ID.

**Status (W38 2026):** program started. Automated gates (`eslint-plugin-jsx-a11y`, Storybook a11y at `error`, stylelint focus-outline rule) are being built — see the Linear project *Click UI Accessibility*. The testing guide, component contracts and page patterns land together with the code they describe; until then this file is the whole policy.

**Report a problem:** GitHub issue with the `a11y` label · internal: Linear team CUI, label `a11y`. Include: what you tried, the browser and assistive technology, the story or URL.

---

Last reviewed: W38 2026 | Next review: W40 2026
