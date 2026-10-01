import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { cn, cva } from '@/lib/cva';
import { IconWrapper } from '@/components/Collapsible/IconWrapper';
import { SidebarNavigationTitleProps } from './SidebarNavigationTitle.types';
import styles from './SidebarNavigationTitle.module.css';

const wrapperVariants = cva(styles.wrapper, {
  variants: {
    type: {
      main: styles.wrapper_type_main,
      sqlSidebar: styles['wrapper_type_sql-sidebar'],
    },
    collapsible: { true: styles.wrapper_collapsible_true, false: '' },
  },
  defaultVariants: { type: 'main', collapsible: false },
});

// Polymorphic wrapper: SidebarCollapsibleTitle renders it `as={Collapsible.Trigger}`.
// Same shape as the Container polymorphic component (src/components/Container).
export interface SidebarTitleWrapperProps<T extends ElementType = 'button'> {
  as?: T;
  $collapsible?: boolean;
  $type?: 'main' | 'sqlSidebar';
}

type SidebarTitleWrapperComponent = <T extends ElementType = 'button'>(
  props: Omit<ComponentProps<T>, keyof SidebarTitleWrapperProps<T>> &
    SidebarTitleWrapperProps<T>
) => ReactNode;

const _SidebarTitleWrapper = <T extends ElementType = 'button'>(
  {
    as,
    $collapsible = false,
    $type = 'main',
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof SidebarTitleWrapperProps<T>> &
    SidebarTitleWrapperProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'button';
  return (
    <Component
      ref={ref}
      {...props}
      className={cn(
        wrapperVariants({ type: $type, collapsible: $collapsible }),
        className
      )}
    />
  );
};

export const SidebarTitleWrapper: SidebarTitleWrapperComponent =
  forwardRef(_SidebarTitleWrapper);

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
