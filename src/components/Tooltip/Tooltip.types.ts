import * as RadixTooltip from '@radix-ui/react-tooltip';

export interface TooltipProps extends RadixTooltip.TooltipProps {
  disabled?: boolean;
}

export interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  showArrow?: boolean;
  maxWidth?: string;
}
