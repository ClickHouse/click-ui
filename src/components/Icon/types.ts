import { SVGAttributes } from "react";

export type IconName = "profile" | "users";

export interface SvgIconProps extends IconProps {
  name: IconName;
  color: "string";
}

export interface IconProps extends SVGAttributes<HTMLOrSVGElement> {
  color: "string";
}
