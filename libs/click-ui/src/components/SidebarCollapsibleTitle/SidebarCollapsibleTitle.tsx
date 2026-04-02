import { Icon } from '@/components/Icon';
import { Collapsible } from '@/components/Collapsible';
import { SidebarTitleWrapper } from '@/components/SidebarNavigationTitle';
import { SidebarCollapsibleTitleProps } from './SidebarCollapsibleTitle.types';

export const SidebarCollapsibleTitle = ({
  label,
  children,
  open,
  onOpenChange,
  iconDir = 'start',
  icon,
  selected,
  type = 'main',
  ...props
}: SidebarCollapsibleTitleProps) => {
  if (!label) {
    return;
  }
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
    >
      <SidebarTitleWrapper
        as={Collapsible.Trigger}
        $collapsible
        iconDir={iconDir}
        data-selected={selected}
        $type={type}
        {...props}
      >
        {icon && iconDir === 'start' && (
          <Icon
            name={icon}
            size="sm"
          />
        )}
        {label}
        {icon && iconDir === 'end' && (
          <Icon
            name={icon}
            size="sm"
          />
        )}
      </SidebarTitleWrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};
