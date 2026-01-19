const theme = {
  click: {
    accordion: {
      sm: {
        icon: {
          size: {
            height: "1rem",
            width: "1rem",
          },
        },
        space: {
          gap: "0.25rem",
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
            height: "1.25rem",
            width: "1.25rem",
          },
        },
        space: {
          gap: "0.25rem",
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
            height: "1.5rem",
            width: "1.5rem",
          },
        },
        space: {
          gap: "0.25rem",
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
            default: "#161517",
            hover: "lch(13.917 1.3308 305.43)",
            active: "#161517",
          },
          icon: {
            default: "#161517",
            hover: "lch(13.917 1.3308 305.43)",
            active: "#161517",
          },
        },
        link: {
          label: {
            default: "#437eef",
            hover: "#104ec6",
            active: "#437eef",
          },
          icon: {
            default: "#437eef",
            hover: "lch(40.786 66.387 286.32)",
            active: "#437eef",
          },
        },
      },
    },
    alert: {
      medium: {
        space: {
          y: "0.75rem",
          x: "0.75rem",
          gap: "0",
          banner: "0.5rem",
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
          height: "1.25rem",
          width: "1.25rem",
        },
      },
      small: {
        space: {
          y: "0.5rem",
          x: "0.75rem",
          gap: "0",
          banner: "0.25rem",
        },
        icon: {
          height: "1rem",
          width: "1rem",
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
        center: "0",
        end: "0.25rem",
      },
      color: {
        background: {
          default: "#ffffff",
          success: "rgb(20% 100% 26.667% / 0.1)",
          neutral: "rgb(41.176% 43.137% 47.451% / 0.1)",
          danger: "rgb(100% 13.725% 13.725% / 0.1)",
          warning: "rgb(100% 46.667% 16.078% / 0.1)",
          info: "rgb(26.275% 49.412% 93.725% / 0.1)",
        },
        text: {
          default: "#696e79",
          success: "#008a0b",
          neutral: "#53575f",
          danger: "#c10000",
          warning: "#a33c00",
          info: "#437eef",
        },
        iconBackground: {
          default: "#ffffff",
          success: "rgb(20% 100% 26.667% / 0)",
          neutral: "rgb(41.176% 43.137% 47.451% / 0)",
          danger: "rgb(100% 13.725% 13.725% / 0)",
          warning: "rgb(100% 46.667% 16.078% / 0)",
          info: "rgb(26.275% 49.412% 93.725% / 0)",
        },
        iconForeground: {
          default: "#696e79",
          success: "lch(49.786 70.246 135.31 / 0.75)",
          neutral: "lch(36.838 5.2307 266.96 / 0.75)",
          danger: "lch(41.001 86.638 40.858 / 0.75)",
          warning: "lch(40.227 66.602 51.059 / 0.75)",
          info: "lch(53.426 64.605 278.98 / 0.75)",
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
          width: "1.5rem",
        },
        width: "1.5rem",
        height: "1.5rem",
      },
      radii: {
        all: "9999px",
      },
      color: {
        background: {
          default: "#696e79",
          hover: "#9a9ea7",
          active: "#9a9ea7",
        },
        text: {
          default: "#ffffff",
          hover: "#ffffff",
          active: "#ffffff",
        },
      },
    },
    badge: {
      space: {
        md: {
          x: "0.75rem",
          y: "0.125rem",
          gap: "0.25rem",
        },
        sm: {
          x: "0.5rem",
          y: "0.1563rem",
          gap: "0.125rem",
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
        all: "9999px",
      },
      stroke: "1px",
      icon: {
        md: {
          size: {
            height: "0.75rem",
            width: "0.75rem",
          },
        },
        sm: {
          size: {
            height: "0.625rem",
            width: "0.625rem",
          },
        },
      },
      opaque: {
        color: {
          background: {
            default: "#f6f7fa",
            success: "rgb(20% 100% 26.667% / 0.1)",
            neutral: "rgb(41.176% 43.137% 47.451% / 0.1)",
            danger: "rgb(100% 13.725% 13.725% / 0.1)",
            disabled: "#dfdfdf",
            info: "rgb(26.275% 49.412% 93.725% / 0.1)",
            warning: "rgb(100% 46.667% 16.078% / 0.1)",
          },
          text: {
            default: "#696e79",
            success: "#008a0b",
            neutral: "#53575f",
            danger: "#c10000",
            disabled: "#a0a0a0",
            info: "#437eef",
            warning: "#a33c00",
          },
          stroke: {
            default: "#e6e7e9",
            success: "rgb(20% 100% 26.667% / 0.05)",
            neutral: "rgb(41.176% 43.137% 47.451% / 0.1)",
            danger: "rgb(100% 13.725% 13.725% / 0.05)",
            disabled: "rgb(83.078% 83.078% 83.078%)",
            info: "rgb(26.275% 49.412% 93.725% / 0.05)",
            warning: "rgb(100% 46.667% 16.078% / 0.05)",
          },
        },
      },
      solid: {
        color: {
          background: {
            default: "#a0a0a0",
            success: "#008a0b",
            neutral: "#606060",
            danger: "#c10000",
            disabled: "#dfdfdf",
            info: "#104ec6",
            warning: "#d64f00",
          },
          text: {
            default: "#ffffff",
            success: "#ffffff",
            neutral: "#ffffff",
            danger: "#ffffff",
            disabled: "#a0a0a0",
            info: "#ffffff",
            warning: "#ffffff",
          },
          stroke: {
            default: "#e6e7e9",
            success: "rgb(20% 100% 26.667% / 0.05)",
            neutral: "rgb(41.176% 43.137% 47.451% / 0.1)",
            danger: "rgb(100% 13.725% 13.725% / 0.05)",
            disabled: "rgb(83.078% 83.078% 83.078%)",
            info: "rgb(26.275% 49.412% 93.725% / 0.05)",
            warning: "rgb(100% 46.667% 16.078% / 0.05)",
          },
        },
      },
    },
    bigStat: {
      space: {
        all: "1rem",
        sm: {
          gap: "0",
        },
        lg: {
          gap: "0.5rem",
        },
      },
      radii: {
        all: "0.25rem",
      },
      stroke: "1px",
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
          default: "#e6e7e9",
          muted: "#e6e7e9",
          danger: "#c10000",
        },
        background: {
          default: "#ffffff",
          muted: "#f6f7fa",
        },
        label: {
          default: "#696e79",
          muted: "#696e79",
          danger: "#c10000",
        },
        title: {
          default: "lch(11.126 1.374 305.43)",
          muted: "lch(11.126 1.374 305.43)",
        },
      },
    },
    button: {
      radii: {
        all: "0.25rem",
      },
      basic: {
        space: {
          x: "1rem",
          y: "0.2813rem",
          gap: "0.5rem",
          group: "0.5rem",
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
            height: "0.9688rem",
            all: "0.9688rem",
            width: "0.9688rem",
          },
        },
        color: {
          primary: {
            background: {
              default: "#302e32",
              hover: "lch(29.47 4.1845 266.96)",
              active: "#161517",
              disabled: "#dfdfdf",
              loading:
                "linear-gradient(90deg, rgb(76, 76, 76, 0.1) 0%, rgb(76, 76, 76) 100%)",
            },
            stroke: {
              default: "#302e32",
              hover: "lch(29.47 4.1845 266.96)",
              active: "#161517",
              disabled: "#dfdfdf",
            },
            text: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
          secondary: {
            background: {
              default: "rgba(0, 0, 0, 0)",
              hover: "#f6f7fa",
              active: "lch(95.274 1.5364 271.98)",
              disabled: "#dfdfdf",
              loading:
                "linear-gradient(90deg, rgb(232, 233, 235, 0.1) 0%, rgb(232, 233, 235) 100%)",
            },
            stroke: {
              default: "#e6e7e9",
              hover: "#e6e7e9",
              active: "#cccfd3",
              disabled: "#dfdfdf",
            },
            text: {
              default: "#161517",
              hover: "#161517",
              active: "#161517",
              disabled: "#a0a0a0",
            },
          },
          danger: {
            text: {
              default: "#c10000",
              hover: "#c10000",
              active: "#c10000",
              disabled: "#a0a0a0",
            },
            background: {
              default: "rgb(100% 13.725% 13.725% / 0.1)",
              hover: "rgb(100% 13.725% 13.725% / 0.2)",
              active: "rgb(100% 13.725% 13.725% / 0.3)",
              disabled: "#dfdfdf",
              loading:
                "linear-gradient(90deg, rgba(255, 211, 211, 0.1) 0%, rgb(255, 211, 211) 100%)",
            },
            stroke: {
              default: "rgb(100% 13.725% 13.725% / 0.1)",
              hover: "rgb(100% 13.725% 13.725% / 0.05)",
              active: "rgb(100% 13.725% 13.725% / 0.05)",
              disabled: "#dfdfdf",
            },
          },
          empty: {
            text: {
              default: "#437eef",
              hover: "#104ec6",
              active: "#437eef",
              disabled: "#a0a0a0",
            },
            background: {
              default: "rgba(0, 0, 0, 0)",
              hover: "#f6f7fa",
              active: "rgba(0, 0, 0, 0)",
              disabled: "rgba(0, 0, 0, 0)",
              loading:
                "linear-gradient(90deg, rgba(240, 242, 248, 0.1) 0%, rgb(240, 242, 248) 100%)",
            },
            stroke: {
              default: "rgba(0, 0, 0, 0)",
              hover: "rgba(0, 0, 0, 0)",
              active: "rgba(0, 0, 0, 0)",
              disabled: "rgba(0, 0, 0, 0)",
            },
          },
        },
      },
      iconButton: {
        default: {
          space: {
            x: "0.4375rem",
            y: "0.4375rem",
          },
        },
        size: {
          small: "0.75rem",
          medium: "1rem",
          large: "1.25rem",
        },
        radii: {
          all: "0.25rem",
        },
        sm: {
          space: {
            x: "0.25rem",
            y: "0.25rem",
          },
        },
        xs: {
          space: {
            x: "0",
            y: "0",
          },
        },
        color: {
          primary: {
            background: {
              default: "rgba(0, 0, 0, 0)",
              hover: "#f6f7fa",
              active: "rgb(86.824% 87.176% 88.235%)",
            },
            stroke: {
              default: "rgba(0, 0, 0, 0)",
              hover: "#f6f7fa",
              active: "rgb(86.824% 87.176% 88.235%)",
            },
            text: {
              default: "#161517",
              hover: "#161517",
              active: "#161517",
            },
          },
          secondary: {
            background: {
              default: "#302e32",
              hover: "lch(29.47 4.1845 266.96)",
              active: "lch(6.5908 1.3668 305.43)",
            },
            stroke: {
              default: "rgba(0, 0, 0, 0)",
              hover: "lch(29.47 4.1845 266.96)",
              active: "lch(6.5908 1.3668 305.43)",
            },
            text: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
            },
          },
          disabled: {
            background: {
              default: "#dfdfdf",
            },
            text: {
              default: "#a0a0a0",
            },
          },
          danger: {
            background: {
              default: "rgb(100% 13.725% 13.725% / 0.1)",
              hover: "rgb(100% 13.725% 13.725% / 0.2)",
              active: "rgb(100% 13.725% 13.725% / 0.3)",
            },
            text: {
              default: "#c10000",
              hover: "#c10000",
              active: "#c10000",
            },
            stroke: {
              default: "rgb(100% 13.725% 13.725% / 0.1)",
              hover: "rgb(100% 13.725% 13.725% / 0.2)",
              active: "rgb(100% 13.725% 13.725% / 0.3)",
            },
          },
          ghost: {
            background: {
              default: "rgba(0, 0, 0, 0)",
              hover: "rgba(0, 0, 0, 0)",
              active: "rgb(0% 0% 0% / 0)",
            },
            stroke: {
              default: "rgba(0, 0, 0, 0)",
              hover: "rgba(0, 0, 0, 0)",
              active: "rgba(0, 0, 0, 0)",
            },
            text: {
              default: "#696e79",
              hover: "#161517",
              active: "#161517",
            },
          },
          info: {
            background: {
              default: "rgb(26.275% 49.412% 93.725% / 0.1)",
              hover: "#d0dffb",
              active: "#a1bef7",
            },
            text: {
              default: "#437eef",
              hover: "#437eef",
              active: "#437eef",
            },
            stroke: {
              default: "rgb(26.275% 49.412% 93.725% / 0.1)",
              hover: "#d0dffb",
              active: "#a1bef7",
            },
          },
        },
      },
      stroke: "1px",
      split: {
        icon: {
          space: {
            y: "0.4375rem",
            x: "0.3438rem",
          },
        },
        space: {
          x: "1rem",
          y: "0.2813rem",
          gap: "0.5rem",
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
          divide: {
            default: "lch(23.301 2.6341 306.08)",
            active: "lch(16.375 2.3568 306.08)",
            hover: "lch(33.055 3.2737 266.96)",
            disabled: "lch(75.5 0 none)",
          },
          background: {
            main: {
              default: "#302e32",
              hover: "lch(26.965 3.8288 266.96)",
              active: "lch(6.348 1.3164 305.43)",
              disabled: "#dfdfdf",
            },
            action: {
              default: "#161517",
              hover: "lch(25.617 3.6374 266.96)",
              active: "lch(3.4689 0.71935 305.43)",
              disabled: "lch(84.382 0 none)",
            },
          },
          text: {
            default: "#ffffff",
            hover: "#ffffff",
            active: "#ffffff",
            disabled: "#a0a0a0",
          },
          stroke: {
            default: "rgba(0, 0, 0, 0)",
            hover: "rgba(0, 0, 0, 0)",
            active: "rgba(0, 0, 0, 0)",
            disabled: "rgba(0, 0, 0, 0)",
          },
        },
        secondary: {
          divide: {
            default: "lch(92.029 1.0472 265.86)",
            hover: "lch(92.449 0.99207 265.86)",
            active: "#cccfd3",
            disabled: "lch(75.5 0 none)",
          },
          background: {
            main: {
              default: "rgba(0, 0, 0, 0)",
              hover: "#f6f7fa",
              active: "lch(95.274 1.5364 271.98)",
              disabled: "#dfdfdf",
            },
            action: {
              default: "#f6f7fa",
              hover: "lch(94.788 1.5286 271.98)",
              active: "lch(92.892 1.498 271.98)",
              disabled: "lch(84.382 0 none)",
            },
          },
          text: {
            default: "#161517",
            hover: "#161517",
            active: "#161517",
            disabled: "#a0a0a0",
          },
          stroke: {
            default: "#e6e7e9",
            hover: "#e6e7e9",
            active: "#cccfd3",
            disabled: "rgba(0, 0, 0, 0)",
          },
        },
      },
      mobile: {
        button: {
          space: {
            x: "0.75rem",
            y: "0.5rem",
            gap: "0.5rem",
          },
        },
        basic: {
          size: {
            icon: {
              all: "1.25rem",
            },
          },
        },
      },
      group: {
        radii: {
          button: {
            default: {
              all: "2px",
            },
            borderless: {
              all: "0.25rem",
            },
          },
          panel: {
            all: "0.25rem",
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
              x: "3px",
              y: "3px",
              gap: "3px",
            },
            borderless: {
              x: "0",
              y: "0",
              gap: "0.25rem",
            },
          },
          button: {
            default: {
              y: "1.5px",
              x: "0.75rem",
            },
            borderless: {
              y: "5.5px",
              x: "1rem",
            },
          },
        },
        color: {
          background: {
            default: "rgba(0, 0, 0, 0)",
            hover: "#f6f7fa",
            active: "lch(95.274 1.5364 271.98)",
            disabled: "rgba(0, 0, 0, 0)",
            "disabled-active": "lch(76.219 1.2291 271.98)",
            panel: "rgba(0, 0, 0, 0)",
          },
          text: {
            default: "#505050",
            hover: "#505050",
            active: "#161517",
            disabled: "#a0a0a0",
            "disabled-active": "#a0a0a0",
          },
          stroke: {
            default: "rgba(0, 0, 0, 0)",
            hover: "rgba(0, 0, 0, 0)",
            active: "rgba(0, 0, 0, 0)",
            disabled: "rgba(0, 0, 0, 0)",
            "disabled-active": "rgba(0, 0, 0, 0)",
            panel: "#e6e7e9",
          },
          panel: {
            stroke: {
              default: "#e6e7e9",
              borderless: "rgba(0, 0, 0, 0)",
            },
          },
        },
      },
      alignLeft: {
        size: {
          icon: {
            all: "0.9688rem",
          },
        },
        space: {
          x: "1rem",
          y: "0.3438rem",
          gap: "0.5rem",
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
            default: "rgba(0, 0, 0, 0)",
            hover: "#f6f7fa",
            active: "lch(95.274 1.5364 271.98)",
          },
          stroke: {
            default: "#e6e7e9",
            hover: "#e6e7e9",
            active: "#cccfd3",
          },
          text: {
            default: "#161517",
            hover: "#161517",
            active: "#161517",
          },
        },
      },
    },
    card: {
      secondary: {
        space: {
          all: "1rem",
          gap: "1rem",
          link: {
            gap: "0.5rem",
          },
        },
        radii: {
          all: "0.25rem",
        },
        icon: {
          size: {
            all: "2rem",
          },
        },
        stroke: "1px",
        color: {
          background: {
            default: "#ffffff",
            hover: "#f6f7fa",
            active: "lch(92.358 1.4894 271.98)",
            disabled: "#dfdfdf",
          },
          title: {
            default: "lch(11.126 1.374 305.43)",
            hover: "lch(11.126 1.374 305.43)",
            active: "lch(11.126 1.374 305.43)",
            disabled: "#a0a0a0",
          },
          description: {
            default: "#696e79",
            hover: "#696e79",
            active: "#696e79",
            disabled: "#a0a0a0",
          },
          link: {
            default: "#161517",
            hover: "#437eef",
            active: "#161517",
            disabled: "#a0a0a0",
          },
          stroke: {
            default: "#e6e7e9",
            hover: "#e6e7e9",
            active: "lch(87.029 1.0472 265.86)",
            disabled: "#dfdfdf",
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
              all: "2rem",
            },
            md: {
              all: "4rem",
            },
          },
        },
        space: {
          md: {
            y: "1.5rem",
            x: "1.5rem",
            gap: "0.75rem",
          },
          sm: {
            y: "1.5rem",
            x: "1.5rem",
            gap: "0.25rem",
          },
        },
        radii: {
          all: "0.25rem",
        },
        stroke: "1px",
        color: {
          background: {
            default: "#ffffff",
            hover: "#f6f7fa",
            active: "#ffffff",
            disabled: "#dfdfdf",
          },
          title: {
            default: "lch(11.126 1.374 305.43)",
            hover: "lch(11.126 1.374 305.43)",
            active: "lch(11.126 1.374 305.43)",
            disabled: "#a0a0a0",
          },
          description: {
            default: "#696e79",
            hover: "#696e79",
            active: "#696e79",
            disabled: "#a0a0a0",
          },
          stroke: {
            default: "#e6e7e9",
            hover: "#e6e7e9",
            active: "#151515",
            disabled: "#dfdfdf",
          },
        },
      },
      shadow:
        "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
      horizontal: {
        radii: {
          all: "0.25rem",
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
            all: "1.5rem",
          },
        },
        space: {
          md: {
            y: "0.75rem",
            x: "1rem",
            gap: "1rem",
          },
          sm: {
            y: "0.5rem",
            x: "0.75rem",
            gap: "0.75rem",
          },
        },
        default: {
          color: {
            background: {
              default: "#ffffff",
              hover: "#f6f7fa",
              active: "#ffffff",
              disabled: "#dfdfdf",
            },
            title: {
              default: "lch(11.126 1.374 305.43)",
              hover: "lch(11.126 1.374 305.43)",
              active: "lch(11.126 1.374 305.43)",
              disabled: "#a0a0a0",
            },
            description: {
              default: "#696e79",
              hover: "#696e79",
              active: "#696e79",
              disabled: "#a0a0a0",
            },
            stroke: {
              default: "#e6e7e9",
              hover: "#e6e7e9",
              active: "#151515",
              disabled: "#dfdfdf",
            },
          },
        },
        muted: {
          color: {
            background: {
              default: "#f6f7fa",
              hover: "#ffffff",
              active: "#f6f7fa",
              disabled: "#dfdfdf",
            },
            title: {
              default: "lch(11.126 1.374 305.43)",
              hover: "lch(11.126 1.374 305.43)",
              active: "lch(11.126 1.374 305.43)",
              disabled: "#a0a0a0",
            },
            description: {
              default: "#696e79",
              hover: "#696e79",
              active: "#696e79",
              disabled: "#a0a0a0",
            },
            stroke: {
              default: "#e6e7e9",
              hover: "#e6e7e9",
              active: "#151515",
              disabled: "#dfdfdf",
            },
          },
        },
      },
      promotion: {
        radii: {
          all: "0.25rem",
        },
        typography: {
          text: {
            default:
              '400 0.875rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
          },
        },
        space: {
          y: "5.5px",
          x: "0.75rem",
          gap: "0.75rem",
        },
        icon: {
          size: {
            all: "1rem",
          },
        },
        color: {
          background: {
            default: "#f6f7fa",
            hover: "#e6e7e9",
            active: "lch(89.777 1.0803 265.86)",
          },
          icon: {
            default: "#161517",
            hover: "#161517",
            active: "#161517",
          },
          stroke: {
            default: "linear-gradient(174deg, #ABABAB 7.59%, #D4D4D4 30.01%)",
            hover: "linear-gradient(174deg, #ABABAB 7.59%, #D4D4D4 30.01%)",
            active: "linear-gradient(174deg, #ABABAB 7.59%, #D4D4D4 30.01%)",
            focus: "#151515",
          },
          text: {
            default: "#161517",
            hover: "#161517",
            active: "#161517",
          },
        },
      },
    },
    checkbox: {
      radii: {
        all: "0.125rem",
      },
      space: {
        all: "1px",
        gap: "0.5rem",
      },
      size: {
        all: "1rem",
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
              default: "#f6f7fa",
              hover: "#f6f7fa",
              active: "#161517",
              disabled: "#dfdfdf",
            },
            stroke: {
              default: "#b3b6bd",
              hover: "#b3b6bd",
              active: "#161517",
              disabled: "#c0c0c0",
            },
            check: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
          var1: {
            background: {
              default: "#f6f7fa",
              hover: "#f6f7fa",
              active: "#00e513",
              disabled: "#dfdfdf",
            },
            stroke: {
              default: "#62de85",
              hover: "#62de85",
              active: "#62de85",
              disabled: "#c0c0c0",
            },
            check: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
          var2: {
            background: {
              default: "#f6f7fa",
              hover: "#f6f7fa",
              active: "#437eef",
              disabled: "#dfdfdf",
            },
            stroke: {
              default: "#6d9bf3",
              hover: "#6d9bf3",
              active: "#6d9bf3",
              disabled: "#c0c0c0",
            },
            check: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
          var3: {
            background: {
              default: "#f6f7fa",
              hover: "#f6f7fa",
              active: "#fb32c9",
              disabled: "#dfdfdf",
            },
            stroke: {
              default: "#fb64d6",
              hover: "#fb64d6",
              active: "#fb64d6",
              disabled: "#c0c0c0",
            },
            check: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
          var4: {
            background: {
              default: "#f6f7fa",
              hover: "#f6f7fa",
              active: "#ff7729",
              disabled: "#dfdfdf",
            },
            stroke: {
              default: "#ff9457",
              hover: "#ff9457",
              active: "#ff9457",
              disabled: "#c0c0c0",
            },
            check: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
          var5: {
            background: {
              default: "#f6f7fa",
              hover: "#f6f7fa",
              active: "#089b83",
              disabled: "#dfdfdf",
            },
            stroke: {
              default: "#089b83",
              hover: "#089b83",
              active: "#089b83",
              disabled: "#c0c0c0",
            },
            check: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
          var6: {
            background: {
              default: "#f6f7fa",
              hover: "#f6f7fa",
              active: "#bb33ff",
              disabled: "#dfdfdf",
            },
            stroke: {
              default: "#cc66ff",
              hover: "#bb33ff",
              active: "#bb33ff",
              disabled: "#c0c0c0",
            },
            check: {
              default: "#ffffff",
              hover: "#ffffff",
              active: "#ffffff",
              disabled: "#a0a0a0",
            },
          },
        },
        check: {
          default: "#ffffff",
          hover: "#ffffff",
          active: "#ffffff",
          disabled: "#a0a0a0",
        },
        background: {
          default: "#f6f7fa",
          hover: "#f6f7fa",
          active: "#161517",
          disabled: "#dfdfdf",
        },
        stroke: {
          default: "#b3b6bd",
          hover: "#b3b6bd",
          active: "#161517",
          disabled: "#c0c0c0",
        },
      },
    },
    codeblock: {
      space: {
        x: "1rem",
        y: "1rem",
        gap: "1.5rem",
      },
      radii: {
        all: "0.25rem",
      },
      stroke: "1px",
      typography: {
        text: {
          default:
            '500 0.875rem/1.7 "Inconsolata", Consolas, "SFMono Regular", monospace',
        },
      },
      numbers: {
        size: {
          width: "1.5rem",
        },
      },
      darkMode: {
        color: {
          background: {
            default: "#282828",
          },
          text: {
            default: "#ffffff",
          },
          numbers: {
            default: "#c0c0c0",
          },
          button: {
            background: {
              default: "#282828",
              hover: "#53575f",
            },
            foreground: {
              default: "#ffffff",
            },
          },
          stroke: {
            default: "#282828",
          },
        },
      },
      lightMode: {
        color: {
          background: {
            default: "#f6f7fa",
          },
          text: {
            default: "#282828",
          },
          numbers: {
            default: "#808080",
          },
          button: {
            background: {
              default: "#f6f7fa",
              hover: "#53575f",
            },
            foreground: {
              default: "#a0a0a0",
            },
          },
          stroke: {
            default: "#282828",
          },
        },
      },
      monacoTheme: {
        parameter: {
          foreground: "#53575f",
          background: "rgb(41.176% 43.137% 47.451% / 0.1)",
        },
      },
    },
    codeInline: {
      space: {
        x: "0.25rem",
      },
      stroke: "1px",
      typography: {
        text: {
          default:
            '500 0.875rem/1.7 "Inconsolata", Consolas, "SFMono Regular", monospace',
        },
      },
      radii: {
        all: "0.25rem",
      },
      color: {
        background: {
          default: "#f6f7fa",
        },
        text: {
          default: "#161517",
        },
        stroke: {
          default: "#e6e7e9",
        },
      },
    },
    container: {
      space: {
        none: "0",
        xxs: "0.25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        xxl: "4rem",
      },
      gap: {
        none: "0",
        xxs: "0.25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        xxl: "4rem",
      },
    },
    datePicker: {
      dateOption: {
        space: {
          gap: "2px",
        },
        radii: {
          default: "0.25rem",
          range: "0",
        },
        stroke: "1px",
        size: {
          height: "2rem",
          width: "2rem",
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
            default: "#161517",
            hover: "#161517",
            active: "#ffffff",
            disabled: "#a0a0a0",
            range: "#161517",
          },
          background: {
            default: "#ffffff",
            hover: "#ffffff",
            active: "#151515",
            disabled: "#ffffff",
            range: "#e6e7e9",
          },
          stroke: {
            default: "#ffffff",
            hover: "#151515",
            active: "#151515",
            disabled: "#ffffff",
            range: "#e6e7e9",
          },
        },
      },
      space: {
        gap: "0.25rem",
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
          default: "lch(11.126 1.374 305.43)",
        },
        daytitle: {
          default: "#696e79",
        },
      },
    },
    dialog: {
      space: {
        y: "1.5rem",
        x: "2rem",
        gap: "1rem",
      },
      title: {
        space: {
          gap: "0.25rem",
        },
      },
      radii: {
        all: "0.5rem",
      },
      shadow: {
        default:
          "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
      },
      stroke: {
        default: "1px solid #e6e7e9",
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
          default: "#ffffff",
        },
        title: {
          default: "lch(11.126 1.374 305.43)",
        },
        description: {
          default: "#696e79",
        },
        opaqueBackground: {
          default: "lch(6.7738 0 none / 0.75)",
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
          "field-value":
            '400 1rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      space: {
        x: "0.75rem",
        y: "0.2813rem",
        gap: "0.5rem",
      },
      size: {
        icon: "1rem",
      },
      radii: {
        all: "0.25rem",
      },
      mobile: {
        space: {
          x: "0.75rem",
          y: "0.5rem",
          gap: "0.5rem",
        },
      },
      color: {
        genericLabel: {
          default: "#161517",
          hover: "#161517",
          active: "#161517",
          disabled: "#a0a0a0",
        },
        background: {
          default: "#fbfcff",
          hover: "#f6f7fa",
          active: "#ffffff",
          disabled: "#dfdfdf",
          error: "#ffffff",
        },
        text: {
          default: "#302e32",
          hover: "#302e32",
          active: "#161517",
          disabled: "#a0a0a0",
          error: "#c10000",
        },
        stroke: {
          default: "#e6e7e9",
          hover: "#cccfd3",
          active: "#161517",
          disabled: "#dfdfdf",
          error: "#c10000",
        },
        label: {
          default: "#696e79",
          hover: "#696e79",
          active: "#161517",
          disabled: "#a0a0a0",
          error: "#c10000",
        },
        placeholder: {
          default: "#9a9ea7",
          disabled: "#b3b6bd",
        },
        format: {
          default: "lch(71.998 4.1843 268.48)",
          hover: "lch(71.998 4.1843 268.48)",
          active: "lch(71.998 4.1843 268.48)",
          disabled: "#a0a0a0",
          error: "lch(71.998 4.1843 268.48)",
        },
      },
    },
    fileUpload: {
      sm: {
        icon: {
          size: {
            height: "1.5rem",
            width: "1.5rem",
          },
        },
        space: {
          gap: "0.75rem",
          x: "1rem",
          y: "0.5rem",
        },
        radii: {
          all: "0.25rem",
        },
        color: {
          icon: {
            default: "#696e79",
          },
        },
      },
      md: {
        icon: {
          size: {
            height: "2rem",
            width: "2rem",
          },
        },
        space: {
          gap: "0.5rem",
          x: "1rem",
          y: "0.75rem",
        },
        radii: {
          all: "0.5rem",
        },
        color: {
          icon: {
            default: "#161517",
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
          gap: "0.75rem",
        },
        header: {
          space: {
            gap: "0.5rem",
          },
        },
      },
      transitions: {
        all: "all 100ms ease-in 0ms",
      },
      color: {
        background: {
          default: "#ffffff",
          hover: "#ffffff",
          active: "#f6f7fa",
          error: "rgb(100% 13.725% 13.725% / 0.1)",
        },
        stroke: {
          default: "#e6e7e9",
          hover: "#e6e7e9",
          active: "#b3b6bd",
          error: "rgba(0, 0, 0, 0)",
        },
        title: {
          default: "#161517",
          hover: "#161517",
          active: "#161517",
          error: "#c10000",
        },
        description: {
          default: "#696e79",
          hover: "#696e79",
          active: "#696e79",
          error: "#c10000",
        },
      },
    },
    flyout: {
      space: {
        default: {
          x: "0",
          y: "1.5rem",
          gap: "1rem",
          top: "0",
          content: {
            x: "1.5rem",
            y: "1.5rem",
            "row-gap": "0.25rem",
            "column-gap": "1rem",
          },
        },
        inline: {
          x: "0",
          y: "0.75rem",
          gap: "0.75rem",
          top: "3.5rem",
          content: {
            x: "0.75rem",
            y: "0.75rem",
            "row-gap": "0.25rem",
            "column-gap": "0.75rem",
          },
        },
      },
      shadow: {
        default: "-5px 0 20px 0 rgba(0, 0, 0, 0.08), -6px 0 10px 0 rgba(0, 0, 0, 0.08)",
        reverse: "5px 0 20px 0 rgba(0, 0, 0, 0.08), 6px 0 10px 0 rgba(0, 0, 0, 0.08)",
      },
      size: {
        default: {
          width: "27.5rem",
          height: "100%",
        },
        wide: {
          width: "37.5rem",
          height: "100vh",
        },
        narrow: {
          width: "21rem",
          height: "100%",
        },
        widest: {
          width: "55rem",
          height: "100vh",
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
          default: "#ffffff",
        },
        title: {
          default: "lch(11.126 1.374 305.43)",
        },
        description: {
          default: "#696e79",
        },
        stroke: {
          default: "#e6e7e9",
        },
      },
    },
    genericMenu: {
      item: {
        space: {
          x: "1rem",
          y: "0.3438rem",
          gap: "0.5rem",
        },
        icon: {
          size: {
            height: "0.9688rem",
            width: "0.9688rem",
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
        "two-lines": {
          space: {
            x: "1rem",
            y: "0.3438rem",
            gap: "0.75rem",
          },
        },
        size: {
          minWidth: "180px",
        },
        color: {
          default: {
            text: {
              default: "#161517",
              hover: "#161517",
              active: "#161517",
              disabled: "#a0a0a0",
              muted: "#696e79",
            },
            background: {
              default: "#ffffff",
              hover: "#f6f7fa",
              active: "#ffffff",
              disabled: "#ffffff",
            },
            stroke: {
              default: "#e6e7e9",
            },
          },
          format: {
            default: "lch(71.998 4.1843 268.48)",
            hover: "lch(71.998 4.1843 268.48)",
            active: "lch(71.998 4.1843 268.48)",
            disabled: "#a0a0a0",
          },
          subtext: {
            default: "#696e79",
            hover: "#696e79",
            active: "#696e79",
            disabled: "#c0c0c0",
          },
          danger: {
            text: {
              default: "#c10000",
              hover: "#c10000",
              active: "#c10000",
              disabled: "#a0a0a0",
            },
            background: {
              default: "#ffffff",
              hover: "rgb(100% 13.725% 13.725% / 0.2)",
              active: "rgb(100% 13.725% 13.725% / 0.3)",
              disabled: "#ffffff",
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
          gap: "0.25rem",
          y: "0.5rem",
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
            default: "#f6f7fa",
          },
          label: {
            default: "#696e79",
          },
          stroke: {
            default: "#e6e7e9",
          },
        },
      },
      panel: {
        radii: {
          all: "0.25rem",
        },
        shadow: {
          default:
            "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
        },
        size: {
          height: "2rem",
        },
        color: {
          background: {
            default: "#ffffff",
          },
          stroke: {
            default: "#e6e7e9",
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
            default: "2px solid #e6e7e9",
          },
        },
        color: {
          placeholder: {
            default: "#9a9ea7",
          },
          searchTerm: {
            default: "#161517",
          },
          background: {
            default: "#ffffff",
          },
          stroke: {
            default: "#e6e7e9",
          },
        },
      },
      sectionHeader: {
        space: {
          bottom: "0.3438rem",
          top: "0.5rem",
        },
      },
      placeholder: {
        space: {
          gap: "0.5rem",
        },
      },
    },
    grid: {
      header: {
        cell: {
          space: {
            y: "0.4375rem",
            x: "0.5rem",
          },
          size: {
            height: "2rem",
          },
          color: {
            background: {
              default: "#f6f7fa",
              selectIndirect: "lch(95.61 5.8361 264.18)",
              selectDirect: "#e7effd",
            },
            title: {
              default: "#696e79",
              selectIndirect: "#161517",
              selectDirect: "#161517",
            },
            stroke: {
              default: "lch(89.319 1.0747 265.86)",
              selectIndirect: "#e7effd",
              selectDirect: "lch(86.135 15.126 266.4)",
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
            y: "5.5px",
            x: "0.5rem",
          },
          size: {
            height: "2rem",
          },
          color: {
            background: {
              default: "#ffffff",
              selectIndirect: "lch(94.146 7.7815 264.18 / 0.2)",
              selectDirect: "lch(94.146 7.7815 264.18 / 0.2)",
            },
            stroke: {
              default: "#e6e7e9",
              selectIndirect: "#d0dffb",
              selectDirect: "#437eef",
            },
            text: {
              default: "lch(7.1704 1.4351 305.43)",
              selectIndirect: "#161517",
              selectDirect: "#161517",
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
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
      },
      global: {
        color: {
          stroke: {
            default: "#e6e7e9",
          },
          background: {
            default: "#ffffff",
          },
        },
      },
    },
    gridContainer: {
      gap: {
        none: "0",
        xxs: "0.25rem",
        xs: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        xxl: "4rem",
        unset: "''",
      },
    },
    icon: {
      space: {
        xs: {
          all: "0.25rem",
        },
        sm: {
          all: "0.25rem",
        },
        md: {
          all: "0.365rem",
        },
        lg: {
          all: "0.5rem",
        },
        xl: {
          all: "0.75rem",
        },
        xxl: {
          all: "1rem",
        },
      },
      color: {
        background: {
          default: "rgba(0, 0, 0, 0)",
          success: "rgb(20% 100% 26.667% / 0.1)",
          neutral: "rgb(41.176% 43.137% 47.451% / 0.1)",
          danger: "rgb(100% 13.725% 13.725% / 0.1)",
          info: "rgb(26.275% 49.412% 93.725% / 0.1)",
          warning: "rgb(100% 46.667% 16.078% / 0.1)",
        },
        text: {
          default: "rgba(0, 0, 0, 0)",
          success: "#008a0b",
          neutral: "#53575f",
          danger: "#c10000",
          info: "#437eef",
          warning: "#a33c00",
        },
        stroke: {
          default: "rgba(0, 0, 0, 0)",
          success: "rgb(20% 100% 26.667% / 0.05)",
          neutral: "rgb(41.176% 43.137% 47.451% / 0.1)",
          danger: "rgb(100% 13.725% 13.725% / 0.05)",
          info: "rgb(26.275% 49.412% 93.725% / 0.05)",
          warning: "rgb(100% 46.667% 16.078% / 0.05)",
        },
      },
    },
    image: {
      sm: {
        size: {
          height: "1rem",
          width: "1rem",
        },
      },
      xs: {
        size: {
          height: "0.75rem",
          width: "0.75rem",
        },
      },
      md: {
        size: {
          height: "1.25rem",
          width: "1.25rem",
        },
      },
      lg: {
        size: {
          height: "1.5rem",
          width: "1.5rem",
        },
      },
      xl: {
        size: {
          height: "2rem",
          width: "2rem",
        },
      },
      xxl: {
        size: {
          height: "4rem",
          width: "4rem",
        },
      },
      borderWidth: {
        default: "1.5px",
        thin: "1px",
      },
      color: {
        stroke: "#161517",
      },
    },
    link: {
      space: {
        md: {
          gap: "0.25rem",
        },
        sm: {
          gap: "2px",
        },
      },
      icon: {
        size: {
          sm: {
            height: "0.75rem",
            width: "0.75rem",
          },
          md: {
            height: "1rem",
            width: "1rem",
          },
        },
      },
    },
    panel: {
      strokeWidth: {
        default: "1px",
      },
      radii: {
        none: "0",
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
      },
      stroke: {
        default: "1px solid #e6e7e9",
      },
      shadow: {
        default:
          "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
      },
      space: {
        y: {
          none: "0",
          xs: "0.5rem",
          sm: "0.75rem",
          md: "1rem",
          lg: "1.5rem",
          xl: "2rem",
        },
        x: {
          none: "0",
          xs: "0.5rem",
          sm: "0.75rem",
          md: "1rem",
          lg: "1.5rem",
          xl: "2rem",
        },
        gap: {
          none: "0",
          xs: "0.5rem",
          sm: "0.75rem",
          md: "1rem",
          lg: "1.5rem",
          xl: "2rem",
        },
      },
      color: {
        background: {
          default: "#ffffff",
          muted: "#f6f7fa",
          transparent: "rgba(0, 0, 0, 0)",
        },
        stroke: {
          default: "#e6e7e9",
        },
      },
    },
    popover: {
      space: {
        y: "1rem",
        x: "1.5rem",
        gap: "0.75rem",
      },
      radii: {
        all: "0.25rem",
      },
      shadow: {
        default:
          "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
      },
      icon: {
        size: {
          height: "1.25rem",
          width: "1.25rem",
        },
      },
      color: {
        panel: {
          background: {
            default: "#ffffff",
          },
          stroke: {
            default: "#e6e7e9",
          },
        },
      },
    },
    radio: {
      radii: {
        all: "9999px",
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
          default: "#f6f7fa",
          hover: "#f6f7fa",
          active: "#161517",
          disabled: "#dfdfdf",
        },
        stroke: {
          default: "#b3b6bd",
          hover: "#b3b6bd",
          active: "#151515",
          disabled: "#c0c0c0",
        },
        indicator: {
          default: "#ffffff",
          hover: "#f6f7fa",
          active: "#ffffff",
          disabled: "#a0a0a0",
        },
      },
    },
    separator: {
      horizontal: {
        space: {
          y: {
            xs: "0",
            sm: "0.25rem",
            md: "0.5rem",
            ml: "0.75rem",
            lg: "1rem",
            xl: "1.5rem",
            xxl: "2rem",
          },
          x: {
            all: "0",
          },
        },
      },
      vertical: {
        space: {
          x: {
            xs: "0",
            sm: "0.25rem",
            md: "0.5rem",
            lg: "1rem",
            xl: "1.5rem",
            xxl: "2rem",
          },
          y: {
            all: "0",
          },
        },
      },
      color: {
        stroke: {
          default: "#e6e7e9",
        },
      },
    },
    sidebar: {
      navigation: {
        item: {
          radii: {
            all: "0.25rem",
          },
          default: {
            space: {
              right: "0.75rem",
              y: "0.2813rem",
              gap: "0.75rem",
              left: "0",
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
              left: "0",
              right: "0.75rem",
              y: "0.75rem",
              gap: "0.75rem",
            },
          },
          collapsible: {
            space: {
              left: "0",
              right: "0.75rem",
              y: "0.2813rem",
              gap: "0.75rem",
            },
          },
          icon: {
            size: {
              height: "1rem",
              width: "1rem",
            },
          },
          global: {
            gap: "2px",
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
              left: "2.75rem",
              right: "0.75rem",
              y: "0.2813rem",
            },
          },
          mobile: {
            space: {
              left: "2.75rem",
              right: "0.75rem",
              y: "0.75rem",
              gap: "0.75rem",
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
            all: "0.25rem",
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
              height: "0.125rem",
            },
          },
        },
      },
      main: {
        color: {
          background: {
            default: "#ffffff",
          },
          text: {
            default: "#161517",
            muted: "#696e79",
          },
          stroke: {
            default: "#e6e7e9",
          },
        },
        navigation: {
          item: {
            color: {
              background: {
                default: "rgba(0, 0, 0, 0)",
                hover: "lch(91.609 1.1023 265.86 / 0.6)",
                active: "#e6e7e9",
              },
              text: {
                default: "#161517",
                hover: "#161517",
                active: "#161517",
                muted: "#696e79",
                disabled: "#a0a0a0",
              },
              icon: {
                default: "#696e79",
                disabled: "#a0a0a0",
              },
            },
          },
          title: {
            color: {
              default: "#696e79",
              hover: "#696e79",
              active: "#696e79",
            },
          },
          subItem: {
            color: {
              text: {
                default: "#696e79",
                hover: "#161517",
                active: "#161517",
                disabled: "#a0a0a0",
              },
              background: {
                default: "rgba(0, 0, 0, 0)",
                hover: "lch(91.609 1.1023 265.86 / 0.6)",
                active: "rgba(0, 0, 0, 0)",
                disabled: "rgba(0, 0, 0, 0)",
              },
              icon: {
                default: "#696e79",
                disabled: "#a0a0a0",
              },
            },
          },
          dragControl: {
            separator: {
              color: {
                default: "#161517",
              },
            },
          },
        },
      },
      sqlSidebar: {
        navigation: {
          item: {
            color: {
              text: {
                disabled: "#a0a0a0",
                default: "#161517",
                hover: "#161517",
                active: "#161517",
                muted: "#696e79",
              },
              background: {
                default: "rgba(0, 0, 0, 0)",
                hover: "lch(91.609 1.1023 265.86 / 0.6)",
                active: "#e6e7e9",
              },
              icon: {
                default: "#696e79",
              },
            },
          },
          title: {
            color: {
              default: "#696e79",
              hover: "#696e79",
              active: "#696e79",
            },
          },
          subItem: {
            color: {
              text: {
                default: "#696e79",
                hover: "#161517",
                active: "#161517",
                disabled: "#a0a0a0",
              },
              background: {
                default: "rgba(0, 0, 0, 0)",
                hover: "lch(91.609 1.1023 265.86 / 0.6)",
                active: "rgba(0, 0, 0, 0)",
              },
            },
          },
          dragControl: {
            separator: {
              color: {
                default: "#161517",
              },
            },
          },
        },
        color: {
          background: {
            default: "#f6f7fa",
          },
          stroke: {
            default: "#e6e7e9",
          },
        },
      },
    },
    spacer: {
      horizontal: {
        space: {
          y: {
            xs: "0",
            sm: "0.25rem",
            md: "0.5rem",
            ml: "0.75rem",
            lg: "1rem",
            xl: "1.5rem",
            xxl: "2rem",
          },
          x: {
            all: "0",
          },
        },
      },
    },
    stepper: {
      vertical: {
        numbered: {
          connector: {
            size: {
              width: "0.1875rem",
            },
            stroke: {
              default: "2px",
            },
            color: {
              stroke: {
                incomplete: "#c0c0c0",
                complete: "#1f1f1c",
                active: "#c0c0c0",
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
              height: "1.5rem",
              width: "1.5rem",
              icon: {
                height: "0.75rem",
                width: "0.75rem",
              },
            },
            stroke: {
              default: "2px",
            },
            radii: {
              default: "9999px",
            },
            color: {
              stroke: {
                incomplete: "#c0c0c0",
                complete: "#1f1f1c",
                active: "#1f1f1c",
              },
              background: {
                incomplete: "#ffffff",
                complete: "#ffffff",
                active: "#1f1f1c",
              },
              icon: {
                incomplete: "#1f1f1c",
                complete: "#1f1f1c",
                active: "#ffffff",
              },
            },
          },
          content: {
            space: {
              gap: {
                x: "1rem",
                y: "0.5rem",
              },
              left: "2.75rem",
              bottom: {
                default: "2.5rem",
                active: "1.5rem",
              },
            },
          },
          color: {
            title: {
              incomplete: "#c0c0c0",
              complete: "#696e79",
              active: "#161517",
            },
          },
        },
        bulleted: {
          connector: {
            size: {
              width: "0.1875rem",
            },
            stroke: {
              default: "2px",
            },
            color: {
              stroke: {
                incomplete: "#c0c0c0",
                complete: "#1f1f1c",
                active: "#c0c0c0",
              },
            },
          },
          step: {
            size: {
              height: "1rem",
              width: "1rem",
              icon: {
                height: "0.75rem",
                width: "0.75rem",
              },
            },
            radii: {
              default: "9999px",
            },
            stroke: {
              default: "2px",
            },
            color: {
              stroke: {
                incomplete: "#c0c0c0",
                complete: "#1f1f1c",
                active: "#1f1f1c",
              },
              background: {
                incomplete: "#ffffff",
                complete: "#ffffff",
                active: "#ffffff",
              },
              icon: {
                incomplete: "#ffffff",
                complete: "#1f1f1c",
                active: "#ffffff",
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
                x: "1rem",
                y: "0.5rem",
              },
              left: "2.25rem",
              bottom: {
                default: "2.5rem",
                active: "1.5rem",
              },
            },
          },
          color: {
            title: {
              incomplete: "#c0c0c0",
              complete: "#696e79",
              active: "#161517",
            },
          },
        },
      },
    },
    switch: {
      space: {
        gap: "0.5rem",
      },
      radii: {
        all: "9999px",
      },
      size: {
        width: "2rem",
        height: "1rem",
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
          default: "#cccfd3",
          active: "#151515",
          disabled: "#dfdfdf",
        },
        stroke: {
          default: "#cccfd3",
          active: "#161517",
          disabled: "#dfdfdf",
        },
        indicator: {
          default: "#ffffff",
          active: "#ffffff",
          disabled: "#a0a0a0",
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
              y: "0.75rem",
              x: "1rem",
            },
            sm: {
              y: "0.5rem",
              x: "1rem",
            },
          },
        },
        color: {
          background: {
            default: "#f6f7fa",
            hover: "#f6f7fa",
            active: "#e7effd",
          },
          title: {
            default: "#161517",
          },
          icon: {
            default: "#161517",
          },
          checkbox: {
            background: {
              default: "#cccfd3",
            },
            border: {
              default: "#808691",
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
        stroke: "1px",
      },
      radii: {
        all: "0.25rem",
      },
      body: {
        cell: {
          space: {
            md: {
              y: "1rem",
              x: "1rem",
            },
            sm: {
              y: "0.5rem",
              x: "1rem",
            },
          },
        },
      },
      mobile: {
        cell: {
          space: {
            y: "1rem",
            x: "1rem",
            gap: "0.5rem",
          },
        },
      },
      row: {
        color: {
          background: {
            default: "#ffffff",
            hover: "lch(94.146 7.7815 264.18 / 0.2)",
            active: "lch(94.146 7.7815 264.18 / 0.2)",
          },
          stroke: {
            default: "#e6e7e9",
          },
          text: {
            default: "#161517",
            disabled: "#a0a0a0",
          },
          link: {
            default: "#437eef",
          },
          label: {
            default: "#696e79",
          },
          barChart: {
            default: "#dfdfdf",
            hover: "#c0c0c0",
          },
        },
      },
      global: {
        color: {
          stroke: {
            default: "#e6e7e9",
          },
          background: {
            default: "#ffffff",
          },
        },
      },
    },
    tabs: {
      space: {
        y: "0.5rem",
        x: "0.75rem",
      },
      radii: {
        all: "0.25rem",
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
          default: "1px",
          hover: "1px",
          active: "2px",
          global: "1px",
        },
        color: {
          background: {
            default: "rgba(0, 0, 0, 0)",
            hover: "#f6f7fa",
            active: "rgba(0, 0, 0, 0)",
          },
          text: {
            default: "#696e79",
            hover: "#161517",
            active: "#161517",
          },
          stroke: {
            default: "rgba(0, 0, 0, 0)",
            hover: "rgba(0, 0, 0, 0)",
            active: "#151515",
          },
          global: {
            default: "#e6e7e9",
          },
        },
      },
      fileTabs: {
        icon: {
          size: {
            height: "1rem",
            width: "1rem",
          },
        },
        space: {
          y: "1.0625rem",
          x: "1rem",
          gap: "0.75rem",
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
          all: "0",
        },
        color: {
          background: {
            default: "#f6f7fa",
            hover: "#ffffff",
            active: "#ffffff",
          },
          text: {
            default: "#696e79",
            hover: "#161517",
            active: "#161517",
          },
          stroke: {
            default: "#e6e7e9",
            hover: "#e6e7e9",
            active: "#e6e7e9",
          },
          closeButton: {
            background: {
              default: "rgba(0, 0, 0, 0)",
              hover: "#e6e7e9",
            },
          },
        },
      },
    },
    toast: {
      icon: {
        size: {
          height: "1rem",
          width: "1rem",
        },
      },
      space: {
        title: {
          gap: "0.5rem",
        },
        y: "0.75rem",
        x: "0.75rem",
        gap: "0.5rem",
      },
      radii: {
        all: "0.25rem",
      },
      shadow:
        "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
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
        width: "20.75rem",
      },
      color: {
        title: {
          default: "lch(11.126 1.374 305.43)",
        },
        description: {
          default: "#696e79",
        },
        stroke: {
          default: "#e6e7e9",
        },
        icon: {
          default: "lch(11.126 1.374 305.43)",
          success: "#008a0b",
          warning: "#a33c00",
          danger: "#c10000",
        },
      },
    },
    tooltip: {
      radii: {
        all: "0.25rem",
      },
      space: {
        x: "0.75rem",
        y: "0.5rem",
      },
      typography: {
        label: {
          default:
            '400 0.75rem/1.5 "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;',
        },
      },
      color: {
        background: {
          default: "lch(10.767 0 none / 0.85)",
        },
        label: {
          default: "#ffffff",
        },
      },
    },
    dashboards: {
      chartWidget: {
        space: {
          gap: "1rem",
          element: {
            gap: "0.5rem",
          },
        },
        borderWidth: {
          default: "1px",
        },
        stroke: {
          default: "1px solid #e6e7e9",
          element: {
            default: "1px solid #e6e7e9",
          },
          hover: "1px solid #b3b6bd",
          selected: "1px solid #151515",
        },
        element: {
          radii: {
            all: "0.25rem",
          },
        },
        radii: {
          all: "0.25rem",
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
          default: "0",
          hover:
            "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
        },
        size: {
          icon: {
            all: {
              drag: "1.25rem",
              menu: "1.5rem",
              resize: "0.75rem",
            },
          },
        },
        color: {
          background: {
            default: "#ffffff",
            hover: "#ffffff",
            selected: "#ffffff",
          },
          stroke: {
            default: "#e6e7e9",
            hover: "#b3b6bd",
            selected: "#151515",
          },
          title: {
            default: "lch(11.126 1.374 305.43)",
          },
          description: {
            default: "#696e79",
          },
          legend: {
            default: "#696e79",
            hover: "#696e79",
            selected: "#161517",
          },
          element: {
            stroke: {
              default: "#e6e7e9",
            },
          },
          icon: {
            default: "#161517",
            hover: "#161517",
            selected: "#151515",
          },
          opacity: {
            bar: {
              default: 0.2,
              hover: 0.5,
            },
          },
          label: {
            default: "#696e79",
            hover: "#696e79",
            selected: "#696e79",
          },
        },
      },
    },
    global: {
      color: {
        stroke: {
          default: "#e6e7e9",
          muted: "lch(91.609 1.1023 265.86)",
          intense: "#b3b6bd",
        },
        accent: {
          default: "#151515",
        },
        background: {
          default: "#ffffff",
          muted: "#f6f7fa",
        },
        text: {
          default: "#161517",
          muted: "#696e79",
          disabled: "#a0a0a0",
          link: {
            default: "#437eef",
            hover: "#104ec6",
          },
          danger: "#c10000",
        },
        title: {
          default: "lch(11.126 1.374 305.43)",
          muted: "#696e79",
        },
        outline: {
          default: "#437eef",
        },
        shadow: {
          default: "lch(6.7738 0 none / 0.15)",
        },
      },
    },
    feedback: {
      color: {
        info: {
          background: "rgb(26.275% 49.412% 93.725% / 0.1)",
          foreground: "#437eef",
        },
        success: {
          background: "rgb(20% 100% 26.667% / 0.1)",
          foreground: "#008a0b",
        },
        warning: {
          background: "rgb(100% 46.667% 16.078% / 0.1)",
          foreground: "#a33c00",
        },
        danger: {
          background: "rgb(100% 13.725% 13.725% / 0.1)",
          foreground: "#c10000",
        },
        neutral: {
          background: "rgb(41.176% 43.137% 47.451% / 0.1)",
          foreground: "#53575f",
          stroke: "#e6e7e9",
        },
      },
    },
    storybook: {
      global: {
        background: "#ffffff",
      },
    },
    chart: {
      color: {
        default: {
          blue: "#437eef",
          orange: "#ff7729",
          green: "#00e513",
          fuchsia: "#fb32c9",
          yellow: "#eef400",
          violet: "#bb33ff",
          babyblue: "#00cbeb",
          red: "#ff2323",
          teal: "#089b83",
          sunrise: "#ffc300",
          slate: "#9a9ea7",
        },
        label: {
          default: "#161517",
          deselected: "lch(6.9377 1.4387 305.43 / 0.3)",
        },
      },
      bars: {
        color: {
          blue: "#437eef",
          orange: "#ff7729",
          green: "#00e513",
          fuchsia: "#fb32c9",
          yellow: "#eef400",
          violet: "#bb33ff",
          babyblue: "#00cbeb",
          red: "#ff2323",
          teal: "#089b83",
          sunrise: "#ffc300",
          slate: "#9a9ea7",
        },
      },
    },
    serviceCard: {
      color: {
        background: {
          default: "#fbfcff",
          hover: "#fbfcff",
        },
        stroke: {
          default: "#e6e7e9",
          hover: "#cccfd3",
        },
      },
    },
    gareth: {
      test: {
        main: {
          text: "#161517",
          danger: "#c10000",
        },
      },
    },
  },
  transition: {
    default: "all 100ms ease-in 0ms",
    duration: {
      slow: "300ms",
      smooth: "150ms",
      medium: "100ms",
      fast: "50ms",
    },
    delay: {
      slow: "100ms",
      fast: "0ms",
    },
    function: {
      ease: "ease",
      "ease-in": "ease-in",
      "ease-in-out": "ease-in-out",
      linear: "linear",
    },
  },
  grid: {
    header: {
      cell: {
        borderWidth: {
          default: "1px",
          selectIndirect: "1px",
          selectDirect: "1px",
        },
      },
    },
    body: {
      cell: {
        borderWidth: {
          default: "1px",
          selectIndirect: "1px",
          selectDirect: "2px",
        },
      },
    },
  },
  palette: {
    brand: {
      "50": "#ffffe8",
      "100": "#feffc2",
      "200": "#fdffa3",
      "300": "#faff69",
      "400": "#eef400",
      "500": "#c7cc00",
      "600": "#959900",
      "700": "#686b00",
      "800": "#3c4601",
      "900": "#333300",
      base: "#fbff46",
    },
    neutral: {
      "0": "#ffffff",
      "100": "#f9f9f9",
      "200": "#dfdfdf",
      "300": "#c0c0c0",
      "400": "#a0a0a0",
      "500": "#808080",
      "600": "#606060",
      "650": "#505050",
      "700": "#414141",
      "712": "#323232",
      "725": "#282828",
      "750": "#1f1f1c",
      "800": "#1d1d1d",
      "900": "#151515",
      base: "#212121",
    },
    slate: {
      "25": "#fbfcff",
      "50": "#f6f7fa",
      "100": "#e6e7e9",
      "200": "#cccfd3",
      "300": "#b3b6bd",
      "400": "#9a9ea7",
      "500": "#808691",
      "600": "#696e79",
      "700": "#53575f",
      "800": "#302e32",
      "900": "#161517",
      base: "#373439",
      "50a": "lch(49.809 30.506 276.77 / 0.06)",
    },
    indigo: {
      "50": "#f4f1fc",
      "100": "#e4e2e9",
      "200": "#c8c5d3",
      "300": "#ada8bd",
      "400": "#918ba7",
      "500": "#766e91",
      "600": "#5e5874",
      "700": "#474257",
      "800": "#23212c",
      "900": "#18161d",
      base: "#2f2c3a",
    },
    info: {
      "50": "#e7effd",
      "100": "#d0dffb",
      "200": "#a1bef7",
      "300": "#6d9bf3",
      "400": "#437eef",
      "500": "#1d64ec",
      "600": "#104ec6",
      "650": "#0d3e9b",
      "700": "#0d3e9b",
      "800": "#092b6c",
      "900": "#061c47",
      base: "#4781f0",
    },
    success: {
      "50": "#e5ffe8",
      "100": "#ccffd0",
      "200": "#99ffa1",
      "300": "#66ff73",
      "400": "#33ff44",
      "500": "#00e513",
      "600": "#00bd10",
      "700": "#008a0b",
      "800": "#006108",
      "850": "#004206",
      "900": "#004206",
      base: "#62de85",
    },
    warning: {
      "50": "#ffe2d1",
      "100": "#ffcbad",
      "200": "#ffb88f",
      "300": "#ff9457",
      "400": "#ff7729",
      "500": "#f55a00",
      "600": "#d64f00",
      "700": "#a33c00",
      "800": "#7a2d00",
      "900": "#471a00",
      base: "#ffa63d",
    },
    danger: {
      "50": "#ffdddd",
      "100": "#ffbaba",
      "200": "#ff9898",
      "300": "#ff7575",
      "400": "#ff2323",
      "500": "#f10000",
      "600": "#c10000",
      "700": "#910000",
      "800": "#610000",
      "900": "#300000",
      base: "#ff5353",
    },
    gradients: {
      base: "linear-gradient(229.65deg, #292924 15.78%, #0F0F0F 88.39%)",
      yellowToblack: "linear-gradient(132deg, #FAFF69 8%, #292929 30%);",
      whiteToblack: "linear-gradient(132deg, #FFFFFF 8%, #292929 30%);",
      transparent: "rgba(0, 0, 0, 0)",
    },
    utility: {
      transparent: "rgba(0, 0, 0, 0)",
    },
    teal: {
      "50": "#e6fefa",
      "100": "#cffcf4",
      "200": "#a3faec",
      "300": "#6df8e1",
      "400": "#0cedc8",
      "500": "#0bd0af",
      "600": "#089b83",
      "700": "#067462",
      "800": "#045245",
      "850": "#004237",
      "900": "#03352d",
    },
    violet: {
      "50": "#f6e5ff",
      "100": "#eeccff",
      "200": "#dd99ff",
      "300": "#cc66ff",
      "400": "#bb33ff",
      "500": "#aa00ff",
      "600": "#8800cc",
      "700": "#660099",
      "800": "#440066",
      "850": "#33004d",
      "900": "#220033",
    },
    fuchsia: {
      "50": "#fbeff8",
      "100": "#fbc9ef",
      "200": "#fb97e2",
      "300": "#fb64d6",
      "400": "#fb32c9",
      "500": "#fb00bc",
      "600": "#cc0099",
      "700": "#990073",
      "800": "#66004d",
      "850": "#4d0039",
      "900": "#330026",
    },
    sunrise: {
      "50": "#fff3cc",
      "100": "#ffe799",
      "200": "#ffdb66",
      "300": "#ffcf33",
      "400": "#ffc300",
      "500": "#e0ac00",
      "600": "#b28800",
      "700": "#8a6900",
      "800": "#574200",
      "900": "#332700",
    },
    babyblue: {
      "50": "#dbfaff",
      "100": "#bdf6ff",
      "200": "#8aefff",
      "300": "#33e4ff",
      "400": "#00cbeb",
      "500": "#00b5d1",
      "600": "#008599",
      "700": "#006170",
      "800": "#00424d",
      "900": "#002c33",
    },
  },
  sizes: {
    "0": "0",
    "1": "1px",
    "2": "0.25rem",
    "3": "0.5rem",
    "4": "0.75rem",
    "5": "1rem",
    "6": "1.25rem",
    "7": "1.5rem",
    "8": "1.75rem",
    "9": "2rem",
    "10": "2.5rem",
    "11": "4rem",
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
        "1": "400",
        "2": "500",
        "3": "600",
        "4": "700",
      },
      sizes: {
        "0": "0.625rem",
        "1": "0.75rem",
        "2": "0.875rem",
        "3": "1rem",
        "4": "1.125rem",
        "5": "1.25rem",
        "6": "2rem",
        base: "16px",
      },
      "line-height": {
        "1": 1.5,
        "2": 1.6,
        "3": 1.7,
        "4": 1.3,
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
          "2xl":
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
          "2xl":
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
      "0": "0",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "0.75rem",
      full: "9999px",
    },
    width: {
      "1": "1px",
      "2": "2px",
    },
  },
  spaces: {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.5rem",
    "6": "2rem",
    "7": "2.5rem",
    "8": "4rem",
  },
  shadow: {
    "1": "0 4px 6px -1px lch(6.7738 0 none / 0.15), 0 2px 4px -1px lch(6.7738 0 none / 0.15)",
    "2": "0 4px 4px 0 rgba(88, 92, 98, 0.06), inset 5px 0 10px 0 rgba(104, 105, 111, 0.1)",
    "3": "-5px 0 20px 0 rgba(0, 0, 0, 0.08), -6px 0 10px 0 rgba(0, 0, 0, 0.08)",
    "4": "5px 0 20px 0 rgba(0, 0, 0, 0.08), 6px 0 10px 0 rgba(0, 0, 0, 0.08)",
    "5": "0 2px 2px 0 rgba(0, 0, 0, 0.03)",
  },
  breakpoint: {
    sizes: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  global: {
    color: {
      gradients: {
        yellowToBlack: "linear-gradient(132deg, #faff69 8%, #292929 30%)",
        whiteToBlack: "linear-gradient(132deg, #ffffff 8%, #292929 30%)",
      },
      background: {
        default: "#ffffff",
        muted: "#f6f7fa",
        sidebar: "#ffffff",
        split: "#f6f7fa",
        muted_a: "lch(49.809 30.506 276.77 / 0.06)",
      },
      stroke: {
        default: "#e6e7e9",
        muted: "#e6e7e9",
        intense: "#b3b6bd",
        split: "#e6e7e9",
      },
      accent: {
        default: "#151515",
      },
      text: {
        default: "#161517",
        muted: "#696e79",
        disabled: "#a0a0a0",
        link: {
          default: "#437eef",
          hover: "#104ec6",
        },
      },
      outline: {
        default: "#437eef",
      },
      shadow: {
        default: "lch(6.7738 0 none / 0.15)",
      },
      feedback: {
        info: {
          background: "#e7effd",
          foreground: "#437eef",
        },
        success: {
          background: "#e5ffe8",
          foreground: "#008a0b",
        },
        warning: {
          background: "#ffe2d1",
          foreground: "#a33c00",
        },
        danger: {
          background: "#ffdddd",
          foreground: "#c10000",
        },
        neutral: {
          background: "#f6f7fa",
          foreground: "#53575f",
          stroke: "#e6e7e9",
        },
      },
      chart: {
        default: {
          blue: "#437eef",
          orange: "#ff7729",
          green: "#00e513",
          fuchsia: "#fb32c9",
          yellow: "#eef400",
          violet: "#bb33ff",
          babyblue: "#00cbeb",
          red: "#ff2323",
          danger: "#ff2323",
          teal: "#089b83",
          sunrise: "#ffc300",
          slate: "#9a9ea7",
        },
        bars: {
          blue: "#437eef",
          orange: "#ff7729",
          green: "#00e513",
          fuchsia: "#fb32c9",
          yellow: "#eef400",
          violet: "#bb33ff",
          babyblue: "#00cbeb",
          red: "#ff2323",
          teal: "#089b83",
          sunrise: "#ffc300",
          slate: "#9a9ea7",
        },
        label: {
          default: "#161517",
          deselected: "lch(6.9377 1.4387 305.43 / 0.3)",
        },
      },
      iconButton: {
        badge: {
          foreground: "#437eef",
          background: "#e7effd",
        },
      },
      icon: {
        background: "linear-gradient(132deg, #FFFFFF 8%, #292929 30%);",
      },
    },
  },
  name: "light",
};

export default theme;
