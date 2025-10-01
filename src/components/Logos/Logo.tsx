import { SVGAttributes } from "react";
import LogosLight from "./LogosLight";
import LogosDark from "./LogosDark";
import { IconSize } from "@/components/Icon/types";
import { LogoName } from "./types";
import { SvgImageElement } from "@/components/commonElement";
import { useCUITheme } from "@/theme/ClickUIProvider";

export interface LogoProps extends SVGAttributes<SVGElement> {
  name: LogoName;
  theme?: "light" | "dark";
  size?: IconSize;
}

const Logo = ({ name, theme: themeOverride, size, ...props }: LogoProps) => {
  const { themeName } = useCUITheme();

  // Use theme override if provided, otherwise use context theme
  const theme = themeOverride ?? (themeName === "dark" ? "dark" : "light");

  const Component = ["light", "classic"].includes(theme)
    ? LogosLight[name]
    : LogosDark[name];

  if (!Component) {
    return null;
  }

  return (
    <SvgImageElement
      size={size}
      role="img"
      aria-label={name}
    >
      <Component {...props} />
    </SvgImageElement>
  );
};

Logo.displayName = "Logo";

export { Logo };
