const theme = {
  click: {
    accordion: {
      sm: {
        icon: {
          size: {
            height: '1rem',
            width: '1rem',
          },
        },
        space: {
          gap: '0.25rem',
        },
        typography: {
          label: {
            default:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      md: {
        icon: {
          size: {
            height: '1.25rem',
            width: '1.25rem',
          },
        },
        space: {
          gap: '0.25rem',
        },
        typography: {
          label: {
            default:
              '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      lg: {
        icon: {
          size: {
            height: '1.5rem',
            width: '1.5rem',
          },
        },
        space: {
          gap: '0.25rem',
        },
        typography: {
          label: {
            default:
              '500 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '500 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '500 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      color: {
        default: {
          label: {
            default: '#ffffff',
            hover: 'rgb(100% 100% 100%)',
            active: '#ffffff',
          },
          icon: {
            default: '#ffffff',
            hover: 'rgb(100% 100% 100%)',
            active: '#ffffff',
          },
        },
        link: {
          label: {
            default: '#faff69',
            hover: '#feffc2',
            active: '#faff69',
          },
          icon: {
            default: '#faff69',
            hover: 'rgb(99.637% 100% 77.873%)',
            active: '#faff69',
          },
        },
      },
    },
    alert: {
      medium: {
        space: {
          y: '0.75rem',
          x: '0.75rem',
          gap: '0',
          banner: '0.5rem',
        },
        typography: {
          title: {
            default:
              '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          text: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        icon: {
          height: '1.25rem',
          width: '1.25rem',
        },
      },
      small: {
        space: {
          y: '0.5rem',
          x: '0.75rem',
          gap: '0',
          banner: '0.25rem',
        },
        icon: {
          height: '1rem',
          width: '1rem',
        },
        typography: {
          title: {
            default:
              '600 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          text: {
            default:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      radii: {
        center: '0',
        end: '0.25rem',
      },
      color: {
        background: {
          default: '#1f1f1c',
          success: 'rgb(20% 100% 26.667% / 0.2)',
          neutral: 'rgb(62.745% 62.745% 62.745% / 0.2)',
          danger: 'rgb(100% 13.725% 13.725% / 0.2)',
          warning: 'rgb(100% 46.667% 16.078% / 0.2)',
          info: 'rgb(26.275% 49.412% 93.725% / 0.2)',
        },
        text: {
          default: '#b3b6bd',
          success: '#ccffd0',
          neutral: '#c0c0c0',
          danger: '#ffbaba',
          warning: '#ffb88f',
          info: '#d0dffb',
        },
        iconBackground: {
          default: '#1f1f1c',
          success: 'rgb(20% 100% 26.667% / 0)',
          neutral: 'rgb(62.745% 62.745% 62.745% / 0)',
          danger: 'rgb(100% 13.725% 13.725% / 0)',
          warning: 'rgb(100% 46.667% 16.078% / 0)',
          info: 'rgb(26.275% 49.412% 93.725% / 0)',
        },
        iconForeground: {
          default: '#b3b6bd',
          success: 'lch(95.558 28.893 143.93 / 0.75)',
          neutral: 'lch(77.704 0 none / 0.75)',
          danger: 'lch(82.069 27.695 22.026 / 0.75)',
          warning: 'lch(80.892 39.042 53.918 / 0.75)',
          info: 'lch(88.343 15.514 266.4 / 0.75)',
        },
      },
    },
    avatar: {
      typography: {
        label: {
          sm: {
            default:
              '600 0.6875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '600 0.6875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '600 0.6875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          md: {
            default:
              '600 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '600 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '600 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      size: {
        label: {
          width: '1.5rem',
        },
        width: '1.5rem',
        height: '1.5rem',
      },
      radii: {
        all: '9999px',
      },
      color: {
        background: {
          default: '#808691',
          hover: '#b3b6bd',
          active: '#b3b6bd',
        },
        text: {
          default: '#1f1f1c',
          hover: '#1f1f1c',
          active: '#1f1f1c',
        },
      },
    },
    badge: {
      space: {
        md: {
          x: '0.75rem',
          y: '0.125rem',
          gap: '0.25rem',
        },
        sm: {
          x: '0.5rem',
          y: '0.1563rem',
          gap: '0.125rem',
        },
      },
      typography: {
        label: {
          md: {
            default:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          sm: {
            default:
              '500 0.625rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      radii: {
        all: '9999px',
      },
      stroke: '1px',
      icon: {
        md: {
          size: {
            height: '0.75rem',
            width: '0.75rem',
          },
        },
        sm: {
          size: {
            height: '0.625rem',
            width: '0.625rem',
          },
        },
      },
      opaque: {
        color: {
          background: {
            default: '#1f1f1c',
            success: 'rgb(20% 100% 26.667% / 0.2)',
            neutral: 'rgb(62.745% 62.745% 62.745% / 0.2)',
            danger: 'rgb(100% 13.725% 13.725% / 0.2)',
            disabled: '#414141',
            info: 'rgb(26.275% 49.412% 93.725% / 0.2)',
            warning: 'rgb(100% 46.667% 16.078% / 0.2)',
          },
          text: {
            default: '#b3b6bd',
            success: '#ccffd0',
            neutral: '#c0c0c0',
            danger: '#ffbaba',
            disabled: '#808080',
            info: '#d0dffb',
            warning: '#ffb88f',
          },
          stroke: {
            default: '#323232',
            success: 'rgb(20% 100% 26.667% / 0.1)',
            neutral: 'rgb(62.745% 62.745% 62.745% / 0.1)',
            danger: 'rgb(100% 22.353% 22.353% / 0.2)',
            disabled: 'rgb(24.216% 24.216% 24.216%)',
            info: 'rgb(26.275% 49.412% 93.725% / 0.1)',
            warning: 'rgb(100% 46.667% 16.078% / 0.1)',
          },
        },
      },
      solid: {
        color: {
          background: {
            default: '#c0c0c0',
            success: '#99ffa1',
            neutral: '#c0c0c0',
            danger: '#ff9898',
            disabled: '#414141',
            info: '#a1bef7',
            warning: '#ff9457',
          },
          text: {
            default: '#1f1f1c',
            success: '#1f1f1c',
            neutral: '#1f1f1c',
            danger: '#1f1f1c',
            disabled: '#808080',
            info: '#1f1f1c',
            warning: '#1f1f1c',
          },
          stroke: {
            default: 'rgb(19.608% 19.608% 19.608% / 0.1)',
            success: 'rgb(20% 100% 26.667% / 0.1)',
            neutral: 'rgb(62.745% 62.745% 62.745% / 0.1)',
            danger: 'rgb(100% 22.353% 22.353% / 0.2)',
            disabled: 'rgb(24.216% 24.216% 24.216%)',
            info: 'rgb(26.275% 49.412% 93.725% / 0.1)',
            warning: 'rgb(100% 46.667% 16.078% / 0.1)',
          },
        },
      },
    },
    bigStat: {
      space: {
        all: '1rem',
        sm: {
          gap: '0',
        },
        lg: {
          gap: '0.5rem',
        },
      },
      radii: {
        all: '0.25rem',
      },
      stroke: '1px',
      typography: {
        lg: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            muted:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          title: {
            default:
              '700 2rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            muted:
              '700 2rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        sm: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            muted:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          title: {
            default:
              '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            muted:
              '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      color: {
        stroke: {
          default: '#323232',
          muted: '#323232',
          danger: '#ffbaba',
        },
        background: {
          default: '#1f1f1c',
          muted: '#282828',
        },
        label: {
          default: '#b3b6bd',
          muted: '#b3b6bd',
          danger: '#ffbaba',
        },
        title: {
          default: 'rgb(97.5% 97.5% 97.5%)',
          muted: 'rgb(97.5% 97.5% 97.5%)',
        },
      },
    },
    button: {
      radii: {
        all: '0.25rem',
      },
      basic: {
        space: {
          x: '1rem',
          y: '0.2813rem',
          gap: '0.5rem',
          group: '0.5rem',
        },
        typography: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          mobile: {
            label: {
              default:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              hover:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              active:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
        },
        size: {
          icon: {
            height: '0.9688rem',
            all: '0.9688rem',
            width: '0.9688rem',
          },
        },
        color: {
          primary: {
            background: {
              default: '#faff69',
              hover: 'rgb(98.627% 100% 58.824%)',
              active: 'rgb(90.686% 92.5% 38.088%)',
              disabled: '#414141',
              loading:
                'linear-gradient(90deg, rgb(206, 211, 84, 0.1) 0%, rgb(206, 211, 84) 100%)',
            },
            text: {
              default: '#1f1f1c',
              hover: '#1f1f1c',
              active: '#1f1f1c',
              disabled: '#808080',
            },
            stroke: {
              default: '#faff69',
              hover: '#faff69',
              active: 'rgb(82.978% 84.638% 34.851%)',
              disabled: '#414141',
            },
          },
          secondary: {
            background: {
              default: '#1f1f1c',
              hover: '#282828',
              active: 'rgb(19.902% 19.902% 19.902%)',
              disabled: '#414141',
              loading:
                'linear-gradient(90deg, rgb(48, 48, 43, 0.1) 0%, rgb(48, 48, 43) 100%)',
            },
            stroke: {
              default: '#414141',
              hover: '#53575f',
              active: 'rgb(22.882% 22.137% 23.627%)',
              disabled: '#414141',
            },
            text: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#808080',
            },
          },
          danger: {
            background: {
              default: 'rgb(100% 13.725% 13.725% / 0.2)',
              hover: 'rgb(100% 13.725% 13.725% / 0.3)',
              active: 'rgb(100% 13.725% 13.725% / 0.45)',
              disabled: '#414141',
              loading:
                'linear-gradient(90deg, rgb(93, 45, 42, 0.1) 0%, rgb(93, 45, 42) 100%)',
            },
            text: {
              default: '#ffbaba',
              hover: '#ffbaba',
              active: '#ffbaba',
              disabled: '#808080',
            },
            stroke: {
              default: 'rgb(100% 22.353% 22.353% / 0.2)',
              hover: 'rgb(100% 13.725% 13.725% / 0.05)',
              active: 'rgb(100% 13.725% 13.725% / 0.05)',
              disabled: '#414141',
            },
          },
          empty: {
            text: {
              default: '#faff69',
              hover: '#feffc2',
              active: '#faff69',
              disabled: '#a0a0a0',
            },
            background: {
              default: 'rgba(0, 0, 0, 0)',
              hover: '#282828',
              active: 'rgba(0, 0, 0, 0)',
              disabled: 'rgba(0, 0, 0, 0)',
              loading:
                'linear-gradient(90deg, rgb(50, 51, 27, 0.1) 0%, rgb(50, 51, 27, 0.5) 100%)',
            },
            stroke: {
              default: 'rgba(0, 0, 0, 0)',
              hover: 'rgba(0, 0, 0, 0)',
              active: 'rgba(0, 0, 0, 0)',
              disabled: 'rgba(0, 0, 0, 0)',
            },
          },
        },
      },
      iconButton: {
        default: {
          space: {
            x: '0.4375rem',
            y: '0.4375rem',
          },
        },
        size: {
          small: '0.75rem',
          medium: '1rem',
          large: '1.25rem',
        },
        radii: {
          all: '0.25rem',
        },
        sm: {
          space: {
            x: '0.25rem',
            y: '0.25rem',
          },
        },
        xs: {
          space: {
            x: '0',
            y: '0',
          },
        },
        color: {
          primary: {
            background: {
              default: 'rgba(0, 0, 0, 0)',
              hover: '#282828',
              active: 'rgb(14.118% 14.118% 14.118%)',
            },
            stroke: {
              default: 'rgba(0, 0, 0, 0)',
              hover: '#282828',
              active: 'rgb(14.118% 14.118% 14.118%)',
            },
            text: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
            },
          },
          secondary: {
            background: {
              default: '#faff69',
              hover: 'rgb(98.627% 100% 58.824%)',
              active: 'rgb(86.152% 87.875% 36.184%)',
            },
            stroke: {
              default: 'rgba(0, 0, 0, 0)',
              hover: 'rgb(98.627% 100% 58.824%)',
              active: 'rgb(86.152% 87.875% 36.184%)',
            },
            text: {
              default: '#1f1f1c',
              hover: '#1f1f1c',
              active: '#1f1f1c',
            },
          },
          disabled: {
            background: {
              default: '#414141',
            },
            text: {
              default: '#808080',
            },
          },
          danger: {
            background: {
              default: 'rgb(100% 13.725% 13.725% / 0.2)',
              hover: '#ff9898',
              active: '#c10000',
            },
            text: {
              default: '#ffbaba',
              hover: '#ffbaba',
              active: '#ffbaba',
            },
            stroke: {
              default: 'rgb(100% 13.725% 13.725% / 0.2)',
              hover: 'rgb(100% 13.725% 13.725% / 0.3)',
              active: 'rgb(100% 13.725% 13.725% / 0.45)',
            },
          },
          ghost: {
            background: {
              default: 'rgba(0, 0, 0, 0)',
              hover: 'rgba(0, 0, 0, 0)',
              active: 'rgb(0% 0% 0% / 0)',
            },
            stroke: {
              default: 'rgba(0, 0, 0, 0)',
              hover: 'rgba(0, 0, 0, 0)',
              active: 'rgba(0, 0, 0, 0)',
            },
            text: {
              default: '#b3b6bd',
              hover: '#ffffff',
              active: '#ffffff',
            },
          },
          info: {
            background: {
              default: 'rgb(26.275% 49.412% 93.725% / 0.2)',
              hover: '#1d64ec',
              active: '#437eef',
            },
            text: {
              default: '#d0dffb',
              hover: '#d0dffb',
              active: '#d0dffb',
            },
            stroke: {
              default: 'rgb(26.275% 49.412% 93.725% / 0.2)',
              hover: '#1d64ec',
              active: '#437eef',
            },
          },
        },
      },
      stroke: '1px',
      split: {
        icon: {
          space: {
            y: '0.4375rem',
            x: '0.3438rem',
          },
        },
        space: {
          x: '1rem',
          y: '0.2813rem',
          gap: '0.5rem',
        },
        typography: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          mobile: {
            label: {
              default:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              hover:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              active:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
        },
        primary: {
          background: {
            main: {
              default: '#faff69',
              hover: 'rgb(98.627% 100% 58.824%)',
              active: 'rgb(82.978% 84.638% 34.851%)',
              disabled: 'rgb(23.324% 23.324% 23.324%)',
            },
            action: {
              default: 'rgb(88.235% 90% 37.059%)',
              hover: 'rgb(90.737% 92% 54.118%)',
              active: 'rgb(73.021% 74.481% 30.669%)',
              disabled: 'rgb(20.525% 20.525% 20.525%)',
            },
          },
          text: {
            default: '#1f1f1c',
            hover: '#1f1f1c',
            active: '#1f1f1c',
            disabled: '#808080',
          },
          stroke: {
            default: 'rgba(0, 0, 0, 0)',
            hover: 'rgba(0, 0, 0, 0)',
            active: 'rgba(0, 0, 0, 0)',
            disabled: 'rgba(0, 0, 0, 0)',
          },
          divide: {
            default: 'rgb(85.784% 87.5% 36.029%)',
            hover: 'rgb(86.299% 87.5% 51.471%)',
            active: 'rgb(72.606% 74.058% 30.495%)',
            disabled: 'rgb(21.341% 21.341% 21.341%)',
          },
        },
        secondary: {
          divide: {
            default: '#414141',
            hover: '#414141',
            active: 'rgb(23.653% 22.916% 24.391%)',
            disabled: '#414141',
          },
          background: {
            main: {
              default: '#1f1f1c',
              hover: '#282828',
              active: 'rgb(19.902% 19.902% 19.902%)',
              disabled: '#414141',
            },
            action: {
              default: '#282828',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: 'rgb(20.703% 20.703% 20.703%)',
              disabled: 'rgb(22.158% 22.158% 22.158%)',
            },
          },
          text: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
            disabled: '#808080',
          },
          stroke: {
            default: '#414141',
            hover: '#414141',
            active: 'rgb(23.653% 22.916% 24.391%)',
            disabled: 'rgba(0, 0, 0, 0)',
          },
        },
      },
      mobile: {
        button: {
          space: {
            x: '0.75rem',
            y: '0.5rem',
            gap: '0.5rem',
          },
        },
        basic: {
          size: {
            icon: {
              all: '1.25rem',
            },
          },
        },
      },
      group: {
        radii: {
          button: {
            default: {
              all: '2px',
            },
            borderless: {
              all: '0.25rem',
            },
          },
          panel: {
            all: '0.25rem',
          },
        },
        typography: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          mobile: {
            label: {
              default:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              hover:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              active:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
        },
        space: {
          panel: {
            default: {
              x: '3px',
              y: '3px',
              gap: '3px',
            },
            borderless: {
              x: '0',
              y: '0',
              gap: '0.25rem',
            },
          },
          button: {
            default: {
              y: '1.5px',
              x: '0.75rem',
            },
            borderless: {
              y: '5.5px',
              x: '1rem',
            },
          },
        },
        color: {
          background: {
            default: 'rgba(0, 0, 0, 0)',
            hover: '#282828',
            active: '#414141',
            disabled: 'rgba(0, 0, 0, 0)',
            'disabled-active': 'lch(0 0 none / 0)',
            panel: 'rgba(0, 0, 0, 0)',
          },
          text: {
            default: '#c0c0c0',
            hover: '#c0c0c0',
            active: '#ffffff',
            disabled: '#414141',
            'disabled-active': '#808080',
          },
          stroke: {
            default: 'rgba(0, 0, 0, 0)',
            hover: 'rgba(0, 0, 0, 0)',
            active: 'rgba(0, 0, 0, 0)',
            disabled: 'rgba(0, 0, 0, 0)',
            'disabled-active': 'rgba(0, 0, 0, 0)',
            panel: '#323232',
          },
          panel: {
            stroke: {
              default: '#323232',
              borderless: 'rgba(0, 0, 0, 0)',
            },
          },
        },
      },
      alignLeft: {
        size: {
          icon: {
            all: '0.9688rem',
          },
        },
        space: {
          x: '1rem',
          y: '0.3438rem',
          gap: '0.5rem',
        },
        typography: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          mobile: {
            label: {
              default:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              hover:
                '500 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              active:
                '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
        },
      },
      alignedLeft: {
        color: {
          background: {
            default: 'rgba(0, 0, 0, 0)',
            hover: '#282828',
            active: 'rgb(15.373% 15.373% 15.373%)',
          },
          stroke: {
            default: '#323232',
            hover: '#53575f',
            active: 'rgb(22.882% 22.137% 23.627%)',
          },
          text: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
          },
        },
      },
    },
    card: {
      secondary: {
        space: {
          all: '1rem',
          gap: '1rem',
          link: {
            gap: '0.5rem',
          },
        },
        radii: {
          all: '0.25rem',
        },
        icon: {
          size: {
            all: '2rem',
          },
        },
        stroke: '1px',
        color: {
          background: {
            default: '#1f1f1c',
            hover: '#282828',
            active: 'rgb(14.902% 14.902% 14.902%)',
            disabled: '#414141',
          },
          title: {
            default: 'rgb(97.5% 97.5% 97.5%)',
            hover: 'rgb(97.5% 97.5% 97.5%)',
            active: 'rgb(97.5% 97.5% 97.5%)',
            disabled: '#808080',
          },
          description: {
            default: '#b3b6bd',
            hover: '#b3b6bd',
            active: '#b3b6bd',
            disabled: '#808080',
          },
          link: {
            default: '#ffffff',
            hover: '#faff69',
            active: '#ffffff',
            disabled: '#808080',
          },
          stroke: {
            default: '#323232',
            hover: '#323232',
            active: 'rgb(18.627% 18.627% 18.627%)',
            disabled: '#414141',
          },
        },
      },
      typography: {
        title: {
          default:
            '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        description: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        link: {
          default:
            '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      primary: {
        size: {
          icon: {
            sm: {
              all: '2rem',
            },
            md: {
              all: '4rem',
            },
          },
        },
        space: {
          md: {
            y: '1.5rem',
            x: '1.5rem',
            gap: '0.75rem',
          },
          sm: {
            y: '1.5rem',
            x: '1.5rem',
            gap: '0.25rem',
          },
        },
        radii: {
          all: '0.25rem',
        },
        stroke: '1px',
        color: {
          background: {
            default: '#1f1f1c',
            hover: '#282828',
            active: 'rgb(14.902% 14.902% 14.902%)',
            disabled: '#414141',
          },
          title: {
            default: 'rgb(97.5% 97.5% 97.5%)',
            hover: 'rgb(97.5% 97.5% 97.5%)',
            active: 'rgb(97.5% 97.5% 97.5%)',
            disabled: '#808080',
          },
          description: {
            default: '#b3b6bd',
            hover: '#b3b6bd',
            active: '#b3b6bd',
            disabled: '#808080',
          },
          stroke: {
            default: '#323232',
            hover: '#323232',
            active: '#faff69',
            disabled: '#414141',
          },
        },
      },
      shadow:
        '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
      horizontal: {
        radii: {
          all: '0.25rem',
        },
        typography: {
          title: {
            default:
              '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          description: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        icon: {
          size: {
            all: '1.5rem',
          },
        },
        space: {
          md: {
            y: '0.75rem',
            x: '1rem',
            gap: '1rem',
          },
          sm: {
            y: '0.5rem',
            x: '0.75rem',
            gap: '0.75rem',
          },
        },
        default: {
          color: {
            background: {
              default: '#1f1f1c',
              hover: '#282828',
              active: '#282828',
              disabled: '#414141',
            },
            title: {
              default: 'rgb(97.5% 97.5% 97.5%)',
              hover: 'rgb(97.5% 97.5% 97.5%)',
              active: 'rgb(97.5% 97.5% 97.5%)',
              disabled: '#808080',
            },
            description: {
              default: '#b3b6bd',
              hover: '#b3b6bd',
              active: '#b3b6bd',
              disabled: '#808080',
            },
            stroke: {
              default: '#323232',
              hover: '#323232',
              active: '#faff69',
              disabled: '#414141',
            },
          },
        },
        muted: {
          color: {
            background: {
              default: '#282828',
              hover: '#1f1f1c',
              active: '#282828',
              disabled: '#414141',
            },
            title: {
              default: 'rgb(97.5% 97.5% 97.5%)',
              hover: 'rgb(97.5% 97.5% 97.5%)',
              active: 'rgb(97.5% 97.5% 97.5%)',
              disabled: '#808080',
            },
            description: {
              default: '#b3b6bd',
              hover: '#b3b6bd',
              active: '#b3b6bd',
              disabled: '#808080',
            },
            stroke: {
              default: '#323232',
              hover: '#323232',
              active: '#faff69',
              disabled: '#414141',
            },
          },
        },
      },
      promotion: {
        radii: {
          all: '0.25rem',
        },
        typography: {
          text: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        space: {
          y: '5.5px',
          x: '0.75rem',
          gap: '0.75rem',
        },
        icon: {
          size: {
            all: '1rem',
          },
        },
        color: {
          text: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#ffffff',
          },
          icon: {
            default: '#faff69',
            hover: '#faff69',
            active: '#faff69',
          },
          background: {
            default: 'rgb(15.686% 15.686% 15.686% / 0.9)',
            hover: 'rgb(17.794% 17.794% 17.794% / 0.9)',
            active: 'rgb(19.849% 19.849% 19.849% / 0.9)',
          },
          stroke: {
            default: 'linear-gradient(174deg, #FAFF69 8.31%, #2C2E31 22.92%)',
            hover: 'linear-gradient(174deg, #FAFF69 8.31%, #2C2E31 22.92%)',
            active: 'linear-gradient(174deg, #FAFF69 8.31%, #2C2E31 22.92%)',
            focus: '#faff69',
          },
        },
      },
    },
    checkbox: {
      radii: {
        all: '0.125rem',
      },
      space: {
        all: '1px',
        gap: '0.5rem',
      },
      size: {
        all: '1rem',
      },
      typography: {
        label: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      color: {
        variations: {
          default: {
            background: {
              default: 'rgb(17.794% 17.794% 17.794%)',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: '#faff69',
              disabled: '#414141',
            },
            stroke: {
              default: '#414141',
              hover: '#414141',
              active: '#faff69',
              disabled: '#606060',
            },
            check: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#151515',
              disabled: '#808080',
            },
            label: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#606060',
            },
          },
          var1: {
            background: {
              default: 'rgb(17.794% 17.794% 17.794%)',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: '#33ff44',
              disabled: 'rgb(17.794% 17.794% 17.794%)',
            },
            stroke: {
              default: '#00bd10',
              hover: '#66ff73',
              active: '#66ff73',
              disabled: '#606060',
            },
            check: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#a0a0a0',
            },
          },
          var2: {
            background: {
              default: 'rgb(17.794% 17.794% 17.794%)',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: '#437eef',
              disabled: 'rgb(17.794% 17.794% 17.794%)',
            },
            stroke: {
              default: '#6d9bf3',
              hover: '#a1bef7',
              active: '#a1bef7',
              disabled: '#606060',
            },
            check: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#a0a0a0',
            },
          },
          var3: {
            background: {
              default: 'rgb(17.794% 17.794% 17.794%)',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: '#fb64d6',
              disabled: 'rgb(17.794% 17.794% 17.794%)',
            },
            stroke: {
              default: '#fb64d6',
              hover: '#fb64d6',
              active: '#fb64d6',
              disabled: '#606060',
            },
            check: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#a0a0a0',
            },
          },
          var4: {
            background: {
              default: 'rgb(17.794% 17.794% 17.794%)',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: '#ff7729',
              disabled: 'rgb(17.794% 17.794% 17.794%)',
            },
            stroke: {
              default: '#faff69',
              hover: '#fdffa3',
              active: '#fdffa3',
              disabled: '#606060',
            },
            check: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#a0a0a0',
            },
          },
          var5: {
            background: {
              default: 'rgb(17.794% 17.794% 17.794%)',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: '#6df8e1',
              disabled: 'rgb(17.794% 17.794% 17.794%)',
            },
            stroke: {
              default: '#6df8e1',
              hover: '#a3faec',
              active: '#a3faec',
              disabled: '#606060',
            },
            check: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#a0a0a0',
            },
          },
          var6: {
            background: {
              default: 'rgb(17.794% 17.794% 17.794%)',
              hover: 'rgb(17.794% 17.794% 17.794%)',
              active: '#bb33ff',
              disabled: 'rgb(17.794% 17.794% 17.794%)',
            },
            stroke: {
              default: '#cc66ff',
              hover: '#cc66ff',
              active: '#cc66ff',
              disabled: '#606060',
            },
            check: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#a0a0a0',
            },
          },
        },
        background: {
          default: 'rgb(17.794% 17.794% 17.794%)',
          hover: 'rgb(17.794% 17.794% 17.794%)',
          active: '#faff69',
          disabled: '#414141',
        },
        stroke: {
          default: '#414141',
          hover: '#414141',
          active: '#faff69',
          disabled: '#606060',
        },
        check: {
          default: '#ffffff',
          hover: '#ffffff',
          active: '#151515',
          disabled: '#808080',
        },
        label: {
          default: '#ffffff',
          hover: '#ffffff',
          active: '#ffffff',
          disabled: '#606060',
        },
      },
    },
    codeblock: {
      space: {
        x: '1rem',
        y: '1rem',
        gap: '1.5rem',
      },
      radii: {
        all: '0.25rem',
      },
      stroke: '1px',
      typography: {
        text: {
          default:
            '500 0.875rem/1.7 "Inconsolata", Consolas, "SFMono Regular", monospace',
        },
      },
      numbers: {
        size: {
          width: '1.5rem',
        },
      },
      darkMode: {
        color: {
          background: {
            default: '#282828',
          },
          text: {
            default: '#ffffff',
          },
          numbers: {
            default: '#c0c0c0',
          },
          button: {
            background: {
              default: '#282828',
              hover: '#53575f',
            },
            foreground: {
              default: '#ffffff',
            },
          },
          stroke: {
            default: '#282828',
          },
        },
      },
      lightMode: {
        color: {
          background: {
            default: '#f6f7fa',
          },
          text: {
            default: '#282828',
          },
          numbers: {
            default: '#808080',
          },
          button: {
            background: {
              default: '#f6f7fa',
              hover: '#53575f',
            },
            foreground: {
              default: '#a0a0a0',
            },
          },
          stroke: {
            default: '#282828',
          },
        },
      },
      monacoTheme: {
        parameter: {
          foreground: '#c0c0c0',
          background: 'rgb(62.745% 62.745% 62.745% / 0.2)',
        },
      },
    },
    codeInline: {
      space: {
        x: '0.25rem',
      },
      stroke: '1px',
      typography: {
        text: {
          default:
            '500 0.875rem/1.7 "Inconsolata", Consolas, "SFMono Regular", monospace',
        },
      },
      radii: {
        all: '0.25rem',
      },
      color: {
        background: {
          default: '#282828',
        },
        text: {
          default: '#ffffff',
        },
        stroke: {
          default: '#323232',
        },
      },
    },
    container: {
      space: {
        none: '0',
        xxs: '0.25rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '4rem',
      },
      gap: {
        none: '0',
        xxs: '0.25rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '4rem',
      },
    },
    datePicker: {
      dateOption: {
        space: {
          gap: '2px',
        },
        radii: {
          default: '0.25rem',
          range: '0',
        },
        stroke: '1px',
        size: {
          height: '2rem',
          width: '2rem',
        },
        typography: {
          label: {
            default:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '600 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            range:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        color: {
          label: {
            default: '#ffffff',
            hover: '#ffffff',
            active: '#1f1f1c',
            disabled: '#a0a0a0',
            range: '#ffffff',
          },
          background: {
            default: '#1f1f1c',
            hover: '#1f1f1c',
            active: '#faff69',
            disabled: '#1f1f1c',
            range: '#323232',
          },
          stroke: {
            default: '#1f1f1c',
            hover: '#faff69',
            active: '#faff69',
            disabled: '#1f1f1c',
            range: '#323232',
          },
        },
      },
      space: {
        gap: '0.25rem',
      },
      typography: {
        daytitle: {
          default:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        title: {
          default:
            '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      color: {
        title: {
          default: 'rgb(97.5% 97.5% 97.5%)',
        },
        daytitle: {
          default: '#b3b6bd',
        },
      },
    },
    dialog: {
      space: {
        y: '1.5rem',
        x: '2rem',
        gap: '1rem',
      },
      title: {
        space: {
          gap: '0.25rem',
        },
      },
      radii: {
        all: '0.5rem',
      },
      shadow: {
        default:
          '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
      },
      stroke: {
        default: '1px solid #323232',
      },
      typography: {
        title: {
          default:
            '700 1.25rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        description: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      color: {
        background: {
          default: '#1f1f1c',
        },
        title: {
          default: 'rgb(97.5% 97.5% 97.5%)',
        },
        description: {
          default: '#b3b6bd',
        },
        opaqueBackground: {
          default: 'lch(40.731 0 none / 0.75)',
        },
      },
    },
    docs: {
      typography: {
        titles: {
          lg: '600 2rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          md: '700 1.25rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          sm: '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        text: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        breadcrumbs: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        toc: {
          title: {
            default:
              '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          item: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
    },
    field: {
      typography: {
        label: {
          default:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          error:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        fieldText: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          error:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        placeholder: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        format: {
          default:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          error:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        genericLabel: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          error:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      type: {
        mobile: {
          label:
            '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          'field-value':
            '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      space: {
        x: '0.75rem',
        y: '0.2813rem',
        gap: '0.5rem',
      },
      size: {
        icon: '1rem',
      },
      radii: {
        all: '0.25rem',
      },
      mobile: {
        space: {
          x: '0.75rem',
          y: '0.5rem',
          gap: '0.5rem',
        },
      },
      color: {
        background: {
          default: 'rgb(17.794% 17.794% 17.794%)',
          hover: 'rgb(19.849% 19.849% 19.849%)',
          active: 'rgb(19.849% 19.849% 19.849%)',
          disabled: '#414141',
          error: 'rgb(19.849% 19.849% 19.849%)',
        },
        text: {
          default: '#e6e7e9',
          hover: '#e6e7e9',
          active: '#ffffff',
          disabled: '#808080',
          error: '#ffbaba',
        },
        stroke: {
          default: 'rgb(23.627% 23.627% 23.627%)',
          hover: 'rgb(27.446% 27.446% 27.446%)',
          active: '#faff69',
          disabled: '#414141',
          error: '#ffbaba',
        },
        label: {
          default: '#b3b6bd',
          hover: '#b3b6bd',
          active: '#ffffff',
          disabled: '#606060',
          error: '#ffbaba',
        },
        format: {
          default: 'rgb(60.157% 60.157% 60.157%)',
          hover: 'rgb(60.157% 60.157% 60.157%)',
          active: 'rgb(60.157% 60.157% 60.157%)',
          disabled: '#808080',
          error: 'rgb(60.157% 60.157% 60.157%)',
        },
        genericLabel: {
          default: '#ffffff',
          hover: '#ffffff',
          active: '#ffffff',
          disabled: '#a0a0a0',
        },
        placeholder: {
          default: '#808080',
          disabled: '#606060',
        },
      },
    },
    fileUpload: {
      sm: {
        icon: {
          size: {
            height: '1.5rem',
            width: '1.5rem',
          },
        },
        space: {
          gap: '0.75rem',
          x: '1rem',
          y: '0.5rem',
        },
        radii: {
          all: '0.25rem',
        },
        color: {
          icon: {
            default: '#b3b6bd',
          },
        },
      },
      md: {
        icon: {
          size: {
            height: '2rem',
            width: '2rem',
          },
        },
        space: {
          gap: '0.5rem',
          x: '1rem',
          y: '0.75rem',
        },
        radii: {
          all: '0.5rem',
        },
        color: {
          icon: {
            default: '#ffffff',
          },
        },
      },
      typography: {
        title: {
          default:
            '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        description: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      hasFile: {
        space: {
          gap: '0.75rem',
        },
        header: {
          space: {
            gap: '0.5rem',
          },
        },
      },
      transitions: {
        all: 'all 100ms ease-in 0ms',
      },
      color: {
        background: {
          default: '#1f1f1c',
          hover: '#1f1f1c',
          active: 'rgb(19.849% 19.849% 19.849%)',
          error: 'rgb(100% 13.725% 13.725% / 0.2)',
        },
        stroke: {
          default: 'rgb(23.627% 23.627% 23.627%)',
          hover: 'rgb(23.627% 23.627% 23.627%)',
          active: '#414141',
          error: 'rgba(0, 0, 0, 0)',
        },
        title: {
          default: '#ffffff',
          hover: '#ffffff',
          active: '#ffffff',
          error: '#ffbaba',
        },
        description: {
          default: '#b3b6bd',
          hover: '#b3b6bd',
          active: '#b3b6bd',
          error: '#ffbaba',
        },
      },
    },
    flyout: {
      space: {
        default: {
          x: '0',
          y: '1.5rem',
          gap: '1rem',
          top: '0',
          content: {
            x: '1.5rem',
            y: '1.5rem',
            'row-gap': '0.25rem',
            'column-gap': '1rem',
          },
        },
        inline: {
          x: '0',
          y: '0.75rem',
          gap: '0.75rem',
          top: '3.5rem',
          content: {
            x: '0.75rem',
            y: '0.75rem',
            'row-gap': '0.25rem',
            'column-gap': '0.75rem',
          },
        },
      },
      shadow: {
        default: '-5px 0 20px 0 rgba(0, 0, 0, 0.08), -6px 0 10px 0 rgba(0, 0, 0, 0.08)',
        reverse: '5px 0 20px 0 rgba(0, 0, 0, 0.08), 6px 0 10px 0 rgba(0, 0, 0, 0.08)',
      },
      size: {
        default: {
          width: '27.5rem',
          height: '100%',
        },
        wide: {
          width: '37.5rem',
          height: '100vh',
        },
        narrow: {
          width: '21rem',
          height: '100%',
        },
        widest: {
          width: '55rem',
          height: '100vh',
        },
      },
      typography: {
        default: {
          description: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          title: {
            default:
              '700 1.25rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        inline: {
          description: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          title: {
            default:
              '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      color: {
        background: {
          default: '#282828',
        },
        title: {
          default: 'rgb(97.5% 97.5% 97.5%)',
        },
        description: {
          default: '#b3b6bd',
        },
        opaqueBackground: {
          default: 'lch(6.7738 0 none / 0.45)',
        },
        stroke: {
          default: '#323232',
        },
      },
    },
    genericMenu: {
      item: {
        space: {
          x: '1rem',
          y: '0.3438rem',
          gap: '0.5rem',
        },
        icon: {
          size: {
            height: '0.9688rem',
            width: '0.9688rem',
          },
        },
        typography: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          sectionHeader: {
            default:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          subtext: {
            default:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        'two-lines': {
          space: {
            x: '1rem',
            y: '0.3438rem',
            gap: '0.75rem',
          },
        },
        size: {
          minWidth: '180px',
        },
        color: {
          default: {
            text: {
              default: '#ffffff',
              hover: '#ffffff',
              active: '#ffffff',
              disabled: '#808080',
              muted: '#b3b6bd',
            },
            background: {
              default: '#282828',
              hover: 'rgb(23.064% 23.064% 23.064%)',
              active: '#282828',
              disabled: '#414141',
            },
            stroke: {
              default: '#323232',
            },
          },
          format: {
            default: 'lch(62.868 0 none)',
            hover: 'rgb(60.157% 60.157% 60.157%)',
            active: 'rgb(60.157% 60.157% 60.157%)',
            disabled: '#808080',
            error: 'rgb(60.157% 60.157% 60.157%)',
          },
          subtext: {
            default: '#b3b6bd',
            hover: '#b3b6bd',
            active: '#b3b6bd',
            disabled: '#c0c0c0',
          },
          danger: {
            text: {
              default: '#ffbaba',
              hover: '#ffbaba',
              active: '#ffbaba',
              disabled: '#808080',
            },
            background: {
              default: '#282828',
              hover: 'rgb(100% 21.274% 21.274% / 0.3)',
              active: 'rgb(100% 13.725% 13.725% / 0.45)',
              disabled: '#414141',
            },
            stroke: {
              default: 'rgba(0, 0, 0, 0)',
            },
          },
        },
      },
      itemCustom: {
        typography: {
          label: {
            sm: '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            lg: '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      button: {
        space: {
          gap: '0.25rem',
          y: '0.5rem',
        },
        typography: {
          label: {
            default:
              '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        color: {
          background: {
            default: '#282828',
          },
          label: {
            default: '#b3b6bd',
          },
          stroke: {
            default: '#323232',
          },
        },
      },
      panel: {
        radii: {
          all: '0.25rem',
        },
        shadow: {
          default:
            '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
        },
        size: {
          height: '2rem',
        },
        color: {
          background: {
            default: '#282828',
          },
          stroke: {
            default: '#414141',
          },
        },
      },
      autocomplete: {
        typography: {
          results: {
            label: {
              default:
                '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
          search: {
            placeholder: {
              default:
                '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
            term: {
              default:
                '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
        },
        search: {
          stroke: {
            default: '2px solid #323232',
          },
        },
        color: {
          placeholder: {
            default: '#808080',
          },
          searchTerm: {
            default: '#ffffff',
          },
          background: {
            default: '#282828',
          },
          stroke: {
            default: '#323232',
          },
        },
      },
      sectionHeader: {
        space: {
          bottom: '0.3438rem',
          top: '0.5rem',
        },
      },
      placeholder: {
        space: {
          gap: '0.5rem',
        },
      },
    },
    grid: {
      header: {
        cell: {
          space: {
            y: '0.4375rem',
            x: '0.5rem',
          },
          size: {
            height: '2rem',
          },
          color: {
            background: {
              default: '#282828',
              selectIndirect: 'lch(19.47 0 none)',
              selectDirect: 'lch(27.259 0 none)',
            },
            title: {
              default: '#b3b6bd',
              selectIndirect: '#ffffff',
              selectDirect: '#ffffff',
            },
            stroke: {
              default: 'lch(20.268 0 none)',
              selectIndirect: 'lch(26.846 0 none)',
              selectDirect: 'lch(29.406 0 none)',
            },
          },
        },
        title: {
          default:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      body: {
        cell: {
          space: {
            y: '5.5px',
            x: '0.5rem',
          },
          size: {
            height: '2rem',
          },
          color: {
            background: {
              default: '#1f1f1c',
              selectIndirect: 'lch(15.792 0 none)',
              selectDirect: 'lch(15.792 0 none)',
            },
            stroke: {
              default: '#323232',
              selectIndirect: 'lch(22.028 0 none)',
              selectDirect: '#faff69',
            },
            text: {
              default: 'lch(100 0 none)',
              selectIndirect: '#ffffff',
              selectDirect: '#ffffff',
            },
          },
        },
      },
      cell: {
        text: {
          default:
            '500 0.875rem/1.5 "Inconsolata", Consolas, "SFMono Regular", monospace',
        },
      },
      radii: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
      global: {
        color: {
          stroke: {
            default: '#323232',
          },
          background: {
            default: '#1f1f1c',
          },
        },
      },
    },
    gridContainer: {
      gap: {
        none: '0',
        xxs: '0.25rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        xxl: '4rem',
        unset: "''",
      },
    },
    icon: {
      space: {
        xs: {
          all: '0.25rem',
        },
        sm: {
          all: '0.25rem',
        },
        md: {
          all: '0.365rem',
        },
        lg: {
          all: '0.5rem',
        },
        xl: {
          all: '0.75rem',
        },
        xxl: {
          all: '1rem',
        },
      },
      color: {
        background: {
          default: 'rgba(0, 0, 0, 0)',
          success: 'rgb(20% 100% 26.667% / 0.2)',
          neutral: 'rgb(62.745% 62.745% 62.745% / 0.2)',
          danger: 'rgb(100% 13.725% 13.725% / 0.2)',
          info: 'rgb(26.275% 49.412% 93.725% / 0.2)',
          warning: 'rgb(100% 46.667% 16.078% / 0.2)',
        },
        text: {
          default: 'rgba(0, 0, 0, 0)',
          success: '#ccffd0',
          neutral: '#c0c0c0',
          danger: '#ffbaba',
          info: '#d0dffb',
          warning: '#ffb88f',
        },
        stroke: {
          default: 'rgba(0, 0, 0, 0)',
          success: 'rgb(20% 100% 26.667% / 0.05)',
          neutral: 'rgb(62.745% 62.745% 62.745% / 0.2)',
          danger: 'rgb(100% 13.725% 13.725% / 0.05)',
          info: 'rgb(26.275% 49.412% 93.725% / 0.05)',
          warning: 'rgb(100% 46.667% 16.078% / 0.05)',
        },
      },
    },
    image: {
      sm: {
        size: {
          height: '1rem',
          width: '1rem',
        },
      },
      xs: {
        size: {
          height: '0.75rem',
          width: '0.75rem',
        },
      },
      md: {
        size: {
          height: '1.25rem',
          width: '1.25rem',
        },
      },
      lg: {
        size: {
          height: '1.5rem',
          width: '1.5rem',
        },
      },
      xl: {
        size: {
          height: '2rem',
          width: '2rem',
        },
      },
      xxl: {
        size: {
          height: '4rem',
          width: '4rem',
        },
      },
      borderWidth: {
        default: '1.5px',
        thin: '1px',
      },
      color: {
        stroke: '#ffffff',
      },
    },
    link: {
      space: {
        md: {
          gap: '0.25rem',
        },
        sm: {
          gap: '2px',
        },
      },
      icon: {
        size: {
          sm: {
            height: '0.75rem',
            width: '0.75rem',
          },
          md: {
            height: '1rem',
            width: '1rem',
          },
        },
      },
    },
    panel: {
      strokeWidth: {
        default: '1px',
      },
      radii: {
        none: '0',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
      },
      stroke: {
        default: '1px solid #323232',
      },
      shadow: {
        default:
          '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
      },
      space: {
        y: {
          none: '0',
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
        },
        x: {
          none: '0',
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
        },
        gap: {
          none: '0',
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem',
        },
      },
      color: {
        background: {
          default: '#1f1f1c',
          muted: '#282828',
          transparent: 'rgba(0, 0, 0, 0)',
        },
        stroke: {
          default: '#323232',
        },
      },
    },
    popover: {
      space: {
        y: '1rem',
        x: '1.5rem',
        gap: '0.75rem',
      },
      radii: {
        all: '0.25rem',
      },
      shadow: {
        default:
          '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
      },
      icon: {
        size: {
          height: '1.25rem',
          width: '1.25rem',
        },
      },
      color: {
        panel: {
          background: {
            default: '#282828',
          },
          stroke: {
            default: '#414141',
          },
        },
      },
    },
    radio: {
      radii: {
        all: '9999px',
      },
      typography: {
        label: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      color: {
        background: {
          default: 'rgb(17.794% 17.794% 17.794%)',
          hover: 'rgb(17.794% 17.794% 17.794%)',
          active: '#faff69',
          disabled: '#414141',
        },
        stroke: {
          default: '#414141',
          hover: '#414141',
          active: '#151515',
          disabled: '#414141',
        },
        indicator: {
          default: '#1f1f1c',
          hover: 'rgb(17.794% 17.794% 17.794%)',
          active: '#151515',
          disabled: '#808080',
        },
      },
    },
    separator: {
      horizontal: {
        space: {
          y: {
            xs: '0',
            sm: '0.25rem',
            md: '0.5rem',
            ml: '0.75rem',
            lg: '1rem',
            xl: '1.5rem',
            xxl: '2rem',
          },
          x: {
            all: '0',
          },
        },
      },
      vertical: {
        space: {
          x: {
            xs: '0',
            sm: '0.25rem',
            md: '0.5rem',
            lg: '1rem',
            xl: '1.5rem',
            xxl: '2rem',
          },
          y: {
            all: '0',
          },
        },
      },
      color: {
        stroke: {
          default: '#323232',
        },
      },
    },
    sidebar: {
      navigation: {
        item: {
          radii: {
            all: '0.25rem',
          },
          default: {
            space: {
              right: '0.75rem',
              y: '0.2813rem',
              gap: '0.75rem',
              left: '0',
            },
          },
          typography: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          mobile: {
            typography: {
              default:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              hover:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              active:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
            space: {
              left: '0',
              right: '0.75rem',
              y: '0.75rem',
              gap: '0.75rem',
            },
          },
          collapsible: {
            space: {
              left: '0',
              right: '0.75rem',
              y: '0.2813rem',
              gap: '0.75rem',
            },
          },
          icon: {
            size: {
              height: '1rem',
              width: '1rem',
            },
          },
          global: {
            gap: '2px',
          },
        },
        title: {
          typography: {
            default:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        subItem: {
          default: {
            space: {
              left: '2.75rem',
              right: '0.75rem',
              y: '0.2813rem',
            },
          },
          mobile: {
            space: {
              left: '2.75rem',
              right: '0.75rem',
              y: '0.75rem',
              gap: '0.75rem',
            },
            typography: {
              default:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              hover:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              active:
                '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
          radii: {
            all: '0.25rem',
          },
          typography: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            disabled:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        dragControl: {
          separator: {
            size: {
              height: '0.125rem',
            },
          },
        },
      },
      main: {
        color: {
          background: {
            default: '#1f1f1c',
          },
          text: {
            default: '#ffffff',
            muted: '#b3b6bd',
          },
          stroke: {
            default: '#323232',
          },
        },
        navigation: {
          item: {
            color: {
              background: {
                active: 'lch(27.535 0 none / 0.6)',
                hover: 'lch(19.05 0 none)',
                default: 'rgba(0, 0, 0, 0)',
              },
              text: {
                default: '#ffffff',
                hover: '#ffffff',
                active: '#ffffff',
                muted: '#b3b6bd',
                disabled: '#808080',
              },
              icon: {
                default: '#b3b6bd',
                disabled: '#808080',
              },
            },
          },
          title: {
            color: {
              default: '#b3b6bd',
              hover: '#b3b6bd',
              active: '#b3b6bd',
            },
          },
          subItem: {
            color: {
              text: {
                default: '#b3b6bd',
                disabled: '#808080',
                hover: '#ffffff',
                active: '#ffffff',
              },
              background: {
                default: 'rgba(0, 0, 0, 0)',
                disabled: 'rgba(0, 0, 0, 0)',
                hover: 'lch(19.05 0 none)',
                active: 'rgba(0, 0, 0, 0)',
              },
              icon: {
                default: '#b3b6bd',
                disabled: '#808080',
              },
            },
          },
          dragControl: {
            separator: {
              color: {
                default: '#faff69',
              },
            },
          },
        },
      },
      sqlSidebar: {
        color: {
          background: {
            default: '#282828',
          },
          stroke: {
            default: '#323232',
          },
        },
        navigation: {
          item: {
            color: {
              background: {
                active: 'lch(27.535 0 none / 0.6)',
                hover: 'lch(19.05 0 none)',
                default: 'rgba(0, 0, 0, 0)',
              },
              text: {
                default: '#ffffff',
                hover: '#ffffff',
                active: '#ffffff',
                muted: '#b3b6bd',
                disabled: '#808080',
              },
              icon: {
                default: '#b3b6bd',
                disabled: '#808080',
              },
            },
          },
          subItem: {
            color: {
              text: {
                disabled: '#808080',
                default: '#b3b6bd',
                hover: '#ffffff',
                active: '#ffffff',
              },
              background: {
                default: 'rgba(0, 0, 0, 0)',
                hover: 'lch(19.05 0 none)',
                active: 'rgba(0, 0, 0, 0)',
              },
            },
          },
          title: {
            color: {
              default: '#b3b6bd',
              hover: '#b3b6bd',
              active: '#b3b6bd',
            },
          },
          dragControl: {
            separator: {
              color: {
                default: '#faff69',
              },
            },
          },
        },
      },
    },
    spacer: {
      horizontal: {
        space: {
          y: {
            xs: '0',
            sm: '0.25rem',
            md: '0.5rem',
            ml: '0.75rem',
            lg: '1rem',
            xl: '1.5rem',
            xxl: '2rem',
          },
          x: {
            all: '0',
          },
        },
      },
    },
    stepper: {
      vertical: {
        numbered: {
          connector: {
            size: {
              width: '0.1875rem',
            },
            stroke: {
              default: '2px',
            },
            color: {
              stroke: {
                incomplete: '#606060',
                complete: '#ffffff',
                active: '#606060',
              },
            },
          },
          typography: {
            title: {
              default:
                '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
          step: {
            typography: {
              number: {
                default:
                  '700 0.625rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
              },
            },
            size: {
              height: '1.5rem',
              width: '1.5rem',
              icon: {
                height: '0.75rem',
                width: '0.75rem',
              },
            },
            stroke: {
              default: '2px',
            },
            radii: {
              default: '9999px',
            },
            color: {
              stroke: {
                incomplete: '#606060',
                complete: '#ffffff',
                active: '#ffffff',
              },
              background: {
                incomplete: '#1f1f1c',
                complete: '#1f1f1c',
                active: '#ffffff',
              },
              icon: {
                incomplete: '#ffffff',
                complete: '#ffffff',
                active: '#1f1f1c',
              },
            },
          },
          content: {
            space: {
              gap: {
                x: '1rem',
                y: '0.5rem',
              },
              left: '2.75rem',
              bottom: {
                default: '2.5rem',
                active: '1.5rem',
              },
            },
          },
          color: {
            title: {
              incomplete: '#606060',
              complete: '#b3b6bd',
              active: '#ffffff',
            },
          },
        },
        bulleted: {
          connector: {
            size: {
              width: '0.1875rem',
            },
            stroke: {
              default: '2px',
            },
            color: {
              stroke: {
                incomplete: '#606060',
                complete: '#ffffff',
                active: '#606060',
              },
            },
          },
          step: {
            size: {
              height: '1rem',
              width: '1rem',
              icon: {
                height: '0.75rem',
                width: '0.75rem',
              },
            },
            radii: {
              default: '9999px',
            },
            stroke: {
              default: '2px',
            },
            color: {
              stroke: {
                incomplete: '#606060',
                complete: '#ffffff',
                active: '#ffffff',
              },
              background: {
                incomplete: '#1f1f1c',
                complete: '#1f1f1c',
                active: '#ffffff',
              },
              icon: {
                incomplete: '#1f1f1c',
                complete: '#ffffff',
                active: '#ffffff',
              },
            },
          },
          typography: {
            title: {
              default:
                '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
          content: {
            space: {
              gap: {
                x: '1rem',
                y: '0.5rem',
              },
              left: '2.25rem',
              bottom: {
                default: '2.5rem',
                active: '1.5rem',
              },
            },
          },
          color: {
            title: {
              incomplete: '#606060',
              complete: '#b3b6bd',
              active: '#ffffff',
            },
          },
        },
      },
    },
    switch: {
      space: {
        gap: '0.5rem',
      },
      radii: {
        all: '9999px',
      },
      size: {
        width: '2rem',
        height: '1rem',
      },
      typography: {
        label: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          disabled:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      color: {
        background: {
          default: '#606060',
          active: '#faff69',
          disabled: '#414141',
        },
        stroke: {
          default: '#606060',
          active: '#faff69',
          disabled: '#414141',
        },
        indicator: {
          default: '#151515',
          active: '#161517',
          disabled: '#606060',
        },
      },
    },
    table: {
      header: {
        title: {
          default:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        cell: {
          space: {
            md: {
              y: '0.75rem',
              x: '1rem',
            },
            sm: {
              y: '0.5rem',
              x: '1rem',
            },
          },
        },
        color: {
          background: {
            default: '#282828',
            hover: '#282828',
            active: 'rgb(17.794% 17.794% 17.794%)',
          },
          title: {
            default: 'rgb(97.5% 97.5% 97.5%)',
          },
          icon: {
            default: '#ffffff',
          },
          checkbox: {
            background: {
              default: '#cccfd3',
            },
            border: {
              default: '#808691',
            },
          },
        },
      },
      cell: {
        text: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        label: {
          default:
            '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        stroke: '1px',
      },
      radii: {
        all: '0.25rem',
      },
      body: {
        cell: {
          space: {
            md: {
              y: '1rem',
              x: '1rem',
            },
            sm: {
              y: '0.5rem',
              x: '1rem',
            },
          },
        },
      },
      mobile: {
        cell: {
          space: {
            y: '1rem',
            x: '1rem',
            gap: '0.5rem',
          },
        },
      },
      row: {
        color: {
          background: {
            default: '#1f1f1c',
            hover: 'lch(15.792 0 none)',
            active: 'rgb(17.535% 17.535% 17.535%)',
          },
          stroke: {
            default: '#323232',
          },
          text: {
            default: '#ffffff',
            disabled: '#808080',
          },
          link: {
            default: '#faff69',
          },
          label: {
            default: '#b3b6bd',
          },
          barChart: {
            default: '#414141',
            hover: '#606060',
          },
        },
      },
      global: {
        color: {
          stroke: {
            default: '#323232',
          },
          background: {
            default: '#1f1f1c',
          },
        },
      },
    },
    tabs: {
      space: {
        y: '0.5rem',
        x: '0.75rem',
      },
      radii: {
        all: '0.25rem',
      },
      typography: {
        label: {
          default:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          hover:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          active:
            '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      basic: {
        strokeWidth: {
          default: '1px',
          hover: '1px',
          active: '2px',
          global: '1px',
        },
        color: {
          background: {
            default: 'rgba(0, 0, 0, 0)',
            hover: '#282828',
            active: 'rgba(0, 0, 0, 0)',
          },
          text: {
            default: '#b3b6bd',
            hover: '#ffffff',
            active: '#ffffff',
          },
          stroke: {
            default: 'rgba(0, 0, 0, 0)',
            hover: 'rgba(0, 0, 0, 0)',
            active: '#faff69',
          },
          global: {
            default: '#323232',
          },
        },
      },
      fileTabs: {
        icon: {
          size: {
            height: '1rem',
            width: '1rem',
          },
        },
        space: {
          y: '1.0625rem',
          x: '1rem',
          gap: '0.75rem',
        },
        typography: {
          label: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            hover:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            active:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        radii: {
          all: '0',
        },
        color: {
          background: {
            default: '#1f1f1c',
            hover: '#282828',
            active: '#282828',
          },
          text: {
            default: '#b3b6bd',
            hover: '#ffffff',
            active: '#ffffff',
          },
          stroke: {
            default: '#323232',
            hover: '#323232',
            active: '#323232',
          },
          closeButton: {
            background: {
              default: 'rgba(0, 0, 0, 0)',
              hover: '#414141',
            },
          },
        },
      },
    },
    toast: {
      icon: {
        size: {
          height: '1rem',
          width: '1rem',
        },
      },
      space: {
        title: {
          gap: '0.5rem',
        },
        y: '0.75rem',
        x: '0.75rem',
        gap: '0.5rem',
      },
      radii: {
        all: '0.25rem',
      },
      shadow:
        '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
      typography: {
        title: {
          default:
            '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        description: {
          default:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      size: {
        width: '20.75rem',
      },
      color: {
        title: {
          default: 'rgb(97.5% 97.5% 97.5%)',
        },
        description: {
          default: '#b3b6bd',
        },
        stroke: {
          default: '#414141',
        },
        icon: {
          default: 'rgb(97.5% 97.5% 97.5%)',
          success: '#ccffd0',
          warning: '#ffb88f',
          danger: '#ffbaba',
        },
      },
    },
    tooltip: {
      radii: {
        all: '0.25rem',
      },
      space: {
        x: '0.75rem',
        y: '0.5rem',
      },
      typography: {
        label: {
          default:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      color: {
        background: {
          default: 'lch(16.114 0 none / 0.95)',
        },
        label: {
          default: '#ffffff',
        },
      },
    },
    dashboards: {
      chartWidget: {
        space: {
          gap: '1rem',
          element: {
            gap: '0.5rem',
          },
        },
        borderWidth: {
          default: '1px',
        },
        stroke: {
          default: '1px solid #323232',
          element: {
            default: '1px solid #323232',
          },
          hover: '1px solid #414141',
          selected: '1px solid #faff69',
        },
        element: {
          radii: {
            all: '0.25rem',
          },
        },
        radii: {
          all: '0.25rem',
        },
        typography: {
          title: {
            default:
              '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          description: {
            default: {
              default:
                '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
          label: {
            default: {
              default:
                '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            },
          },
        },
        shadow: {
          default: '0',
          hover:
            '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
        },
        size: {
          icon: {
            all: {
              drag: '1.25rem',
              menu: '1.5rem',
              resize: '0.75rem',
            },
          },
        },
        color: {
          stroke: {
            default: '#323232',
            hover: '#414141',
            selected: '#faff69',
          },
          title: {
            default: 'rgb(97.5% 97.5% 97.5%)',
          },
          description: {
            default: '#b3b6bd',
          },
          legend: {
            default: '#b3b6bd',
            hover: '#b3b6bd',
            selected: '#ffffff',
          },
          element: {
            stroke: {
              default: '#323232',
            },
          },
          background: {
            default: '#282828',
            hover: '#282828',
            selected: '#282828',
          },
          icon: {
            default: '#ffffff',
            hover: '#ffffff',
            selected: '#faff69',
          },
          opacity: {
            bar: {
              default: 0.2,
              hover: 0.5,
            },
          },
          label: {
            default: '#b3b6bd',
            hover: '#b3b6bd',
            selected: '#b3b6bd',
          },
        },
      },
    },
    global: {
      color: {
        background: {
          default: '#1f1f1c',
          muted: '#282828',
        },
        text: {
          default: '#ffffff',
          muted: '#b3b6bd',
          disabled: '#808080',
          link: {
            default: '#faff69',
            hover: '#feffc2',
          },
          danger: '#ffbaba',
        },
        stroke: {
          default: '#323232',
          muted: '#323232',
          intense: '#414141',
        },
        accent: {
          default: '#faff69',
        },
        outline: {
          default: '#faff69',
        },
        shadow: {
          default: 'rgb(8.2353% 8.2353% 8.2353% / 0.6)',
        },
        title: {
          default: 'rgb(97.5% 97.5% 97.5%)',
          muted: '#b3b6bd',
        },
      },
    },
    feedback: {
      color: {
        info: {
          background: 'rgb(26.275% 49.412% 93.725% / 0.2)',
          foreground: '#d0dffb',
        },
        success: {
          background: 'rgb(20% 100% 26.667% / 0.2)',
          foreground: '#ccffd0',
        },
        warning: {
          background: 'rgb(100% 46.667% 16.078% / 0.2)',
          foreground: '#ffb88f',
        },
        danger: {
          background: 'rgb(100% 13.725% 13.725% / 0.2)',
          foreground: '#ffbaba',
        },
        neutral: {
          background: 'rgb(62.745% 62.745% 62.745% / 0.2)',
          foreground: '#c0c0c0',
          stroke: '#323232',
        },
      },
    },
    storybook: {
      global: {
        background: '#1b1c1d',
      },
    },
    chart: {
      bars: {
        color: {
          blue: '#437eef',
          orange: '#ff7729',
          green: '#33ff44',
          fuchsia: '#fb64d6',
          yellow: '#eef400',
          violet: '#bb33ff',
          babyblue: '#00cbeb',
          red: '#ff2323',
          teal: '#6df8e1',
          sunrise: '#ffc300',
          slate: '#9a9ea7',
        },
      },
      color: {
        default: {
          blue: '#437eef',
          orange: '#ff7729',
          green: '#33ff44',
          fuchsia: '#fb64d6',
          yellow: '#eef400',
          violet: '#bb33ff',
          babyblue: '#00cbeb',
          red: '#ff2323',
          teal: '#6df8e1',
          sunrise: '#ffc300',
          slate: '#9a9ea7',
        },
        label: {
          default: '#ffffff',
          deselected: 'lch(100 0 none / 0.3)',
        },
      },
    },
    serviceCard: {
      color: {
        background: {
          default: 'rgb(17.794% 17.794% 17.794%)',
          hover: 'lch(19.053 0 none)',
        },
        stroke: {
          default: 'rgb(23.627% 23.627% 23.627%)',
          hover: 'rgb(27.446% 27.446% 27.446%)',
        },
      },
    },
    gareth: {
      test: {
        main: {
          text: '#ffffff',
          danger: '#ffbaba',
        },
      },
    },
  },
  transition: {
    default: 'all 100ms ease-in 0ms',
    duration: {
      slow: '300ms',
      smooth: '150ms',
      medium: '100ms',
      fast: '50ms',
    },
    delay: {
      slow: '100ms',
      fast: '0ms',
    },
    function: {
      ease: 'ease',
      'ease-in': 'ease-in',
      'ease-in-out': 'ease-in-out',
      linear: 'linear',
    },
  },
  grid: {
    header: {
      cell: {
        borderWidth: {
          default: '1px',
          selectIndirect: '1px',
          selectDirect: '1px',
        },
      },
    },
    body: {
      cell: {
        borderWidth: {
          default: '1px',
          selectIndirect: '1px',
          selectDirect: '2px',
        },
      },
    },
  },
  palette: {
    brand: {
      '50': '#ffffe8',
      '100': '#feffc2',
      '200': '#fdffa3',
      '300': '#faff69',
      '400': '#eef400',
      '500': '#c7cc00',
      '600': '#959900',
      '700': '#686b00',
      '800': '#3c4601',
      '900': '#333300',
      base: '#fbff46',
    },
    neutral: {
      '0': '#ffffff',
      '100': '#f9f9f9',
      '200': '#dfdfdf',
      '300': '#c0c0c0',
      '400': '#a0a0a0',
      '500': '#808080',
      '600': '#606060',
      '650': '#505050',
      '700': '#414141',
      '712': '#323232',
      '725': '#282828',
      '750': '#1f1f1c',
      '800': '#1d1d1d',
      '900': '#151515',
      base: '#212121',
    },
    slate: {
      '25': '#fbfcff',
      '50': '#f6f7fa',
      '100': '#e6e7e9',
      '200': '#cccfd3',
      '300': '#b3b6bd',
      '400': '#9a9ea7',
      '500': '#808691',
      '600': '#696e79',
      '700': '#53575f',
      '800': '#302e32',
      '900': '#161517',
      base: '#373439',
      '50a': 'lch(49.809 30.506 276.77 / 0.06)',
    },
    indigo: {
      '50': '#f4f1fc',
      '100': '#e4e2e9',
      '200': '#c8c5d3',
      '300': '#ada8bd',
      '400': '#918ba7',
      '500': '#766e91',
      '600': '#5e5874',
      '700': '#474257',
      '800': '#23212c',
      '900': '#18161d',
      base: '#2f2c3a',
    },
    info: {
      '50': '#e7effd',
      '100': '#d0dffb',
      '200': '#a1bef7',
      '300': '#6d9bf3',
      '400': '#437eef',
      '500': '#1d64ec',
      '600': '#104ec6',
      '650': '#0d3e9b',
      '700': '#0d3e9b',
      '800': '#092b6c',
      '900': '#061c47',
      base: '#4781f0',
    },
    success: {
      '50': '#e5ffe8',
      '100': '#ccffd0',
      '200': '#99ffa1',
      '300': '#66ff73',
      '400': '#33ff44',
      '500': '#00e513',
      '600': '#00bd10',
      '700': '#008a0b',
      '800': '#006108',
      '850': '#004206',
      '900': '#004206',
      base: '#62de85',
    },
    warning: {
      '50': '#ffe2d1',
      '100': '#ffcbad',
      '200': '#ffb88f',
      '300': '#ff9457',
      '400': '#ff7729',
      '500': '#f55a00',
      '600': '#d64f00',
      '700': '#a33c00',
      '800': '#7a2d00',
      '900': '#471a00',
      base: '#ffa63d',
    },
    danger: {
      '50': '#ffdddd',
      '100': '#ffbaba',
      '200': '#ff9898',
      '300': '#ff7575',
      '400': '#ff2323',
      '500': '#f10000',
      '600': '#c10000',
      '700': '#910000',
      '800': '#610000',
      '900': '#300000',
      base: '#ff5353',
    },
    gradients: {
      base: 'linear-gradient(229.65deg, #292924 15.78%, #0F0F0F 88.39%)',
      yellowToblack: 'linear-gradient(132deg, #FAFF69 8%, #292929 30%);',
      whiteToblack: 'linear-gradient(132deg, #FFFFFF 8%, #292929 30%);',
      transparent: 'rgba(0, 0, 0, 0)',
    },
    utility: {
      transparent: 'rgba(0, 0, 0, 0)',
    },
    teal: {
      '50': '#e6fefa',
      '100': '#cffcf4',
      '200': '#a3faec',
      '300': '#6df8e1',
      '400': '#0cedc8',
      '500': '#0bd0af',
      '600': '#089b83',
      '700': '#067462',
      '800': '#045245',
      '850': '#004237',
      '900': '#03352d',
    },
    violet: {
      '50': '#f6e5ff',
      '100': '#eeccff',
      '200': '#dd99ff',
      '300': '#cc66ff',
      '400': '#bb33ff',
      '500': '#aa00ff',
      '600': '#8800cc',
      '700': '#660099',
      '800': '#440066',
      '850': '#33004d',
      '900': '#220033',
    },
    fuchsia: {
      '50': '#fbeff8',
      '100': '#fbc9ef',
      '200': '#fb97e2',
      '300': '#fb64d6',
      '400': '#fb32c9',
      '500': '#fb00bc',
      '600': '#cc0099',
      '700': '#990073',
      '800': '#66004d',
      '850': '#4d0039',
      '900': '#330026',
    },
    sunrise: {
      '50': '#fff3cc',
      '100': '#ffe799',
      '200': '#ffdb66',
      '300': '#ffcf33',
      '400': '#ffc300',
      '500': '#e0ac00',
      '600': '#b28800',
      '700': '#8a6900',
      '800': '#574200',
      '900': '#332700',
    },
    babyblue: {
      '50': '#dbfaff',
      '100': '#bdf6ff',
      '200': '#8aefff',
      '300': '#33e4ff',
      '400': '#00cbeb',
      '500': '#00b5d1',
      '600': '#008599',
      '700': '#006170',
      '800': '#00424d',
      '900': '#002c33',
    },
  },
  sizes: {
    '0': '0',
    '1': '1px',
    '2': '0.25rem',
    '3': '0.5rem',
    '4': '0.75rem',
    '5': '1rem',
    '6': '1.25rem',
    '7': '1.5rem',
    '8': '1.75rem',
    '9': '2rem',
    '10': '2.5rem',
    '11': '4rem',
  },
  typography: {
    font: {
      families: {
        regular:
          '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        mono: '"Inconsolata", Consolas, "SFMono Regular", monospace',
        display:
          '\'Basier Square\', "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
      },
      weights: {
        '1': '400',
        '2': '500',
        '3': '600',
        '4': '700',
      },
      sizes: {
        '0': '0.625rem',
        '1': '0.75rem',
        '2': '0.875rem',
        '3': '1rem',
        '4': '1.125rem',
        '5': '1.25rem',
        '6': '2rem',
        base: '16px',
      },
      'line-height': {
        '1': 1.5,
        '2': 1.6,
        '3': 1.7,
        '4': 1.3,
      },
    },
    styles: {
      product: {
        titles: {
          xs: '600 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          sm: '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          md: '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          lg: '700 1.125rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          xl: '700 1.25rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          '2xl':
            '600 2rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
        text: {
          normal: {
            xs: '400 0.625rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            sm: '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            md: '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            lg: '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          medium: {
            xs: '500 0.625rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            sm: '500 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            md: '500 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            lg: '500 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          semibold: {
            xs: '600 0.625rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            sm: '600 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            md: '600 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            lg: '600 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
          mono: {
            xs: '500 0.625rem/1.6 "Inconsolata", Consolas, "SFMono Regular", monospace',
            sm: '500 0.75rem/1.6 "Inconsolata", Consolas, "SFMono Regular", monospace',
            md: '500 0.875rem/1.7 "Inconsolata", Consolas, "SFMono Regular", monospace',
            lg: '500 1rem/1.6 "Inconsolata", Consolas, "SFMono Regular", monospace',
          },
          bold: {
            xs: '700 0.625rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            sm: '700 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            md: '700 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
            lg: '700 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
      },
      brand: {
        titles: {
          xs: '600 20px/1.5 \'Basier Square\', "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          sm: '600 24px/1.5 \'Basier Square\', "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          md: '600 36px/1.3 \'Basier Square\', "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          lg: '600 56px/1.3 \'Basier Square\', "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          xl: '700 64px/1.3 \'Basier Square\', "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          '2xl':
            '700 80px/1.3 \'Basier Square\', "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      field: {
        md: '400 0.875rem/1.6 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
      },
    },
  },
  border: {
    radii: {
      '0': '0',
      '1': '0.25rem',
      '2': '0.5rem',
      '3': '0.75rem',
      full: '9999px',
    },
    width: {
      '1': '1px',
      '2': '2px',
    },
  },
  spaces: {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.5rem',
    '6': '2rem',
    '7': '2.5rem',
    '8': '4rem',
  },
  shadow: {
    '1': '0 4px 6px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6), 0 2px 4px -1px rgb(8.2353% 8.2353% 8.2353% / 0.6)',
    '2': '0 4px 4px 0 rgba(88, 92, 98, 0.06), inset 5px 0 10px 0 rgba(104, 105, 111, 0.1)',
    '3': '-5px 0 20px 0 rgba(0, 0, 0, 0.08), -6px 0 10px 0 rgba(0, 0, 0, 0.08)',
    '4': '5px 0 20px 0 rgba(0, 0, 0, 0.08), 6px 0 10px 0 rgba(0, 0, 0, 0.08)',
    '5': '0 2px 2px 0 rgba(0, 0, 0, 0.03)',
  },
  breakpoint: {
    sizes: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  global: {
    color: {
      gradients: {
        yellowToBlack: 'linear-gradient(132deg, #faff69 8%, #292929 30%)',
        whiteToBlack: 'linear-gradient(132deg, #ffffff 8%, #292929 30%)',
      },
      background: {
        default: '#1f1f1c',
        muted: '#282828',
        sidebar: '#1f1f1c',
        split: '#282828',
        muted_a: 'lch(49.809 30.506 276.77 / 0.06)',
      },
      text: {
        default: '#ffffff',
        muted: '#b3b6bd',
        disabled: '#808080',
        link: {
          default: '#faff69',
          hover: '#feffc2',
        },
      },
      stroke: {
        default: '#323232',
        muted: '#323232',
        intense: '#414141',
        split: '#414141',
      },
      accent: {
        default: '#faff69',
      },
      outline: {
        default: '#faff69',
      },
      shadow: {
        default: 'lch(6.7738 0 none / 0.6)',
      },
      feedback: {
        info: {
          background: '#0d3e9b',
          foreground: '#d0dffb',
        },
        success: {
          background: '#004206',
          foreground: '#ccffd0',
        },
        warning: {
          background: '#7a2d00',
          foreground: '#ffb88f',
        },
        danger: {
          background: '#610000',
          foreground: '#ffbaba',
        },
        neutral: {
          background: '#414141',
          foreground: '#f9f9f9',
          stroke: '#323232',
        },
      },
      chart: {
        bars: {
          blue: '#437eef',
          orange: '#ff7729',
          green: '#33ff44',
          fuchsia: '#fb64d6',
          yellow: '#eef400',
          violet: '#bb33ff',
          babyblue: '#00cbeb',
          red: '#ff2323',
          teal: '#6df8e1',
          sunrise: '#ffc300',
          slate: '#9a9ea7',
        },
        default: {
          blue: '#437eef',
          orange: '#ff7729',
          green: '#33ff44',
          fuchsia: '#fb64d6',
          yellow: '#eef400',
          violet: '#bb33ff',
          babyblue: '#00cbeb',
          red: '#ff2323',
          danger: '#ff2323',
          teal: '#6df8e1',
          sunrise: '#ffc300',
          slate: '#9a9ea7',
        },
        label: {
          default: '#ffffff',
          deselected: 'lch(100 0 none / 0.3)',
        },
      },
      iconButton: {
        badge: {
          foreground: '#1d1d1d',
          background: '#faff69',
        },
      },
      icon: {
        background: 'linear-gradient(132deg, #FAFF69 8%, #292929 30%);',
      },
    },
  },
  name: 'dark',
};

export default theme;
