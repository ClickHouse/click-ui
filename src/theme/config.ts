declare global {
  const __CLICK_UI_CONFIG__: unknown;
}

export const getThemeConfig = () => {
  // This will be replaced by Vite plugin with actual config
  if (typeof __CLICK_UI_CONFIG__ !== "undefined") {
    return __CLICK_UI_CONFIG__;
  }

  // Development fallback - try to load from window.clickUIConfig
  if (
    typeof window !== "undefined" &&
    (window as unknown as { clickUIConfig: unknown }).clickUIConfig
  ) {
    return (window as unknown as { clickUIConfig: unknown }).clickUIConfig;
  }

  return {};
};
