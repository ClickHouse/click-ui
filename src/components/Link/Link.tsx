import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { Icon } from '@/components/Icon';
import { cn, cva } from '@/lib/cva';

import type { LinkProps } from './Link.types';

import styles from './Link.module.css';

const linkVariants = cva(styles.link, {
  variants: {
    size: {
      xs: styles['link_size_xs'],
      sm: styles['link_size_sm'],
      md: styles['link_size_md'],
      lg: styles['link_size_lg'],
    },
    weight: {
      normal: styles['link_weight_normal'],
      medium: styles['link_weight_medium'],
      semibold: styles['link_weight_semibold'],
      bold: styles['link_weight_bold'],
      mono: styles['link_weight_mono'],
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

const iconVariants = cva(styles['link__icon'], {
  variants: {
    size: {
      xs: styles['link__icon_size_xs'],
      sm: styles['link__icon_size_sm'],
      md: styles['link__icon_size_md'],
      lg: styles['link__icon_size_lg'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type LinkPolymorphicComponent = <T extends ElementType = 'a'>(
  props: Omit<ComponentProps<T>, keyof LinkProps<T>> & LinkProps<T>
) => ReactNode;

const _Link = <T extends ElementType = 'a'>(
  {
    size = 'md',
    weight = 'normal',
    onClick,
    icon,
    children,
    component,
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof LinkProps<T>> & LinkProps<T> & { className?: string },
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'a';
  return (
    <Component
      ref={ref}
      onClick={onClick}
      {...props}
      className={cn(linkVariants({ size, weight }), className)}
    >
      {children}
      {icon && (
        <span>
          <Icon
            name={icon}
            className={cn(iconVariants({ size }))}
            data-testid={icon}
          />
        </span>
      )}
    </Component>
  );
};
export const Link: LinkPolymorphicComponent = forwardRef(_Link);
