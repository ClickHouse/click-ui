declare global {
  const __CLICK_UI_CONFIG__: unknown;
}

export const getThemeConfig = () => {
  // Check if plugin injected config at build time
  if (typeof __CLICK_UI_CONFIG__ !== "undefined") {
    return __CLICK_UI_CONFIG__;
  }

  // Use defaults
  return {};
};
