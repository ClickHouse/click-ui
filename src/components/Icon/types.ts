import { SVGAttributes } from "react";

export type IconSize = "small" | "medium" | "large";
export type IconName =
  | "arrow-down"
  | "chat"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "database"
  | "filter"
  | "history"
  | "info"
  | "user"
  | "users";

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  name: IconName;
  color?: string;
  size?: IconSize;
}
