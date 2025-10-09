import type { ThemeConfig } from './src/theme/types';

const config: ThemeConfig = {
  cssPrefix: '--click',
  storageKey: 'click-ui-theme',

  theme: {
    global: {
      color: {
        brand: '#FF6B6B',
        background: {
          default: '#FAFAFA'
        }
      }
    },
    button: {
      space: {
        x: '1.5rem',
        y: '0.75rem'
      },
      radii: {
        all: '0.5rem'
      },
      primary: {
        background: {
          default: '#FF6B6B',
          hover: '#FF5252'
        }
      }
    }
  },

  systemModeOverrides: {
    light: {
      global: {
        color: {
          background: {
            default: '#FFFFFF'
          }
        }
      }
    },
    dark: {
      global: {
        color: {
          background: {
            default: '#0D1117'
          },
          text: {
            default: '#F0F6FC'
          }
        }
      },
      button: {
        primary: {
          background: {
            default: '#FF8A80',
            hover: '#FF7043'
          }
        }
      }
    }
  }
};

export default config;