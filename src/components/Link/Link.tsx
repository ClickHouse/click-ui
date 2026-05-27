import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactEventHandler,
  ReactNode,
  forwardRef,
} from 'react';
import { Icon } from '@/components/Icon';
import type { IconName } from '@/components/Icon/Icon.types';
import { cn, cva } from '@/lib/cva';
import styles from './Link.module.css';
import type { TextSize, TextWeight } from '@/components/Text';

export interface LinkProps<T extends ElementType = 'a'> {
  /** The font size of the link text */
  size?: TextSize;
  /** The font weight of the link text */
  weight?: TextWeight;
  /** Click event handler */
  onClick?: ReactEventHandler;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Optional icon to display after the link text */
  icon?: IconName;
  /** Custom component to render as the link element */
  component?: T;
}

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

const externalIconVariants = cva('', {
  variants: {
    size: {
      xs: styles['external-icon_size_xs'],
      sm: styles['external-icon_size_sm'],
      md: styles['external-icon_size_md'],
      lg: styles['external-icon_size_lg'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type LinkPolymorphicComponent = <T extends ElementType = 'a'>(
  props: Omit<ComponentProps<T>, keyof T> & LinkProps<T>
) => ReactNode;

/** Component for linking to other pages or sections from with body text */
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
  }: Omit<ComponentProps<T>, keyof T> & LinkProps<T> & { className?: string },
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
            className={cn('external-icon', externalIconVariants({ size }))}
            data-testid={icon}
          />
        </span>
      )}
    </Component>
  );
};
export const Link: LinkPolymorphicComponent = forwardRef(_Link);
