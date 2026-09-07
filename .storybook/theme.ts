// .storybook/YourTheme.js

import { create } from "storybook/theming/create";

import { version } from "../package.json";

export const brandVersion = `v${version}`;
const brandLabel = `Click UI | ${brandVersion}`;

export default create({
  base: "dark",
  colorPrimary: '#FAFF69',
  colorSecondary: '#FAFF69',
  // renders as raw HTML inside the logo link
  brandTitle: `<img src="/logo.svg" alt="${brandLabel}" title="${brandLabel}" style="height:40px" /><span style="margin-left:8px;font-size:12px;font-weight:400;opacity:.55;white-space:nowrap">${brandVersion}</span>`,
  brandUrl: "/",
  brandTarget: "_self",
  fontBase:  `"Inter", "SF Pro Display", -apple-system,
  BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
  "Open Sans", "Helvetica Neue", sans-serif;`,
  fontCode: `"Inconsolata", "SFMono Regular", monospace;`,
});
