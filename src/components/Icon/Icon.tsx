import { ElementType, ReactElement } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import styled from "styled-components";
import { ProfileIcon } from "..";

type IconName = "profile" | "users";

export interface IconProps {
  name: IconName;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
}

const ICONS_MAP = {
  "profile": ProfileIcon,
  "users": UsersIcon,
}

const SVGIcon = ({ name, width, height, ...delegated }: IconProps) => {
  const Component = ICONS_MAP[name];
      return <Component width={width} height={height} {...delegated} />;
};

const withStylesWrapper =
  (IconComponent: ElementType) =>
  ({ color, width, height, className, ...props }: IconProps): ReactElement =>
    (
      <SvgWrapper
        color={color}
        width={width}
        height={height}
        className={className}
      >
        <IconComponent width={width} height={height} {...props} />
      </SvgWrapper>
    );

const SvgWrapper = styled.div<Partial<IconProps>>`
  & path[stroke] {
    stroke: ${props =>
      props.color || props.theme.click.global.color.text.default};
  }

  & path[fill] {
    fill: ${props =>
      props.color || props.theme.click.global.color.text.default};
  }

  & svg {
    width: ${props => props.width || "24px"};
    height: ${props => props.width || "24px"};
  }

  & svg[stroke] {
    stroke: ${props =>
      props.color || props.theme.click.global.color.text.default};
  }

  & svg[fill]:not([fill="none"]) {
    fill: ${props =>
      props.color || props.theme.click.global.color.text.default};
  }
`;

export const Icon = withStylesWrapper(SVGIcon);
