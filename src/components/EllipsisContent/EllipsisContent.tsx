import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { mergeRefs } from '@/utils/mergeRefs';
import { cn } from '@/lib/cva';
import styles from './EllipsisContent.module.css';

export interface EllipsisContentProps<T extends ElementType = 'div'> {
  component?: T;
}

type EllipsisPolymorphicComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentProps<T>, keyof EllipsisContentProps<T>> & EllipsisContentProps<T>
) => ReactNode;

const _EllipsisContent = <T extends ElementType = 'div'>(
  {
    component,
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof EllipsisContentProps<T>> &
    EllipsisContentProps<T> & { className?: string },
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'div';
  return (
    <Component
      ref={mergeRefs([
        ref,
        node => {
          if (node && node.scrollWidth > node.clientWidth) {
            node.title = node.innerText;
          }
        },
      ])}
      {...props}
      className={cn(styles['ellipsis-content'], className)}
    />
  );
};

export const EllipsisContent: EllipsisPolymorphicComponent = forwardRef(_EllipsisContent);
