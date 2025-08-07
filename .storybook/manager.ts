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
