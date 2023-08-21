import styled from "styled-components";
import { IconName } from "@/components/Icon/types";

import { Collapsible, FlexContainer, IconDir } from "./Collapsible";
import { HTMLAttributes, ReactNode } from "react";

interface DefaultSidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  label?: never;
  icon?: IconName;
  children: ReactNode;
}

interface CollapsibleSidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: IconDir;
}

export type SidebarNavigationItemProps = (
  | DefaultSidebarNavigationItemProps
  | CollapsibleSidebarNavigationItemProps
) & {
  collapsible?: boolean;
  level?: number;
};

const SidebarNavigationItem = ({
  collapsible = false,
  children,
  label,
  level = 0,
  ...props
}: SidebarNavigationItemProps) => {
  if (collapsible) {
    return (
      <CollapsibleNavigationItem
        label={label}
        children={children}
        level={level}
        {...props}
      />
    );
  }

  return (
    <Wrapper
      $collapsible={false}
      $level={level}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ $collapsible: boolean; $level: number }>`
  display: flex;
  align-items: center;
  border: none;
  ${({ theme, $collapsible, $level }) => {
    const itemType = $level === 0 ? "item" : "subItem";
    return `
    gap: ${theme.click.sidebar.navigation.item.default.space.gap};
    padding: ${theme.click.sidebar.navigation[itemType].default.space.y} ${
      theme.click.sidebar.navigation[itemType].default.space.right
    } ${theme.click.sidebar.navigation[itemType].default.space.y} ${
      $collapsible
        ? theme.click.sidebar.navigation[itemType].default.space.left
        : theme.click.image.small.size.width
    };
    border-radius: ${theme.click.sidebar.navigation[itemType].radii.all};
    font: ${theme.click.sidebar.navigation[itemType].typography.default};
    background-color: ${
      theme.click.sidebar.navigation[itemType].color.background.default
    };
    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation[itemType].typography.hover};
      background-color: ${
        theme.click.sidebar.navigation[itemType].color.background.hover
      };
    }

    &:active {
      font: ${theme.click.sidebar.navigation[itemType].typography.active};
      background-color: ${
        theme.click.sidebar.navigation[itemType].color.background.active
      };
    }
    @media (max-width: 640px) {
      gap: ${theme.click.sidebar.navigation[itemType].mobile.space.gap};
      padding: ${`${theme.click.sidebar.navigation[itemType].mobile.space.y} 0`};
      font: ${theme.click.sidebar.navigation[itemType].mobile.typography.default};
    }

    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation[itemType].mobile.typography.hover};
    }

    &:active {
      font: ${theme.click.sidebar.navigation[itemType].mobile.typography.active};
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

const CollapsibleNavigationItem = ({
  label,
  children,
  open,
  onOpenChange,
  iconDir = "left",
  level,
  ...props
}: CollapsibleSidebarNavigationItemProps & { level: number }) => {
  if (!label) {
    return;
  }
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
    >
      <Wrapper
        as={Collapsible.Header}
        iconDir={iconDir}
        $collapsible
        $level={level}
        {...props}
      >
        {iconDir === "left" && <Collapsible.Trigger />}
        {children && <FlexContainer>{label}</FlexContainer>}
        {iconDir === "right" && <Collapsible.Trigger />}
      </Wrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};

export { SidebarNavigationItem };
