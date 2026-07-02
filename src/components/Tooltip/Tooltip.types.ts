import * as RadixTooltip from '@radix-ui/react-tooltip';
import { HTMLAttributes } from 'react';

export interface TooltipProps extends RadixTooltip.TooltipProps {
  disabled?: boolean;
}

export interface TooltipTriggerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Use the single child element as the trigger instead of wrapping it in a
   * `div`. The child must forward `ref` and props.
   */
  asChild?: boolean;
}

export interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  showArrow?: boolean;
  maxWidth?: string;
  container?: HTMLElement | null;
}
