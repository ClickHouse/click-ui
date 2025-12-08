import * as RadixTooltip from "@radix-ui/react-tooltip";
import { HTMLAttributes } from "react";
import { styled } from "styled-components";

export interface TooltipProps extends RadixTooltip.TooltipProps {
  /** Whether the tooltip is disabled and should not appear */
  disabled?: boolean;
}

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
TooltipTrigger.displayName = "TooltipTrigger";
Tooltip.Trigger = TooltipTrigger;
interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  /** Whether to show an arrow pointing to the trigger element */
  showArrow?: boolean;
  /** Maximum width of the tooltip content */
  maxWidth?: string;
}

const RadixTooltipContent = styled(RadixTooltip.Content)<{ $maxWidth?: string }>`
  display: flex;
  align-items: flex-start;
  ${({ theme, $maxWidth }) => `
    padding: ${theme.click.tooltip.space.y} ${theme.click.tooltip.space.x};
    color: ${theme.click.tooltip.color.label.default};
    background: ${theme.click.tooltip.color.background.default};
    border-radius: ${theme.click.tooltip.radii.all};
    font: ${theme.click.tooltip.typography.label.default};
    white-space: pre-wrap;
    ${$maxWidth && `max-width: ${$maxWidth}`};
  `}
`;

const Arrow = styled.svg`
  ${({ theme }) => `
    fill: ${theme.click.tooltip.color.background.default};
  `};
`;

const TooltipContent = ({
  showArrow,
  children,
  sideOffset = 6,
  maxWidth,
  ...props
}: TooltipContentProps) => {
  return (
    <RadixTooltip.Portal>
      <RadixTooltipContent
        sideOffset={sideOffset}
        $maxWidth={maxWidth}
        {...props}
      >
        {showArrow && (
          <Arrow
            as={RadixTooltip.Arrow}
            width={20}
            height={8}
          />
        )}
        {children}
      </RadixTooltipContent>
    </RadixTooltip.Portal>
  );
};
TooltipContent.displayName = "TooltipContent";
Tooltip.Content = TooltipContent;
