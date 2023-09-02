import { ElementType, ReactElement, SVGAttributes } from "react";
import styled, { useTheme } from "styled-components";
import LogosLight from "./LogosLight";
import LogosDark from "./LogosDark";
import { IconSize } from "@/components/Icon/types";
import { LogoName } from "./types";

export interface LogoProps extends SVGAttributes<HTMLOrSVGElement> {
  name: LogoName;
  theme?: "light" | "dark";
  size?: IconSize;
}

const SVGLogo = ({ name, theme, ...delegated }: LogoProps) => {
  const { name: themeName } = useTheme();
  const Component = ["light", "clasic"].includes(theme ?? themeName)
    ? LogosLight[name]
    : LogosDark[name];

  if (!Component) {
    return null;
  }

  return <Component {...delegated} />;
};

const withStylesWrapper =
  (LogoComponent: ElementType) =>
  ({ width, height, className, size, ...props }: LogoProps): ReactElement =>
    (
      <SvgWrapper
        $width={width}
        $height={height}
        $size={size}
        className={className}
      >
        <LogoComponent {...props} />
      </SvgWrapper>
    );

const SvgWrapper = styled.div<{
  $width?: number | string;
  $height?: number | string;
  $size?: IconSize;
}>`
  display: flex;
  align-items: center;

  ${({ theme, $width, $height, $size }) => `
    & svg {
      width: ${$width || theme.click.image[$size || "md"].size.width || "24px"};
      height: ${$height || theme.click.image[$size || "md"].size.height || "24px"};
    }
  `}
`;

const Logo = withStylesWrapper(SVGLogo);
const LogoToExport = styled(Logo)``;

LogoToExport.displayName = "Logo";

export { LogoToExport as Logo };
