import { styled } from 'styled-components';
import { IconWrapper } from '@/components/Collapsible/IconWrapper';
import { SidebarNavigationTitleProps } from './SidebarNavigationTitle.types';

export const SidebarNavigationTitle = ({
  label,
  icon,
  iconDir,
  selected,
  type = 'main',
  ...props
}: SidebarNavigationTitleProps) => {
  return (
    <SidebarTitleWrapper
      data-selected={selected}
      $type={type}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {label}
      </IconWrapper>
    </SidebarTitleWrapper>
  );
};
export const SidebarTitleWrapper = styled.button<{
  $collapsible?: boolean;
  $type: 'main' | 'sqlSidebar';
}>`
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  ${({ theme, $collapsible = false, $type }) => `
    padding: 0;
    padding-left: ${$collapsible ? 0 : theme.click.image.sm.size.width};
    font: ${theme.click.sidebar.navigation.title.typography.default};
    color: ${theme.click.sidebar[$type].navigation.title.color.default};

    &:hover {
      font: ${theme.click.sidebar.navigation.title.typography.hover};
      color: ${theme.click.sidebar[$type].navigation.title.color.hover};
    }

    &:active, &[data-state="open"], &[data-selected="true"] {
      font: ${theme.click.sidebar.navigation.title.typography.active};
      color: ${theme.click.sidebar[$type].navigation.title.color.active};
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
