---
'@clickhouse/click-ui': patch
---

Make `Collapsible.Trigger` announce its state and a proper name to screen readers. It now sets `aria-expanded`, so assistive technology says whether the section is open or closed. It no longer forces the name "trigger children": a trigger with visible text is named by that text, and an icon-only trigger is named "Toggle section". An `aria-label` passed to the trigger still overrides both. The chevron is now hidden from assistive technology, so it is no longer read as "chevron-right". `SidebarCollapsibleTitle`, which renders the trigger, is now announced by its label.

Visual: unchanged.
