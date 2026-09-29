import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from 'react';
import { cn } from '@/lib/cva';
import { TextTruncateProps } from './TextTruncate.types';
import styles from './TextTruncate.module.css';

type TextTruncatePolymorphicComponent = <T extends ElementType = 'span'>(
  props: Omit<ComponentProps<T>, keyof TextTruncateProps<T>> & TextTruncateProps<T>
) => ReactNode;

const _TextTruncate = <T extends ElementType = 'span'>(
  {
    component,
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof TextTruncateProps<T>> & TextTruncateProps<T>,
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'span';

  return (
    <Component
      ref={ref}
      {...props}
      className={cn(styles['text-truncate'], className)}
    />
  );
};

_TextTruncate.displayName = 'TextTruncate';

export const TextTruncate: TextTruncatePolymorphicComponent = forwardRef(_TextTruncate);
