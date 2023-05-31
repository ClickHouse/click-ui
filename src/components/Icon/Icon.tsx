import { ElementType, ReactElement } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import styled from "styled-components";
import { ProfileIcon } from "..";

type IconName = "profile" | "users";

interface IconProps {
  name: IconName;
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
  (props: IconProps): ReactElement =>
    (
      <SvgWrapper>
        <IconComponent {...props} />
      </SvgWrapper>
    );

const SvgWrapper = styled.div`
  & path {
    stroke: ${props => props.theme.click.global.color.text.default};
  }
`;

export const Icon = withStylesWrapper(SVGIcon);
