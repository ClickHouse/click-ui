import { ElementType, ReactElement } from "react";
import styled from "styled-components";
import { IconProps, IconSize } from "./types";
import { ICONS_MAP } from "@/components/Icon/IconCommon";

const SVGIcon = ({ name, ...delegated }: IconProps) => {
  const Component = ICONS_MAP[name];

  if (!Component) {
    return null;
  }

  return <Component {...delegated} />;
};

const withStylesWrapper =
  (IconComponent: ElementType) =>
  ({ color, width, height, className, size, ...props }: IconProps): ReactElement =>
    (
      <SvgWrapper
        $color={color}
        $width={width}
        $height={height}
        $size={size}
        className={className}
      >
        <IconComponent {...props} />
      </SvgWrapper>
    );

const SvgWrapper = styled.div<{
  $color?: string;
  $width?: number | string;
  $height?: number | string;
  $size?: IconSize;
}>`
  display: flex;
  align-items: center;

  ${({ theme, $color = "currentColor", $width, $height, $size }) => `
    & path[stroke], & svg[stroke]:not([stroke="none"]), & rect[stroke] {
      stroke: ${$color};
    }

    & path[fill], & svg[fill]:not([fill="none"]), & rect[fill] {
      fill: ${$color};
    }

    & svg {
      width: ${$width || theme.click.image[$size || "md"].size.width || "24px"};
      height: ${$height || theme.click.image[$size || "md"].size.height || "24px"};
    }
  `}
`;

const Icon = withStylesWrapper(SVGIcon);
const IconToExport = styled(Icon)``;

IconToExport.displayName = "Icon";

export { IconToExport as Icon };
