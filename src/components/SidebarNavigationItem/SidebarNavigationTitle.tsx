import { IconName } from "@/components/Icon/types";

import styled from "styled-components";
import { Collapsible, IconDir } from "./Collapsible";
import { ReactNode } from "react";

interface DefaultSidebarNavigationTitleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label?: undefined;
  icon?: IconName;
  children: React.ReactNode;
}

interface CollapsibleSidebarNavigationTitleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: IconDir;
}

export type SidebarNavigationTitleProps = (
  | DefaultSidebarNavigationTitleProps
  | CollapsibleSidebarNavigationTitleProps
) & {
  collapsible?: boolean;
};

export const SidebarNavigationTitle = ({
  collapsible,
  children,
  label,
}: SidebarNavigationTitleProps) => {
  if (collapsible) {
    return (
      <CollapsibleNavigationItem
        label={label}
        children={children}
      />
    );
  }

  return <Wrapper $collapsible={false}>{children}</Wrapper>;
};
const Wrapper = styled.div<{ $collapsible: boolean }>`
  display: inline-flex;
  align-items: center;
  ${({ theme, $collapsible }) => `
    padding: 0;
    padding-left: ${$collapsible ? 0 : theme.click.image.small.size.width};
    font: ${theme.click.sidebar.navigation.title.typography.default};
    color: ${theme.click.sidebar.navigation.title.color.default};

    &:hover {
      font: ${theme.click.sidebar.navigation.title.typography.hover};
      color: ${theme.click.sidebar.navigation.title.color.hover};
    }

    &:active, &[data-state="open"] {
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
        {...props}
      >
        {label}
      </Wrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};
