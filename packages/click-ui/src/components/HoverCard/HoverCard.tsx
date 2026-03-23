import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { ReactNode } from 'react';
import { Arrow, GenericPopoverMenuPanel } from '@/components/GenericMenu';
import { styled } from 'styled-components';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';

export interface HoverCardContentProps extends RadixHoverCard.HoverCardContentProps {
  showArrow?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
  children: ReactNode;
}

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
HoverCardTrigger.displayName = 'HoverCardTrigger';
HoverCard.Trigger = HoverCardTrigger;

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
            <Popover_Arrow />
          </Arrow>
        )}
        {children}
      </GenericPopoverMenuPanel>
    </RadixHoverCard.Portal>
  );
};
HoverCardContent.displayName = 'HoverCardContent';
HoverCard.Content = HoverCardContent;
