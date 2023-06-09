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
import ArrowDown from "@/components/icons/ArrowDown";
import InfoIcon from "@/components/icons/InfoIcon";
import CheckIcon from "@/components/icons/CheckIcon";

const ICONS_MAP = {
  "arrow-down": ArrowDown,
  chat: ChatIcon,
  check: CheckIcon,
  "chevron-right": ChevronRight,
  "chevron-down": ChevronDown,
  database: DatabaseIcon,
  filter: FilterIcon,
  history: HistoryIcon,
  info: InfoIcon,
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
  ({
    color,
    width,
    height,
    className,
    size,
    ...props
  }: IconProps): ReactElement =>
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

export { IconToExport as Icon };
