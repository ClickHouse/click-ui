import * as RadixTooltip from '@radix-ui/react-tooltip';

export interface TooltipProps extends RadixTooltip.TooltipProps {
  disabled?: boolean;
}

export interface TooltipTriggerProps extends RadixTooltip.TooltipTriggerProps {
  /**
   * Merge props into the child instead of rendering the default `button`.
   *
   * **Potentially breaking:** `Tooltip.Trigger` now renders a
   * `<button type="button">` by default (previously a `div`). Pass `asChild`
   * when the child is already a button or link (`Button`, `IconButton`,
   * `Link`, `<a>`). Otherwise you get a nested button, which is invalid HTML
   * and a worse accessible name. The child must forward `ref` and props.
   */
  asChild?: boolean;
}

export interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  showArrow?: boolean;
  maxWidth?: string;
  container?: HTMLElement | null;
}
