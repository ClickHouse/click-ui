// .storybook/manager.js

import { addons } from "storybook/manager-api";
import theme from "./theme";

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  showToolbar: true,
  sidebar: {
    showRoots: true,
  },
  theme: theme,
});

// Hide "Reset selection" option from the theme toolbar dropdown
if (typeof window !== "undefined") {
  const hideResetSelection = () => {
    const resetOption = document.querySelector(
      'ul[role="listbox"][aria-label="Global theme for components"] > li[role="option"][id$="-opt-undefined"]'
    );
    if (resetOption) {
      (resetOption as HTMLElement).style.display = "none";
    }
  };

  const observer = new MutationObserver(hideResetSelection);
  observer.observe(document.body, { childList: true, subtree: true });
}
