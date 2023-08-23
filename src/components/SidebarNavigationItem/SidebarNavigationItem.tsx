import styled from "styled-components";
import { IconName } from "@/components/Icon/types";

import { Collapsible, FlexContainer, IconDir } from "./Collapsible";
import { ComponentPropsWithoutRef, ElementType, HTMLAttributes, ReactNode } from "react";
import { Icon } from "..";

interface DefaultSidebarNavigationItemProps<T extends ElementType> {
  label?: never;
  icon?: IconName;
  component?: T;
  children: ReactNode;
}

interface CollapsibleSidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  open?: boolean;
  component?: never;
  onOpenChange?: (value: boolean) => void;
  iconDir?: IconDir;
  icon?: IconName;
}

export type SidebarNavigationItemProps<T extends ElementType> = (
  | DefaultSidebarNavigationItemProps<T>
  | CollapsibleSidebarNavigationItemProps
) & {
  collapsible?: boolean;
  level?: number;
  icon?: IconName;
};

const SidebarNavigationItem = <T extends React.ElementType = "button">({
  component,
  collapsible = false,
  children,
  label,
  level = 0,
  open,
  onOpenChange,
  iconDir,
  icon,
  ...props
}: SidebarNavigationItemProps<T> & ComponentPropsWithoutRef<T>) => {
  if (collapsible) {
    return (
      <CollapsibleNavigationItem
        label={label}
        children={children}
        level={level}
        open={open}
        onOpenChange={onOpenChange}
        iconDir={iconDir}
        icon={icon}
        {...props}
      />
    );
  }

  return (
    <Wrapper
      $collapsible={false}
      $level={level}
      as={component ?? "button"}
      {...props}
    >
      {icon && (
        <Icon
          name={icon}
          size="small"
        />
      )}
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
    color: ${theme.click.sidebar.navigation[itemType].color.text.default};
    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation[itemType].typography.hover};
      background-color: ${
        theme.click.sidebar.navigation[itemType].color.background.hover
      };
      color: ${theme.click.sidebar.navigation[itemType].color.text.hover};
    }

    &:active {
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
  icon,
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
        {children && (
          <FlexContainer>
            {icon && (
              <Icon
                name={icon}
                size="small"
              />
            )}
            {label}
          </FlexContainer>
        )}
        {iconDir === "right" && <Collapsible.Trigger />}
      </Wrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};

export { SidebarNavigationItem };
