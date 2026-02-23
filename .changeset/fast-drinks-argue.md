---
'@clickhouse/click-ui': minor
---

The Click-UI source code has several circular dependencies that must be resolved.

During the resolution of component path redundancies and public API encapsulation in #798, several circular dependencies were exposed. There, some quick basic fixes were applied to allow to progress, but it was found that a separate PR was needed to resolve them.
