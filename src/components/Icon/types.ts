import { SVGAttributes } from "react";
import { LogoProps } from "../Logos/Logo";
import { FlagProps } from "../icons/Flags";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type IconName =
  | "activity"
  | "arrow-down"
  | "arrow-right"
  | "arrow-triangle"
  | "arrow-up"
  | "auth-app"
  | "auth-sms"
  | "backups"
  | "blog"
  | "book"
  | "brackets"
  | "briefcase"
  | "building"
  | "burger-menu"
  | "cards"
  | "cell-tower"
  | "chat"
  | "check"
  | "check-in-circle"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "clock"
  | "cloud"
  | "code"
  | "code-in-square"
  | "connect"
  | "connect-alt"
  | "console"
  | "copy"
  | "cross"
  | "data"
  | "database"
  | "disk"
  | "display"
  | "document"
  | "dots-horizontal"
  | "dots-vertical"
  | "download"
  | "download-in-circle"
  | "email"
  | "empty"
  | "eye"
  | "eye-closed"
  | "filter"
  | "fire"
  | "folder-closed"
  | "folder-open"
  | "gift"
  | "history"
  | "home"
  | "http"
  | "info-in-circle"
  | "information"
  | "insert-row"
  | "integrations"
  | "light-bulb"
  | "lightening"
  | "loading"
  | "loading-animated"
  | "metrics"
  | "metrics-alt"
  | "payment"
  | "pencil"
  | "pie-chart"
  | "play"
  | "plus"
  | "popout"
  | "question"
  | "refresh"
  | "search"
  | "secure"
  | "services"
  | "settings"
  | "share"
  | "slide-in"
  | "slide-out"
  | "sort-alt"
  | "sort"
  | "sparkle"
  | "speaker"
  | "speed"
  | "star"
  | "support"
  | "table"
  | "taxi"
  | "trash"
  | "upload"
  | "url"
  | "user"
  | "users"
  | "warning";

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  name: IconName;
  color?: string;
  size?: IconSize;
}

type NoThemeType = {
  theme?: never;
};

type NoColorType = {
  color?: never;
};

export type ImageType =
  | (IconProps & NoThemeType)
  | (LogoProps & NoColorType)
  | (FlagProps & NoThemeType & NoColorType & { size?: never });
