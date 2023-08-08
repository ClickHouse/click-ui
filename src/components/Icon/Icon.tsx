import { ElementType, ReactElement } from "react";
import styled from "styled-components";
import { IconProps } from "./types";
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
        color={color}
        width={width}
        height={height}
        size={size}
        className={className}
      >
        <IconComponent {...props} />
      </SvgWrapper>
    );

const SvgWrapper = styled.span<Partial<IconProps>>`
  display: flex;
  align-items: center;

  & path[stroke] {
    stroke: ${props => props.color || "currentColor"};
  }

  & path[fill] {
    fill: ${props => props.color || "currentColor"};
  }

  & svg {
    width: ${props =>
      props.width ||
      props.theme.click.image[props.size || "medium"].size.width ||
      "24px"};
    height: ${props =>
      props.height ||
      props.theme.click.image[props.size || "medium"].size.height ||
      "24px"};
  }

  & svg[stroke] {
    stroke: ${props => props.color || "currentColor"};
  }

  & svg[fill]:not([fill="none"]) {
    fill: ${props => props.color || "currentColor"};
  }
`;

const Icon = withStylesWrapper(SVGIcon);
const IconToExport = styled(Icon)``;

IconToExport.displayName = "Icon";

export { IconToExport as Icon };
