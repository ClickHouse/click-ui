import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import type { HorizontalDirection } from '@/components/types';
import type { IconName } from '@/components/Icon';

import { Collapsible } from '../Collapsible';
import { SidebarItemWrapper } from '../SidebarNavigationItem';

export interface SidebarCollapsibleItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The label content to display */
  label: ReactNode;
  /** The content to display when expanded */
  children: ReactNode;
  /** Whether the item is expanded */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (value: boolean) => void;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** Icon to display before the label */
  icon?: IconName;
  /** The direction of the collapse indicator */
  indicatorDir?: HorizontalDirection;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Nesting level for indentation */
  level?: number;
  /** The sidebar style type */
  type?: 'main' | 'sqlSidebar';
}

const SidebarCollapsibleItem = forwardRef<HTMLDivElement, SidebarCollapsibleItemProps>(
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

export { SidebarCollapsibleItem };
