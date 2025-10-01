// Example click-ui-config.js file
// This file should be placed in the root of your application

window.clickUIConfig = {
  // Base theme content (similar to light.json structure)
  // Can be a partial theme object or import from your theme files
  theme: {
    // You can include any theme properties from light.json here
    // This is the base theme that will be used for light mode
    click: {
      global: {
        color: {
          background: {
            default: "#ffffff",
            muted: "#f8fafc"
          },
          text: {
            default: "#0f172a",
            muted: "#64748b"
          }
        }
      },
      button: {
        basic: {
          color: {
            primary: {
              background: {
                default: "#2563eb",
                hover: "#1d4ed8"
              }
            }
          }
        }
      }
    }
  },

  // Dark theme overrides (optional)
  // These will be merged with the base theme when in dark mode
  darkTheme: {
    click: {
      global: {
        color: {
          background: {
            default: "#0f172a",
            muted: "#1e293b"
          },
          text: {
            default: "#f8fafc",
            muted: "#94a3b8"
          }
        }
      },
      button: {
        basic: {
          color: {
            primary: {
              background: {
                default: "#3b82f6",
                hover: "#2563eb"
              }
            }
          }
        }
      }
    }
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  },

  // Size utilities
  sizes: {
    "0": "0px",
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "7": "28px",
    "8": "32px",
    "9": "36px",
    "10": "40px",
    "11": "44px"
  },

  // Global tooltip configuration
  tooltipConfig: {
    delayDuration: 600,
    skipDelayDuration: 100,
    disableHoverableContent: false,
  },

  // Global toast configuration
  toastConfig: {
    duration: 4000,
    visibleToasts: 3,
    swipeDirection: "right",
    position: "bottom-right",
  },
};