import { ElementType, ReactElement } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import styled from "styled-components";
import { ProfileIcon } from "..";

type IconName = "profile" | "users";

interface IconProps {
  name: IconName;
  color?: string;
  width?: string;
  height?: string;
  className?: string;
}

const SVGIcon = ({ name, ...delegated }: IconProps) => {
  switch (name) {
    case "profile":
      return <ProfileIcon {...delegated} />;
    case "users":
      return <UsersIcon {...delegated} />;
    default:
      return null;
  }
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
        <IconComponent {...props} />
      </SvgWrapper>
    );

const SvgWrapper = styled.div<Partial<IconProps>>`
  & path {
    stroke: ${props =>
      props.color || props.theme.click.global.color.text.default};
  }

  & path[fill] {
    fill: ${props =>
      props.color || props.theme.click.global.color.text.default};
  }

  & svg {
    width: ${props => props.width || "24px"};
    height: ${props => props.height || "24px"};
  }
`;

export const Icon = withStylesWrapper(SVGIcon);
