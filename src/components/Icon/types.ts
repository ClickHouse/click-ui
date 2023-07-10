import { SVGAttributes } from "react";

export type IconSize = "small" | "medium" | "large";
export type IconName =
  | "arrow-down"
  | "chat"
  | "check"
  | "chevron-down"
  | "chevron-up"
  | "chevron-right"
  | "cross"
  | "database"
  | "filter"
  | "history"
  | "info-in-circle"
  | "information"
  | "user"
  | "sort"
  | "users"
  | "warning";

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  name: IconName;
  color?: string;
  size?: IconSize;
}
