import type { ThemeConfig } from "@clickhouse/click-ui/theme";

const config: ThemeConfig = {
  storageKey: "click-ui-theme",

  // Light mode theme (default)
  theme: {
    global: {
      color: {
        brand: "#FF6B6B",
        background: {
          default: "#FFFFFF",
        },
      },
    },
    button: {
      space: {
        x: "1.5rem",
        y: "0.75rem",
      },
      radii: {
        all: "0.5rem",
      },
      primary: {
        background: {
          default: "#FF6B6B",
          hover: "#FF5252",
        },
      },
    },
  },

  // Dark mode overrides - if not defined, theme values are used for dark mode too
  dark: {
    global: {
      color: {
        background: {
          default: "#0D1117",
        },
        text: {
          default: "#F0F6FC",
        },
      },
    },
    button: {
      primary: {
        background: {
          default: "#FF8A80",
          hover: "#FF7043",
        },
      },
    },
  },

  // Tooltip configuration (optional)
  // tooltipConfig: {
  //   delayDuration: 100,
  //   skipDelayDuration: 300,
  //   disableHoverableContent: false,
  // },

  // Toast configuration (optional)
  // toastConfig: {
  //   duration: 4000,
  //   swipeDirection: "right",
  //   swipeThreshold: 50,
  // },
};

export default config;
