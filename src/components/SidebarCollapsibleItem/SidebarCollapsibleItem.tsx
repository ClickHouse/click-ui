import { forwardRef } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { SidebarItemWrapper } from '@/components/SidebarNavigationItem';
import { SidebarCollapsibleItemProps } from './SidebarCollapsibleItem.types';

export const SidebarCollapsibleItem = forwardRef<
  HTMLDivElement,
  SidebarCollapsibleItemProps
>(
  (
    {
      label,
      children,
      open,
      onOpenChange,
      iconDir = 'start',
      indicatorDir = 'start',
      icon,
      level = 0,
      selected,
      type = 'main',
      ...props
    },
    ref
  ) => {
    if (!label) {
      return;
    }
    return (
      <Collapsible
        open={open}
        onOpenChange={onOpenChange}
      >
        <SidebarItemWrapper
          ref={ref}
          as={Collapsible.Header}
          icon={icon}
          iconDir={iconDir}
          indicatorDir={indicatorDir}
          $collapsible
          $level={level}
          $type={type}
          data-selected={selected}
          wrapInTrigger={type === 'main'}
          {...props}
        >
          {label}
        </SidebarItemWrapper>
        <Collapsible.Content indicatorDir={indicatorDir}>{children}</Collapsible.Content>
      </Collapsible>
    );
  }
);
