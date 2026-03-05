import * as RadixHoverCard from '@radix-ui/react-hover-card';
import { Arrow, GenericPopoverMenuPanel } from '../GenericMenu';
import { styled } from 'styled-components';
import { ReactNode } from 'react';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';

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

interface HoverCardContentProps extends RadixHoverCard.HoverCardContentProps {
  /** Whether to show the arrow pointing to the trigger */
  showArrow?: boolean;
  /** Whether to force mount the content */
  forceMount?: true;
  /** Container element to portal the hover card into */
  container?: HTMLElement | null;
  /** The content to display in the hover card */
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
