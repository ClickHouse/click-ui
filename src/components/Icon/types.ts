import { SVGAttributes } from "react";
import { LogoProps } from "../Logos/Logo";
import { FlagName, FlagProps } from "../icons/Flags";
import { LogoName } from "../Logos/types";
import { PaymentName, PaymentProps } from "../icons/Payments";

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
  "key",
  "keys",
  "lifebuoy",
  "light-bulb",
  "lightening",
  "line-in-circle",
  "loading",
  "loading-animated",
  "lock",
  "metrics",
  "metrics-alt",
  "minus",
  "no-cloud",
  "pause",
  "payment",
  "pencil",
  "pie-chart",
  "pipe",
  "play",
  "play-in-circle",
  "plus",
  "popout",
  "puzzle-piece",
  "query",
  "question",
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
  "trash",
  "tree-structure",
  "upload",
  "url",
  "user",
  "users",
  "warning",
  "waves",
] as const;
export type IconName = (typeof ICON_NAMES)[number];

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  name: IconName;
  color?: string;
  size?: IconSize;
  state?: IconState;
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
