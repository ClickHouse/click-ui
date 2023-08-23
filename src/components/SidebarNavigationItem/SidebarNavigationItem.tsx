import { Icon } from "@/components";
import { SidebarAccordion } from "@/components/Accordion/Accordion";
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
  <>
    {collapsible ? (
      <CollapsibleNavigationItem
        collapsible={collapsible}
        label={label}
        icon={icon}
        children={children}
      />
    ) : (
      <Wrapper>
        <IconsWrapper>
          {/* This icon is only used as a place holder */}
          <Icon
            name="chevron-right"
            size="sm"
            visibility="hidden"
          />
          {icon && (
            <Icon
              name={icon || "user"}
              size="sm"
            />
          )}
        </IconsWrapper>
        {children}
      </Wrapper>
    )}
  </>
);
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.click.sidebar.navigation.item.default.space.gap};

  padding: ${props => `${props.theme.click.sidebar.navigation.item.default.space.y} 0`};

  border-radius: ${props => props.theme.click.sidebar.navigation.item.radii.all};
  font: ${props => props.theme.click.sidebar.navigation.item.typography.default};
  background-color: ${props =>
    props.theme.click.sidebar.navigation.item.color.background.default};

  &:hover {
    font: ${props => props.theme.click.sidebar.navigation.item.typography.hover};
    background-color: ${props =>
      props.theme.click.sidebar.navigation.item.color.background.hover};
  }

  &:active {
    font: ${props => props.theme.click.sidebar.navigation.item.typography.active};
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
const IconsWrapper = styled.div`
  display: flex;
`;
const CollapsibleNavigationItem = ({
  collapsible,
  icon,
  label,
  children,
}: CollapsibleSidebarNavigationItemProps) => (
  <CollapsibleWrapper>
    {label && collapsible && (
      <SidebarAccordion
        title={label}
        icon={icon}
        iconSize="sm"
      >
        {children}
      </SidebarAccordion>
    )}
  </CollapsibleWrapper>
);

const CollapsibleWrapper = styled(Wrapper)`
  padding-left: 0;
`;
export { SidebarNavigationItem };
