import styled from "styled-components";
import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";

export interface SidebarNavigationTitleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  selected?: boolean;
  icon?: IconName;
}

export const SidebarNavigationTitle = ({
  children,
  icon,
  selected,
  ...props
}: SidebarNavigationTitleProps) => {
  return (
    <SidebarTitleWrapper
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
    </SidebarTitleWrapper>
  );
};
export const SidebarTitleWrapper = styled.button<{ $collapsible?: boolean }>`
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  ${({ theme, $collapsible = false }) => `
    padding: 0;
    padding-left: ${$collapsible ? 0 : theme.click.image.sm.size.width};
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
