---
'@clickhouse/click-ui': minor
---

The current Storybook build and publish process relies on webhooks, with outputs only accessible through the Vercel project dashboard, e.g. a contributor without a paid seat has no access to build output which is an impediment when troubleshooting.

To reduce costs and make troubleshooting easier when builds fail or other issues occur, migrating to Vercel CLI-based build and publish is preferred. By making the process a GitHub action, anyone can investigate and resolve issues much more quickly and independently at the time of contribution. Until the proposed process change, it's required to ask an account holder for detailed build information, which wastes time.
