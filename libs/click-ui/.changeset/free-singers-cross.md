---
'@clickhouse/click-ui': patch
---

Restore changes lost in PR 841-845 merge conflict resolution.

**What changed:**

- Removed the `Common/` barrel-export directory that was causing circular dependency issues
- Split shared components into their own directories: `CrossButton`, `EmptyButton`, `GridCenter`, `FormContainer`
- Updated imports across components to use direct paths instead of `@/components/Common`

This is an internal refactoring with no public API changes.
