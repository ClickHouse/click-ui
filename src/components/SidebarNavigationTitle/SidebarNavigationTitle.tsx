import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "../Collapsible/IconWrapper";

export interface SidebarNavigationTitleProps extends HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  selected?: boolean;
  icon?: IconName;
  iconDir?: HorizontalDirection;
}

export const SidebarNavigationTitle = ({
  label,
  icon,
  iconDir,
  selected,
  ...props
}: SidebarNavigationTitleProps) => {
  return (
    <SidebarTitleWrapper
      data-selected={selected}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {label}
      </IconWrapper>
    </SidebarTitleWrapper>
  );
};
export const SidebarTitleWrapper = styled.button<{ $collapsible?: boolean }>`
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  white-space: nowrap;
  overflow: hidden;
  ${({ theme, $collapsible = false }) => `
    padding: 0;
    padding-left: ${$collapsible ? 0 : theme.click.image.sm.size.width};
    font: ${theme.click.sidebar.navigation.title.typography.default};
    color: ${theme.click.sidebar.navigation.title.color.default};

    &:hover {
      font: ${theme.click.sidebar.navigation.title.typography.hover};
      color: ${theme.click.sidebar.navigation.title.color.hover};
    }

    &:active, &[data-state="open"], &[data-selected="true"] {
      font: ${theme.click.sidebar.navigation.title.typography.active};
      color: ${theme.click.sidebar.navigation.title.color.active};
    }
  `}

  a {
    color: inherit;
    text-decoration: none;

    &:active {
      color: inherit;
    }
  }
`;
