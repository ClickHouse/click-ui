// .storybook/YourTheme.js

import { create } from "@storybook/theming/create";

export default create({
  base: "light",
  brandTitle: "ClickUI Storybook",
  brandUrl: "/",
  brandImage: "/logo.svg",
  appBg: "white",
  brandTarget: "_self",
  fontBase:  `"Inter", "SF Pro Display", -apple-system,
  BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
  "Open Sans", "Helvetica Neue", sans-serif;`,
  fontCode: `"Inconsolata", "SFMono Regular", monospace;`,
});
