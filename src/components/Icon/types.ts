import { SVGAttributes } from "react";
import { LogoProps } from "../Logos/Logo";
import { FlagName, FlagProps } from "../icons/Flags";
import { LogoName } from "../Logos/types";
import { PaymentName, PaymentProps } from "../icons/Payments";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export type IconName =
  | "activity"
  | "arrow-down"
  | "arrow-right"
  | "arrow-triangle"
  | "arrow-directions"
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
  | "dots-triangle"
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
  | "key"
  | "keys"
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
  | "play-in-circle"
  | "plus"
  | "popout"
  | "query"
  | "question"
  | "refresh"
  | "search"
  | "secure"
  | "services"
  | "settings"
  | "share"
  | "share-arrow"
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
  | "warning"
  | "waves";

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

export type ImageName = IconName | LogoName | FlagName | PaymentName;
export type ImageType = (
  | (Omit<IconProps, "name"> & NoThemeType)
  | (Omit<LogoProps, "name"> & NoColorType)
  | (Omit<FlagProps, "name"> & NoThemeType & NoColorType)
  | (Omit<PaymentProps, "name"> & NoThemeType & NoColorType)
) & {
  name: ImageName;
};
