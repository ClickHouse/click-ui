import { ElementType, ReactElement } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import styled from "styled-components";
import { ProfileIcon } from "../icons/ProfileIcon";
import ChatIcon from "../icons/ChatIcon";
import DatabaseIcon from "../icons/DatabaseIcon";
import FilterIcon from "../icons/FilterIcon";
import HistoryIcon from "../icons/HistoryIcon";
import InsertRowIcon from "../icons/InsertRowIcon";
import SortAltIcon from "../icons/SortAltIcon";
import { SvgIconProps, IconProps } from "./types";

const ICONS_MAP = {
  profile: ProfileIcon,
  users: UsersIcon,
  chat: ChatIcon,
  db: DatabaseIcon,
  filter: FilterIcon,
  history: HistoryIcon,
  insertRow: InsertRowIcon,
  sort: SortAltIcon,
};

const SVGIcon = ({ name, ...delegated }: SvgIconProps) => {
  const Component = ICONS_MAP[name];
  return <Component {...delegated} />;
};

const withStylesWrapper =
  (IconComponent: ElementType) =>
  ({ color, width, height, className, ...props }: SvgIconProps): ReactElement =>
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
    stroke: ${(props) =>
      props.color || props.theme.click.global.color.text.default};
  }

  & path[fill] {
    fill: ${(props) =>
      props.color || props.theme.click.global.color.text.default};
  }

  & svg {
    width: ${(props) => props.width || "24px"};
    height: ${(props) => props.width || "24px"};
  }

  & svg[stroke] {
    stroke: ${(props) =>
      props.color || props.theme.click.global.color.text.default};
  }

  & svg[fill]:not([fill="none"]) {
    fill: ${(props) =>
      props.color || props.theme.click.global.color.text.default};
  }
`;

export const Icon = withStylesWrapper(SVGIcon);
