import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';
import { cn, cva } from '@/lib/cva';
import { IconWrapper } from '@/components/Collapsible/IconWrapper';
import type { HorizontalDirection } from '@/types';
import type { ImageName } from '@/components/Icon';
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

type SidebarTitleWrapperProps = ComponentPropsWithoutRef<'button'> & {
  // Polymorphic: rendered `as={Collapsible.Trigger}` by SidebarCollapsibleTitle,
  // hence the optional Collapsible.Trigger props below.
  as?: ElementType;
  $collapsible?: boolean;
  $type?: 'main' | 'sqlSidebar';
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  indicatorDir?: HorizontalDirection;
};

export const SidebarTitleWrapper = forwardRef<
  HTMLButtonElement,
  SidebarTitleWrapperProps
>(({ as, $collapsible = false, $type = 'main', className, ...props }, ref) => {
  const Component = (as ?? 'button') as ElementType;
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
});

SidebarTitleWrapper.displayName = 'SidebarTitleWrapper';

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
