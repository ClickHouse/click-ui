import { HTMLAttributes, ReactNode, forwardRef } from "react";
import styled from "styled-components";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "../Collapsible/IconWrapper";

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  selected?: boolean;
  level?: number;
  icon?: IconName;
  iconDir?: HorizontalDirection;
  type?: "main" | "sqlSidebar";
}

const SidebarNavigationItem = forwardRef<HTMLDivElement, SidebarNavigationItemProps>(
  ({ label, level = 0, icon, selected, iconDir, type = "main", ...props }, ref) => {
    return (
      <SidebarItemWrapper
        $level={level}
        data-selected={selected}
        $type={type}
        ref={ref}
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
  }
);

export const SidebarItemWrapper = styled.div<{
  $collapsible?: boolean;
  $level: number;
  $type: "main" | "sqlSidebar";
}>`
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  white-space: nowrap;
  overflow: hidden;
  flex-wrap: nowrap;
  ${({ theme, $collapsible = false, $level, $type }) => {
    const itemType = $level === 0 ? "item" : "subItem";
    return `
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
      theme.click.sidebar[$type].navigation[itemType].color.background.default
    };
    color: ${theme.click.sidebar[$type].navigation[itemType].color.text.default};
    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation[itemType].typography.hover};
      background-color: ${
        theme.click.sidebar[$type].navigation[itemType].color.background.hover
      };
      color: ${theme.click.sidebar[$type].navigation[itemType].color.text.hover};
    }

    &:active, &[data-selected="true"]  {
      font: ${theme.click.sidebar.navigation[itemType].typography.active};
      background-color: ${
        theme.click.sidebar[$type].navigation[itemType].color.background.active
      };
      color: ${theme.click.sidebar[$type].navigation[itemType].color.text.active};
    }
    @media (max-width: 640px) {
      gap: ${theme.click.sidebar.navigation[itemType].mobile.space.gap};
      padding: ${theme.click.sidebar.navigation[itemType].mobile.space.y} ${
      theme.click.sidebar.navigation[itemType].mobile.space.right
    } ${theme.click.sidebar.navigation[itemType].mobile.space.y} ${
      $collapsible
        ? theme.click.sidebar.navigation[itemType].mobile.space.left
        : theme.click.image.sm.size.width
    };
      font: ${theme.click.sidebar.navigation[itemType].mobile.typography.default};

      &:hover, &:focus {
        font: ${theme.click.sidebar.navigation[itemType].mobile.typography.hover};
      }

      &:active, &[data-selected="true"] {
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
