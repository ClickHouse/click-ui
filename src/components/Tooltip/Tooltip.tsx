import * as RadixTooltip from '@radix-ui/react-tooltip';
import { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '@/lib/cva';
import { TooltipProps } from './Tooltip.types';
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

const TooltipTrigger = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <RadixTooltip.Trigger asChild>
      <div {...props} />
    </RadixTooltip.Trigger>
  );
};
TooltipTrigger.displayName = 'TooltipTrigger';
Tooltip.Trigger = TooltipTrigger;
interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  /** Whether to show an arrow pointing to the trigger element */
  showArrow?: boolean;
  /** Maximum width of the tooltip content */
  maxWidth?: string;
}

const TooltipContent = ({
  showArrow,
  children,
  sideOffset = 6,
  maxWidth,
  className,
  style,
  ...props
}: TooltipContentProps) => {
  return (
    <RadixTooltip.Portal>
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
