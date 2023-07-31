// .storybook/manager.js

import { addons } from "@storybook/manager-api";
import theme from "./theme";

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
  }
});
