import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { IconWrapper } from '@/components/Collapsible/IconWrapper';
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

// Polymorphic wrapper: SidebarCollapsibleItem renders it `as={Collapsible.Header}`.
// Same shape as the Container polymorphic component (src/components/Container).
export interface SidebarItemWrapperProps<T extends ElementType = 'div'> {
  as?: T;
  $collapsible?: boolean;
  $level?: number;
  $type?: 'main' | 'sqlSidebar';
}

type SidebarItemWrapperComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentProps<T>, keyof SidebarItemWrapperProps<T>> &
    SidebarItemWrapperProps<T>
) => ReactNode;

const _SidebarItemWrapper = <T extends ElementType = 'div'>(
  {
    as,
    $collapsible = false,
    $level = 0,
    $type = 'main',
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof SidebarItemWrapperProps<T>> &
    SidebarItemWrapperProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'div';
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
};

export const SidebarItemWrapper: SidebarItemWrapperComponent =
  forwardRef(_SidebarItemWrapper);

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
