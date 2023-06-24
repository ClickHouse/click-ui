import { ElementType, ReactElement } from "react";
import { UsersIcon } from "../icons/UsersIcon";
import styled from "styled-components";
import { UserIcon } from "../icons/UserIcon";
import ChatIcon from "../icons/ChatIcon";
import DatabaseIcon from "../icons/DatabaseIcon";
import FilterIcon from "../icons/FilterIcon";
import HistoryIcon from "../icons/HistoryIcon";
import InsertRowIcon from "../icons/InsertRowIcon";
import SortAltIcon from "../icons/SortAltIcon";
import { IconProps } from "./types";
import { ChevronRight } from "../icons/ChevronRight";
import { ChevronDown } from "../icons/ChevronDown";

const ICONS_MAP = {
  chat: ChatIcon,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  database: DatabaseIcon,
  filter: FilterIcon,
  history: HistoryIcon,
  insertRow: InsertRowIcon,
  sort: SortAltIcon,
  user: UserIcon,
  users: UsersIcon,
};

const SVGIcon = ({ name, ...delegated }: IconProps) => {
  const Component = ICONS_MAP[name];
  return <Component {...delegated} />;
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
  display: flex;
  align-items: center;

  & path[stroke] {
    stroke: ${props => props.color || "currentColor"};
  }

  & path[fill] {
    fill: ${props => props.color || "currentColor"};
  }

  & svg {
    width: ${props => props.width || "24px"};
    height: ${props => props.width || "24px"};
  }

  & svg[stroke] {
    stroke: ${props => props.color || "currentColor"};
  }

  & svg[fill]:not([fill="none"]) {
    fill: ${props => props.color || "currentColor"};
  }
`;

export const Icon = withStylesWrapper(SVGIcon);
