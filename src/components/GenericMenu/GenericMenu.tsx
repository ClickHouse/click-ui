import { ComponentPropsWithRef, ElementType, ReactNode, forwardRef } from 'react';
import { cn, cva } from '@/lib/cva';
import styles from './GenericMenu.module.css';

const panelVariants = cva(styles['generic-menu-panel'], {
  variants: {
    type: {
      popover: styles['generic-menu-panel_type_popover'],
      'dropdown-menu': styles['generic-menu-panel_type_dropdown-menu'],
      'context-menu': styles['generic-menu-panel_type_context-menu'],
    },
    showArrow: {
      true: styles['generic-menu-panel_show-arrow'],
      false: '',
    },
  },
  defaultVariants: {
    showArrow: false,
  },
});

type GenericMenuPanelOwnProps = {
  type: 'popover' | 'dropdown-menu' | 'context-menu';
  showArrow?: boolean;
};

type GenericMenuPanelComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentPropsWithRef<T>, keyof GenericMenuPanelOwnProps | 'as'> &
    GenericMenuPanelOwnProps & { as?: T }
) => ReactNode;

const _GenericMenuPanel = <T extends ElementType = 'div'>(
  {
    as,
    type,
    showArrow,
    className,
    ...props
  }: Omit<ComponentPropsWithRef<T>, keyof GenericMenuPanelOwnProps | 'as'> &
    GenericMenuPanelOwnProps & { as?: T },
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'div';
  return (
    <Component
      ref={ref}
      {...props}
      className={cn(panelVariants({ type, showArrow }), className)}
    />
  );
};

export const GenericMenuPanel: GenericMenuPanelComponent = forwardRef(_GenericMenuPanel);

const popoverPanelVariants = cva(styles['generic-popover-menu-panel'], {
  variants: {
    type: {
      popover: styles['generic-popover-menu-panel_type_popover'],
      'hover-card': styles['generic-popover-menu-panel_type_hover-card'],
    },
    showArrow: {
      true: styles['generic-popover-menu-panel_show-arrow'],
      false: '',
    },
  },
  defaultVariants: {
    showArrow: false,
  },
});

type GenericPopoverMenuPanelOwnProps = {
  type: 'popover' | 'hover-card';
  showArrow?: boolean;
};

type GenericPopoverMenuPanelComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentPropsWithRef<T>, keyof GenericPopoverMenuPanelOwnProps | 'as'> &
    GenericPopoverMenuPanelOwnProps & { as?: T }
) => ReactNode;

const _GenericPopoverMenuPanel = <T extends ElementType = 'div'>(
  {
    as,
    type,
    showArrow,
    className,
    ...props
  }: Omit<ComponentPropsWithRef<T>, keyof GenericPopoverMenuPanelOwnProps | 'as'> &
    GenericPopoverMenuPanelOwnProps & { as?: T },
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'div';
  return (
    <Component
      ref={ref}
      {...props}
      className={cn(popoverPanelVariants({ type, showArrow }), className)}
    />
  );
};

export const GenericPopoverMenuPanel: GenericPopoverMenuPanelComponent = forwardRef(
  _GenericPopoverMenuPanel
);

type ArrowComponent = <T extends ElementType = 'svg'>(
  props: Omit<ComponentPropsWithRef<T>, 'as'> & { as?: T }
) => ReactNode;

const _Arrow = <T extends ElementType = 'svg'>(
  { as, className, ...props }: Omit<ComponentPropsWithRef<T>, 'as'> & { as?: T },
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'svg';
  return (
    <Component
      ref={ref}
      {...props}
      className={cn(styles.arrow, className)}
    />
  );
};

export const Arrow: ArrowComponent = forwardRef(_Arrow);

const itemVariants = cva(styles['generic-menu-item'], {
  variants: {
    type: {
      default: styles['generic-menu-item_type_default'],
      danger: styles['generic-menu-item_type_danger'],
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

type GenericMenuItemOwnProps = {
  type?: 'default' | 'danger';
};

type GenericMenuItemComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentPropsWithRef<T>, keyof GenericMenuItemOwnProps | 'as'> &
    GenericMenuItemOwnProps & { as?: T }
) => ReactNode;

const _GenericMenuItem = <T extends ElementType = 'div'>(
  {
    as,
    type = 'default',
    className,
    ...props
  }: Omit<ComponentPropsWithRef<T>, keyof GenericMenuItemOwnProps | 'as'> &
    GenericMenuItemOwnProps & { as?: T },
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'div';
  return (
    <Component
      ref={ref}
      {...props}
      className={cn(itemVariants({ type }), className)}
    />
  );
};

export const GenericMenuItem: GenericMenuItemComponent = forwardRef(_GenericMenuItem);
