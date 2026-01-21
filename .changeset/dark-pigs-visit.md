---
"@clickhouse/click-ui": patch
---

The previous versions of click-ui (e.g., <= 0.0.250), break on the latest of Nextjs, Vitejs, any React >= 19 or RSC enabled builds. To mitigate it, this initial change provides the minimal setup required for it to work in such environments, e.g. when installing the package, it should run in dev and build processes. It does NOT try to modify, replace, introduce or change breaking changes; there might be a few subtle changes related to Radix. At the time of writing, the library requires a browser runtime, which means that is client-only. Separately, there'll be other PR to address other related concerns and expand on this initial PR, e.g. none interactive components shall render server-side.
