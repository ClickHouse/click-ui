import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { cn } from '@/lib/cva';
import styles from './GridCenter.module.css';

interface GridCenterOwnProps {
  /** Render as a different element/component. */
  as?: ElementType;
}

export type GridCenterProps<T extends ElementType = 'div'> = Omit<
  ComponentProps<T>,
  keyof GridCenterOwnProps
> &
  GridCenterOwnProps;

type GridCenterPolymorphicComponent = <T extends ElementType = 'div'>(
  props: GridCenterProps<T>
) => ReactNode;

const _GridCenter = <T extends ElementType = 'div'>(
  { as, className, ...props }: GridCenterProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = as ?? 'div';
  return (
    <Component
      ref={ref}
      {...props}
      className={cn(styles['grid-center'], className)}
    />
  );
};

export const GridCenter: GridCenterPolymorphicComponent = forwardRef(_GridCenter);

(GridCenter as { displayName?: string }).displayName = 'GridCenter';
