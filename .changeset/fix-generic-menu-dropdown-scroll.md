---
'@clickhouse/click-ui': patch
---

Fix GenericMenu dropdown-menu panels (e.g. long organization/list menus) not scrolling when their content exceeds the available height. The base panel's `overflow: hidden` (needed for border-radius clipping) was winning the cascade over the dropdown-menu-content override that restores `overflow-y: auto`, because the two rules live in separately-injected stylesheets whose relative order isn't guaranteed. The scroll override now lives on `.generic-menu-panel_type_dropdown-menu` itself, in the same stylesheet as the property it overrides, so menus with more items than fit scroll again.
