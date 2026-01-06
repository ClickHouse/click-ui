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

const Logo = ({
  name,
  theme: themeOverride,
  size = "md",
  className,
  ...props
}: LogoProps) => {
  const { resolvedTheme } = useCUITheme();

  // Resolve theme: use override if provided, otherwise use context theme
  const theme = themeOverride ?? resolvedTheme;
  const logoVariant = theme === "dark" ? "dark" : "light";

  const Component = logoVariant === "light" ? LogosLight[name] : LogosDark[name];

  if (!Component) {
    return null;
  }

  const style = themeOverride ? { colorScheme: theme } : undefined;

  const { width, height, ...rest } = props;
  const svgProps = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    ...rest,
  };
  return (
    <SvgImageElement
      as={Component}
      size={width || height ? undefined : size}
      className={className}
      style={style}
      role="img"
      aria-label={name}
      {...svgProps}
    />
  );
};

Logo.displayName = "Logo";

export { Logo };
