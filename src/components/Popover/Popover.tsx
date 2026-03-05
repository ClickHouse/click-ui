import * as RadixPopover from '@radix-ui/react-popover';
import { Arrow, GenericMenuPanel } from '../GenericMenu';
import { styled } from 'styled-components';
import { ReactNode } from 'react';
import { Icon } from '@/components/Icon/Icon';
import { EmptyButton } from '../commonElement';
import Popover_Arrow from '@/components/Assets/Icons/Popover-Arrow';

export const Popover = ({ children, ...props }: RadixPopover.PopoverProps) => {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};

const Trigger = styled(RadixPopover.Trigger)`
  background: inherit;
  border: none;
  color: inherit;
  cursor: pointer;
  font: inherit;
  width: fit-content;
`;
interface TriggerProps extends RadixPopover.PopoverTriggerProps {
  anchor?: ReactNode;
}

const PopoverTrigger = ({ anchor, children, ...props }: TriggerProps) => {
  return (
    <>
      <Trigger
        asChild
        {...props}
      >
        <div>{children}</div>
      </Trigger>
      {anchor && <RadixPopover.Anchor asChild>{anchor}</RadixPopover.Anchor>}
    </>
  );
};
PopoverTrigger.displayName = 'PopoverTrigger';
Popover.Trigger = PopoverTrigger;

interface PopoverContentProps extends RadixPopover.PopoverContentProps {
  /** Whether to show an arrow pointing to the trigger element */
  showArrow?: boolean;
  /** Whether to show a close button in the popover */
  showClose?: boolean;
  /** Forces the popover to mount in the DOM even when closed */
  forceMount?: true;
  /** Custom container element for the popover portal */
  container?: HTMLElement | null;
}

const MenuPanel = styled(GenericMenuPanel)<{ $showClose?: boolean }>`
  display: block;
  padding: ${({ theme }) => theme.click.popover.space.y}
    ${({ theme }) => theme.click.popover.space.x};
  background-color: ${({ theme }) => theme.click.popover.color.panel.background.default};
  border: 1px solid ${({ theme }) => theme.click.popover.color.panel.stroke.default};
  border-radius: ${({ theme }) => theme.click.popover.radii.all};
  box-shadow: ${({ theme }) => theme.click.popover.shadow.default};

  ${({ $showClose }) => ($showClose ? 'padding-top: 1rem;' : '')};
`;

const CloseButton = styled(EmptyButton)`
  position: absolute;
  top: ${({ theme }) => theme.click.popover.space.y};
  right: ${({ theme }) => theme.click.popover.space.x};
  width: ${({ theme }) => theme.click.popover.icon.size.width};
  height: ${({ theme }) => theme.click.popover.icon.size.height};
`;

const PopoverContent = ({
  children,
  showArrow,
  showClose,
  forceMount,
  container,
  ...props
}: PopoverContentProps) => {
  return (
    <RadixPopover.Portal
      forceMount={forceMount}
      container={container}
    >
      <MenuPanel
        as={RadixPopover.Content}
        $type="popover"
        $showClose={showClose}
        $showArrow={showArrow}
        sideOffset={4}
        {...props}
      >
        {showClose && (
          <CloseButton
            as={RadixPopover.Close}
            asChild
          >
            <Icon name="cross" />
          </CloseButton>
        )}
        {showArrow && (
          <Arrow
            asChild
            as={RadixPopover.Arrow}
            width={20}
            height={10}
          >
            <Popover_Arrow />
          </Arrow>
        )}
        {children}
      </MenuPanel>
    </RadixPopover.Portal>
  );
};
PopoverContent.displayName = 'PopoverContent';
Popover.Content = PopoverContent;
