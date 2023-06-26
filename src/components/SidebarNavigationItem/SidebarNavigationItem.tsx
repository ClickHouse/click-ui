import { Accordion, Icon } from "@/components";
import { IconName } from "@/components/Icon/types";

import styled from "styled-components";

interface DefaultSidebarNavigationItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  collapsible?: false | undefined | null;
  label?: undefined;
  icon?: IconName;
  children: React.ReactNode;
}

interface CollapsibleSidebarNavigationItemProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  collapsible: true;
  label: string;
  icon?: IconName;
  children: React.ReactNode;
}

export type SidebarNavigationItemProps =
  | DefaultSidebarNavigationItemProps
  | CollapsibleSidebarNavigationItemProps;

const SidebarNavigationItem = ({
  icon,
  collapsible,
  children,
  label,
}: SidebarNavigationItemProps) => (
  <Wrapper>
    {collapsible ? (
      <CollapsibleNavigationItem
        collapsible={collapsible}
        label={label}
        icon={icon}
        children={children}
      />
    ) : (
      <>
        {icon && <Icon name={icon || "user"} size="small" />}
        {children}
      </>
    )}
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

const CollapsibleNavigationItem = ({
  collapsible,
  icon,
  label,
  children,
}: CollapsibleSidebarNavigationItemProps) => (
  <>
    {label && collapsible && (
      <SidebarAccordion title={label} icon={icon} iconSize="small">
        {children}
      </SidebarAccordion>
    )}
  </>
);

const SidebarAccordion = styled(Accordion)`
  p {
    margin: 0;
  }
`;

export { SidebarNavigationItem };
