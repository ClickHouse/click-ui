import { SVGAttributes } from "react";

export type IconName =
  | "chat"
  | "chevron-down"
  | "chevron-right"
  | "database"
  | "filter"
  | "history"
  | "user"
  | "users";

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  name: IconName;
  color?: string;
}
