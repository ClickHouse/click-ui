---
'@clickhouse/click-ui': patch
---

Fix CSS module rules not loading for non-index components. The css-colocate build plugin only injected a component's compiled CSS into its matching `<Dir>/index.js`, so files like `Collapsible/IconWrapper.js` applied class names without ever loading their styles. Components that render `IconWrapper` but not `Collapsible` (e.g. `SidebarNavigationItem`) lost the `display: flex` layout, stacking the icon above the label. The plugin now injects the compiled CSS into every module that imports a `.module.css`.
