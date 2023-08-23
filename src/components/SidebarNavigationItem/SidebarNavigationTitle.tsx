import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styled from "styled-components";
import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import { Collapsible, IconDir } from "./Collapsible";

interface DefaultSidebarNavigationTitleProps<T extends ElementType> {
  label?: undefined;
  children: React.ReactNode;
  open?: never;
  component?: T;
  onOpenChange?: never;
  selected?: boolean;
}

interface CollapsibleSidebarNavigationTitleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: IconDir;
  icon?: IconName;
  selected?: boolean;
}

export type SidebarNavigationTitleProps<T extends ElementType> = (
  | DefaultSidebarNavigationTitleProps<T>
  | CollapsibleSidebarNavigationTitleProps
) & {
  collapsible?: boolean;
  icon?: IconName;
};

export const SidebarNavigationTitle = <T extends React.ElementType = "button">({
  collapsible,
  component,
  children,
  label,
  icon,
  open,
  onOpenChange,
  selected,
  ...props
}: SidebarNavigationTitleProps<T> & ComponentPropsWithoutRef<T>) => {
  if (collapsible) {
    return (
      <CollapsibleNavigationItem
        label={label}
        children={children}
        icon={icon}
        open={open}
        onOpenChange={onOpenChange}
        selected={selected}
        {...props}
      />
    );
  }

  return (
    <Wrapper
      as={component}
      $collapsible={false}
      data-selected={selected}
      {...props}
    >
      {icon && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
      {children}
    </Wrapper>
  );
};
const Wrapper = styled.div<{ $collapsible: boolean }>`
  display: inline-flex;
  align-items: center;
  ${({ theme, $collapsible }) => `
    padding: 0;
    padding-left: ${$collapsible ? 0 : theme.click.image.sm.size.width};
    gap: ${theme.click.sidebar.navigation.item.default.space.gap};
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

const CollapsibleNavigationItem = ({
  label,
  children,
  open,
  onOpenChange,
  iconDir,
  icon,
  selected,
  ...props
}: CollapsibleSidebarNavigationTitleProps) => {
  if (!label) {
    return;
  }
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
    >
      <Wrapper
        as={Collapsible.Trigger}
        $collapsible
        iconDir={iconDir}
        data-selected={selected}
        {...props}
      >
        {icon && (
          <Icon
            name={icon}
            size="sm"
          />
        )}
        {label}
      </Wrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};
