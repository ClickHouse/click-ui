import { SVGAttributes } from "react";
import { LogoProps } from "../Logos/Logo";
import { FlagName, FlagProps } from "../icons/Flags";
import { LogoName } from "../Logos/types";
import { PaymentName, PaymentProps } from "../icons/Payments";
import { CSSPropertiesWithVars } from "../types";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type IconState = "default" | "success" | "warning" | "danger" | "info";

export const ICON_NAMES = [
  "activity",
  "alarm",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-triangle",
  "arrow-directions",
  "arrow-up",
  "auth-app",
  "auth-sms",
  "backups",
  "bar-chart",
  "bell",
  "beta",
  "blog",
  "bold",
  "book",
  "brackets",
  "briefcase",
  "building",
  "burger-menu",
  "calendar",
  "calendar-with-time",
  "cards",
  "cell-tower",
  "chat",
  "chart-area",
  "chart-bar-horizontal",
  "chart-donut",
  "chart-heatmap",
  "chart-scatter",
  "chart-stacked-horizontal",
  "chart-stacked-vertical",
  "check",
  "check-in-circle",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "circle",
  "clock",
  "cloud",
  "cloud-keys",
  "code",
  "code-in-square",
  "connect",
  "connect-alt",
  "console",
  "copy",
  "cpu",
  "cross",
  "credit-card",
  "data",
  "database",
  "data-lakes",
  "disk",
  "display",
  "document",
  "dot",
  "dots-horizontal",
  "dots-triangle",
  "dots-vertical",
  "dots-vertical-double",
  "double-check",
  "download",
  "download-in-circle",
  "email",
  "empty",
  "enter",
  "eye",
  "eye-closed",
  "filter",
  "fire",
  "flag",
  "flash",
  "flask",
  "folder-closed",
  "folder-open",
  "gear",
  "gift",
  "git-merge",
  "globe",
  "hexagon",
  "history",
  "horizontal-loading",
  "home",
  "http",
  "http-monitoring",
  "info-in-circle",
  "information",
  "insert-row",
  "integrations",
  "italic",
  "key",
  "keys",
  "lifebuoy",
  "light-bulb",
  "light-bulb-on",
  "lightening",
  "line-in-circle",
  "list-bulleted",
  "list-numbered",
  "loading",
  "loading-animated",
  "lock",
  "map-pin",
  "metrics",
  "metrics-alt",
  "minus",
  "mcp",
  "moon",
  "no-cloud",
  "pause",
  "payment",
  "pencil",
  "pie-chart",
  "pipe",
  "play",
  "play-in-circle",
  "plug",
  "plus",
  "popout",
  "puzzle-piece",
  "query",
  "question",
  "resize-arrows-horizontal",
  "resize-arrows-vertical",
  "refresh",
  "rocket",
  "sandglass",
  "search",
  "secure",
  "server",
  "services",
  "settings",
  "share",
  "share-arrow",
  "share-network",
  "sleep",
  "slide-in",
  "slide-out",
  "sort-alt",
  "sort",
  "sparkle",
  "speaker",
  "speed",
  "square",
  "star",
  "stop",
  "support",
  "table",
  "taxi",
  "text-slash",
  "thumbs-up",
  "thumbs-down",
  "trash",
  "tree-structure",
  "upgrade",
  "upload",
  "url",
  "user",
  "users",
  "underline",
  "warning",
  "waves",
] as const;
export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  /** The name of the icon to display */
  name: IconName;
  /** The color of the icon */
  color?: string;
  /** The size of the icon */
  size?: IconSize;
  /** The visual state of the icon */
  state?: IconState;
  style?: CSSPropertiesWithVars;
}

type NoThemeType = {
  theme?: never;
};

type NoColorType = {
  color?: never;
};

export type ImageName = IconName | LogoName | FlagName | PaymentName;
export type ImageType = (
  | (Omit<IconProps, "name"> & NoThemeType)
  | (Omit<LogoProps, "name"> & NoColorType)
  | (Omit<FlagProps, "name"> & NoThemeType & NoColorType)
  | (Omit<PaymentProps, "name"> & NoThemeType & NoColorType)
) & {
  name: ImageName;
};
