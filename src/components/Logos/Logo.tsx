import { SVGAttributes } from "react";
import { useTheme } from "styled-components";
import LogosLight from "./LogosLight";
import LogosDark from "./LogosDark";
import { IconSize } from "@/components/Icon/types";
import { LogoName } from "./types";
import { SvgImageElement } from "../commonElement";

export interface LogoProps extends SVGAttributes<SVGElement> {
  /** The name of the logo to display */
  name: LogoName;
  /** The theme variant of the logo */
  theme?: "light" | "dark";
  /** The size of the logo */
  size?: IconSize;
}

const Logo = ({ name, theme, size, ...props }: LogoProps) => {
  const { name: themeName } = useTheme();
  const Component = (theme ?? themeName) === "light" ? LogosLight[name] : LogosDark[name];

  if (!Component) {
    return null;
  }

  return (
    <SvgImageElement
      as={Component}
      $size={size}
      role="img"
      aria-label={name}
      {...props}
    />
  );
};

Logo.displayName = "Logo";

export { Logo };
