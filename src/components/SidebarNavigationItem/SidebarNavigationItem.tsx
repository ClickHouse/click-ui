import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import styled from "styled-components";

export interface SidebarNavigationItemProps<T extends ElementType> {
  component?: T;
  children?: ReactNode;
}

const SidebarNavigationItem = <T extends React.ElementType = "button">({
  component,
  ...props
}: SidebarNavigationItemProps<T> & ComponentPropsWithoutRef<T>) => (
  <Wrapper
    as={component ?? "button"}
    {...props}
  />
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: none;

  ${({ theme }) => `
    gap: ${theme.click.sidebar.navigation.item.default.space.gap};
    padding: ${theme.click.sidebar.navigation.item.default.space.y} ${
    theme.click.sidebar.navigation.item.default.space.right
  };
    border-radius: ${theme.click.sidebar.navigation.item.radii.all};
    font: ${theme.click.sidebar.navigation.item.typography.default};
    background-color: ${theme.click.sidebar.navigation.item.color.background.default};
    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation.item.typography.hover};
      background-color: ${theme.click.sidebar.navigation.item.color.background.hover};
    }

    &:active {
      font: ${theme.click.sidebar.navigation.item.typography.active};
      background-color: ${theme.click.sidebar.navigation.item.color.background.active};
    }
    @media (max-width: 640px) {
      gap: ${theme.click.sidebar.navigation.item.mobile.space.gap};
      padding: ${`${theme.click.sidebar.navigation.item.mobile.space.y} 0`};
      font: ${theme.click.sidebar.navigation.item.mobile.typography.default};
    }

    &:hover, &:focus {
      font: ${theme.click.sidebar.navigation.item.mobile.typography.hover};
    }

    &:active {
      font: ${theme.click.sidebar.navigation.item.mobile.typography.active};
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

export { SidebarNavigationItem };
