import * as RadixTooltip from '@radix-ui/react-tooltip';
import { Slot } from '@radix-ui/react-slot';
import { CSSProperties, forwardRef } from 'react';
import { cn } from '@/lib/cva';
import { useResolvedPortalContainer } from '@/providers/PortalContext';
import { TooltipContentProps, TooltipProps, TooltipTriggerProps } from './Tooltip.types';
import styles from './Tooltip.module.css';

export const Tooltip = ({ children, open, disabled, ...props }: TooltipProps) => {
  return (
    <RadixTooltip.Root
      open={disabled ? false : open}
      {...props}
    >
      {children}
    </RadixTooltip.Root>
  );
};

const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild, children, ...props }, ref) => {
    return (
      <RadixTooltip.Trigger asChild>
        <Slot
          ref={ref}
          {...props}
        >
          {asChild ? children : <div>{children}</div>}
        </Slot>
      </RadixTooltip.Trigger>
    );
  }
);
TooltipTrigger.displayName = 'TooltipTrigger';
Tooltip.Trigger = TooltipTrigger;

const TooltipContent = ({
  showArrow,
  children,
  sideOffset = 6,
  maxWidth,
  className,
  style,
  container,
  ...props
}: TooltipContentProps) => {
  const portalContainer = useResolvedPortalContainer(container);

  return (
    <RadixTooltip.Portal container={portalContainer}>
      <RadixTooltip.Content
        sideOffset={sideOffset}
        style={
          {
            ...(maxWidth ? { '--tooltip-max-width': maxWidth } : {}),
            ...style,
          } as CSSProperties
        }
        {...props}
        className={cn(styles.content, className)}
      >
        {showArrow && (
          <RadixTooltip.Arrow
            className={styles.arrow}
            width={20}
            height={8}
          />
        )}
        {children}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
};
TooltipContent.displayName = 'TooltipContent';
Tooltip.Content = TooltipContent;
