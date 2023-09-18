// .storybook/YourTheme.js

import { create } from "@storybook/theming/create";

export default create({
  base: "dark",
  colorPrimary: '#FAFF69',
  colorSecondary: '#FAFF69',
  brandTitle: "ClickUI Storybook",
  brandUrl: "/",
  brandImage: "/logo.svg",
  brandTarget: "_self",
  fontBase:  `"Inter", "SF Pro Display", -apple-system,
  BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
  "Open Sans", "Helvetica Neue", sans-serif;`,
  fontCode: `"Inconsolata", "SFMono Regular", monospace;`,
});
