import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { styled } from "styled-components";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "../Collapsible/IconWrapper";

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The label content to display */
  label: ReactNode;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Nesting level for indentation */
  level?: number;
  /** Icon to display before the label */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The sidebar style type */
  type?: "main" | "sqlSidebar";
}

const SidebarNavigationItem = forwardRef<HTMLDivElement, SidebarNavigationItemProps>(
  (
    { label, level = 0, icon, selected, iconDir, disabled, type = "main", ...props },
    ref
  ) => {
    return (
      <SidebarItemWrapper
        $level={level}
        data-selected={selected}
        $type={type}
        ref={ref}
        aria-disabled={disabled}
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
    span a {
      color: ${theme.click.sidebar[$type].navigation[itemType].color.text.default};
    cursor: pointer;
      text-decoration: none;
    }
    cursor: pointer;
    pointer-events: all;

    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation[itemType].typography.hover};
      background-color: ${
        theme.click.sidebar[$type].navigation[itemType].color.background.hover
      };
      color: ${theme.click.sidebar[$type].navigation[itemType].color.text.hover};
      pointer-events: auto;
    }

    &:active, &[data-selected="true"] {
      font: ${theme.click.sidebar.navigation[itemType].typography.active};
      background-color: ${
        theme.click.sidebar[$type].navigation[itemType].color.background.active
      };
      color: ${theme.click.sidebar[$type].navigation[itemType].color.text.active};
      pointer-events: all;
    }

    &[aria-disabled=true],
    &[aria-disabled=true]:hover,
    &[aria-disabled=true]:focus,
    &[aria-disabled=true]:active,
    &[aria-disabled=true]:focus-within,
    &[aria-disabled=true][data-selected="true"] {

      color: ${theme.click.sidebar[$type].navigation[itemType].color.text.disabled};
      pointer-events: none;

      span a {
        color: ${theme.click.sidebar[$type].navigation[itemType].color.text.disabled};
        cursor: not-allowed;
        text-decoration: none;
      }
      cursor: not-allowed;
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
`;

export { SidebarNavigationItem };
