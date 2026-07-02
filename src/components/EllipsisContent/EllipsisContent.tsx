import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
  useState,
} from 'react';
import { mergeRefs } from '@/utils/mergeRefs';
import { cn } from '@/lib/cva';
import { Tooltip } from '@/components/Tooltip';
import styles from './EllipsisContent.module.css';

export interface EllipsisContentProps<T extends ElementType = 'div'> {
  component?: T;
}

type EllipsisPolymorphicComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentProps<T>, keyof EllipsisContentProps<T>> & EllipsisContentProps<T>
) => ReactNode;

const EllipsisContentComponent = <T extends ElementType = 'div'>(
  {
    component,
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof EllipsisContentProps<T>> &
    EllipsisContentProps<T> & { className?: string },
  ref: ComponentPropsWithRef<T>['ref']
) => {
  const Component = component ?? 'div';
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);

  const content = (
    <Component
      ref={mergeRefs([
        ref,
        node => {
          if (node) {
            setTooltipContent(
              node.scrollWidth > node.clientWidth ? node.innerText : null
            );
          }
        },
      ])}
      {...props}
      className={cn(styles['ellipsis-content'], className)}
    />
  );

  if (!tooltipContent) {
    return content;
  }

  return (
    <Tooltip>
      <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>
      <Tooltip.Content>{tooltipContent}</Tooltip.Content>
    </Tooltip>
  );
};

export const EllipsisContent: EllipsisPolymorphicComponent = forwardRef(
  EllipsisContentComponent
);
