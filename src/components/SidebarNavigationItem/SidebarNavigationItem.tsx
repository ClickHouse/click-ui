import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
import { cn, cva } from '@/lib/cva';
import { IconWrapper } from '@/components/Collapsible/IconWrapper';
import type { HorizontalDirection } from '@/types';
import type { ImageName } from '@/components/Icon';
import { SidebarNavigationItemProps } from './SidebarNavigationItem.types';
import styles from './SidebarNavigationItem.module.css';

const wrapperVariants = cva(styles.wrapper, {
  variants: {
    itemType: {
      item: styles.wrapper_itemtype_item,
      subItem: styles['wrapper_itemtype_sub-item'],
    },
    // The colour set depends on BOTH the sidebar type and the item depth, so
    // it is applied through the compoundVariants below rather than here.
    type: { main: '', sqlSidebar: '' },
    collapsible: { true: styles.wrapper_collapsible_true, false: '' },
  },
  compoundVariants: [
    { type: 'main', itemType: 'item', class: styles['wrapper_color_main-item'] },
    { type: 'main', itemType: 'subItem', class: styles['wrapper_color_main-sub-item'] },
    {
      type: 'sqlSidebar',
      itemType: 'item',
      class: styles['wrapper_color_sql-sidebar-item'],
    },
    {
      type: 'sqlSidebar',
      itemType: 'subItem',
      class: styles['wrapper_color_sql-sidebar-sub-item'],
    },
  ],
  defaultVariants: { itemType: 'item', type: 'main', collapsible: false },
});

type SidebarItemWrapperProps = ComponentPropsWithoutRef<'div'> & {
  // Polymorphic: rendered `as={Collapsible.Header}` by SidebarCollapsibleItem,
  // hence the optional Collapsible.Header props below.
  as?: ElementType;
  $collapsible?: boolean;
  $level?: number;
  $type?: 'main' | 'sqlSidebar';
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  indicatorDir?: HorizontalDirection;
  wrapInTrigger?: boolean;
};

export const SidebarItemWrapper = forwardRef<HTMLDivElement, SidebarItemWrapperProps>(
  (
    { as, $collapsible = false, $level = 0, $type = 'main', className, ...props },
    ref
  ) => {
    const Component = (as ?? 'div') as ElementType;
    return (
      <Component
        ref={ref}
        {...props}
        className={cn(
          wrapperVariants({
            itemType: $level === 0 ? 'item' : 'subItem',
            type: $type,
            collapsible: $collapsible,
          }),
          className
        )}
      />
    );
  }
);

SidebarItemWrapper.displayName = 'SidebarItemWrapper';

const SidebarNavigationItem = forwardRef<HTMLDivElement, SidebarNavigationItemProps>(
  (
    { label, level = 0, icon, selected, iconDir, disabled, type = 'main', ...props },
    ref
  ) => {
    return (
      <SidebarItemWrapper
        $level={level}
        data-selected={selected}
        $type={type}
        ref={ref}
        aria-disabled={disabled}
        {...props}
      >
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {label}
        </IconWrapper>
      </SidebarItemWrapper>
    );
  }
);

export { SidebarNavigationItem };
