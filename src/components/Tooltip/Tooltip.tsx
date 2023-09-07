import * as RadixTooltip from "@radix-ui/react-tooltip";
import { useEffect, useState } from "react";
import styled from "styled-components";

export const TooltipProvider = ({
  children,
  ...props
}: RadixTooltip.TooltipProviderProps) => {
  return <RadixTooltip.Provider {...props}>{children}</RadixTooltip.Provider>;
};

interface TooltipProps extends RadixTooltip.TooltipProps {
  disabled?: boolean;
}
export const Tooltip = ({
  children,
  onOpenChange: onOpenChangeProp,
  open: openProp,
  disabled,
  ...props
}: TooltipProps) => {
  const [open, setOpen] = useState(openProp);
  const onOpenChange = (open: boolean) => {
    if (onOpenChangeProp) {
      onOpenChangeProp(open);
    }
    setOpen(open);
  };
  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);
  return (
    <RadixTooltip.Root
      open={open && !disabled}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
    </RadixTooltip.Root>
  );
};

const Trigger = styled(RadixTooltip.Trigger)`
  width: fit-content;
`;
const TooltipTrigger = (props: RadixTooltip.TooltipTriggerProps) => {
  return (
    <Trigger
      asChild
      {...props}
    />
  );
};
TooltipTrigger.displayName = "TooltipTrigger";
Tooltip.Trigger = TooltipTrigger;
interface TooltipContentProps extends RadixTooltip.TooltipContentProps {
  showArrow?: boolean;
}

const RadixTooltipContent = styled(RadixTooltip.Content)`
  display: flex;
  align-items: flex-start;
  ${({ theme }) => `
    padding: ${theme.click.tooltip.space.y} ${theme.click.tooltip.space.x};
    color: ${theme.click.tooltip.color.label.default};
    background: ${theme.click.tooltip.color.background.default};
    border-radius: ${theme.click.tooltip.radii.all};
    font: ${theme.click.tooltip.typography.label.default};
  `}
`;

const Arrow = styled.svg`
  ${({ theme }) => `
    fill: ${theme.click.tooltip.color.background.default};
  `};
`;

const TooltipContent = ({ showArrow, children, ...props }: TooltipContentProps) => {
  return (
    <RadixTooltip.Portal>
      <RadixTooltipContent {...props}>
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
