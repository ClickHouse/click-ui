import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { Arrow, GenericPopoverMenuPanel } from "../GenericMenu";
import styled from "styled-components";
import { ReactNode } from "react";
import PopoverArrow from "../icons/PopoverArrow";

export const HoverCard = ({ children, ...props }: RadixHoverCard.HoverCardProps) => {
  return <RadixHoverCard.Root {...props}>{children}</RadixHoverCard.Root>;
};

const Trigger = styled(RadixHoverCard.Trigger)`
  width: fit-content;
`;

const HoverCardTrigger = ({
  children,
  ...props
}: RadixHoverCard.HoverCardTriggerProps) => {
  return <Trigger {...props}>{children}</Trigger>;
};
HoverCardTrigger.displayName = "HoverCardTrigger";
HoverCard.Trigger = HoverCardTrigger;

interface HoverCardContentProps extends RadixHoverCard.HoverCardContentProps {
  showArrow?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
  children: ReactNode;
}

const HoverCardContent = ({
  children,
  showArrow,
  forceMount,
  container,
  ...props
}: HoverCardContentProps) => {
  return (
    <RadixHoverCard.Portal
      forceMount={forceMount}
      container={container}
    >
      <GenericPopoverMenuPanel
        as={RadixHoverCard.Content}
        $type="hover-card"
        $showArrow={showArrow}
        {...props}
      >
        {showArrow && (
          <Arrow
            asChild
            as={RadixHoverCard.Arrow}
            width={15}
            height={10}
          >
            <PopoverArrow />
          </Arrow>
        )}
        {children}
      </GenericPopoverMenuPanel>
    </RadixHoverCard.Portal>
  );
};
HoverCardContent.displayName = "HoverCardContent";
HoverCard.Content = HoverCardContent;
