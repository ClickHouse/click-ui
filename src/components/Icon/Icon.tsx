import { ElementType, ReactElement } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import styled from "styled-components";
import { ProfileIcon } from "..";

type IconName = "profile" | "users";

interface IconProps {
  name: IconName;
  color?: string;
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
  ({ color, ...props }: IconProps): ReactElement =>
    (
      <SvgWrapper color={color}>
        <IconComponent {...props} />
      </SvgWrapper>
    );

const SvgWrapper = styled.div`
  & path {
    stroke: ${props =>
      props.color || props.theme.click.global.color.text.default};
  }
`;

export const Icon = withStylesWrapper(SVGIcon);
