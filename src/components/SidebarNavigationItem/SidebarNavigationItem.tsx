import { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { IconDir, IconName } from "@/components";
import { IconWrapper } from "../Collapsible/IconWrapper";

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  selected?: boolean;
  level?: number;
  icon?: IconName;
  iconDir?: IconDir;
}

const SidebarNavigationItem = ({
  label,
  level = 0,
  icon,
  selected,
  iconDir,
  ...props
}: SidebarNavigationItemProps) => {
  return (
    <SidebarItemWrapper
      $level={level}
      data-selected={selected}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {label}
      </IconWrapper>
    </SidebarItemWrapper>
  );
};

export const SidebarItemWrapper = styled.button<{
  $collapsible?: boolean;
  $level: number;
}>`
  display: flex;
  align-items: center;
  border: none;
  ${({ theme, $collapsible = false, $level }) => {
    const itemType = $level === 0 ? "item" : "subItem";
    return `
    gap: ${theme.click.sidebar.navigation.item.default.space.gap};
    padding: ${theme.click.sidebar.navigation[itemType].default.space.y} ${
      theme.click.sidebar.navigation[itemType].default.space.right
    } ${theme.click.sidebar.navigation[itemType].default.space.y} ${
      $collapsible
        ? theme.click.sidebar.navigation[itemType].default.space.left
        : theme.click.image.sm.size.width
    };
    border-radius: ${theme.click.sidebar.navigation[itemType].radii.all};
    font: ${theme.click.sidebar.navigation[itemType].typography.default};
    background-color: ${
      theme.click.sidebar.navigation[itemType].color.background.default
    };
    color: ${theme.click.sidebar.navigation[itemType].color.text.default};
    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation[itemType].typography.hover};
      background-color: ${
        theme.click.sidebar.navigation[itemType].color.background.hover
      };
      color: ${theme.click.sidebar.navigation[itemType].color.text.hover};
    }

    &:active, &[data-selected="true"]  {
      font: ${theme.click.sidebar.navigation[itemType].typography.active};
      background-color: ${
        theme.click.sidebar.navigation[itemType].color.background.active
      };
      color: ${theme.click.sidebar.navigation[itemType].color.text.active};
    }
    @media (max-width: 640px) {
      gap: ${theme.click.sidebar.navigation[itemType].mobile.space.gap};
      padding: ${`${theme.click.sidebar.navigation[itemType].mobile.space.y} 0`};
      font: ${theme.click.sidebar.navigation[itemType].mobile.typography.default};

      &:hover, &:focus {
        font: ${theme.click.sidebar.navigation[itemType].mobile.typography.hover};
      }

      &:active {
        font: ${theme.click.sidebar.navigation[itemType].mobile.typography.active};
      }
    }
  `;
  }}
  a {
    color: inherit;
    text-decoration: none;

    &:active {
      color: inherit;
    }
  }
  &:hover [data-trigger-icon],
  [data-open="true"][data-trigger-icon] {
    visibility: visible;
  }
`;

export { SidebarNavigationItem };
