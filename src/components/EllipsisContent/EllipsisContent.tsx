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
import { EllipsisContentProps } from './EllipsisContent.types';
import styles from './EllipsisContent.module.css';

type EllipsisPolymorphicComponent = <T extends ElementType = 'div'>(
  props: Omit<ComponentProps<T>, keyof EllipsisContentProps<T>> & EllipsisContentProps<T>
) => ReactNode;

const EllipsisContentComponent = <T extends ElementType = 'div'>(
  {
    component,
    className,
    tooltipProps,
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
    <Tooltip disableHoverableContent>
      <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>
      <Tooltip.Content {...tooltipProps}>{tooltipContent}</Tooltip.Content>
    </Tooltip>
  );
};

export const EllipsisContent: EllipsisPolymorphicComponent = forwardRef(
  EllipsisContentComponent
);
