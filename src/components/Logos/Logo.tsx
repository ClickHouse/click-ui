import { SVGAttributes } from "react";
import { useTheme } from "styled-components";
import LogosLight from "./LogosLight";
import LogosDark from "./LogosDark";
import { IconSize } from "@/components/Icon/types";
import { LogoName } from "./types";
import { IconSvgElement } from "../commonElement";

export interface LogoProps extends SVGAttributes<SVGElement> {
  name: LogoName;
  theme?: "light" | "dark";
  size?: IconSize;
}

const Logo = ({ name, theme, size, ...props }: LogoProps) => {
  const { name: themeName } = useTheme();
  const Component = ["light", "clasic"].includes(theme ?? themeName)
    ? LogosLight[name]
    : LogosDark[name];

  if (!Component) {
    return null;
  }

  return (
    <IconSvgElement
      as={Component}
      $size={size}
      {...props}
    />
  );
};

Logo.displayName = "Logo";

export { Logo };
