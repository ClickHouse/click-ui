import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import styled from "styled-components";

export interface SidebarNavigationItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon: IconName;
  children: React.ReactNode;
}

const SidebarNavigationItem = ({
  icon,
  children,
}: SidebarNavigationItemProps) => (
  <Wrapper>
    <Icon name={icon} size="small" />
    {children}
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.click.sidebar.navigation.item.default.space.gap};

  padding: ${props =>
    `${props.theme.click.sidebar.navigation.item.default.space.y} ${props.theme.click.sidebar.navigation.item.default.space.x}`};

  border-radius: ${props =>
    props.theme.click.sidebar.navigation.item.radii.all.radius};
  font: ${props =>
    props.theme.click.sidebar.navigation.item.typography.default};
  background-color: ${props =>
    props.theme.click.sidebar.navigation.item.color.background.default};

  &:hover {
    font: ${props =>
      props.theme.click.sidebar.navigation.item.typography.hover};
    background-color: ${props =>
      props.theme.click.sidebar.navigation.item.color.background.hover};
  }

  &:active {
    font: ${props =>
      props.theme.click.sidebar.navigation.item.typography.active};
    background-color: ${props =>
      props.theme.click.sidebar.navigation.item.color.background.active};
  }

  a {
    color: inherit;
    text-decoration: none;

    &:active {
      color: inherit;
    }
  }
`;

export { SidebarNavigationItem };
