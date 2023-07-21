import * as RadixPopover from "@radix-ui/react-popover";
import { GenericMenuPanel } from "./GenericMenu";
import styled from "styled-components";
import { ReactNode } from "react";

const Popover = ({ children, ...props }: RadixPopover.PopoverProps) => {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};

const Trigger = styled(RadixPopover.Trigger)`
  width: fit-content;
`;

interface TriggerProps extends RadixPopover.PopoverTriggerProps {
  anchor?: ReactNode;
}

const PopoverTrigger = ({ children, anchor, ...props }: TriggerProps) => {
  return (
    <>
      <Trigger
        asChild
        {...props}
      >
        {children}
      </Trigger>
      {anchor && <RadixPopover.Anchor asChild>{anchor}</RadixPopover.Anchor>}
    </>
  );
};
PopoverTrigger.displayName = "PopoverTrigger";
Popover.Trigger = PopoverTrigger;

interface PopoverContentProps extends RadixPopover.PopoverContentProps {
  showArrow?: boolean;
  showClose?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
}
const Arrow = styled(RadixPopover.Arrow)`
  ${({ theme }) => `
    fill: ${theme.click.genericMenu.panel.color.background.default};
    stroke: ${theme.click.genericMenu.panel.color.stroke.default};
  `}
`;

const MenuPanel = styled(GenericMenuPanel)`
  padding: 0.5rem 1rem;
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
        type="popover"
        {...props}
      >
        {showClose && <RadixPopover.Close />}
        {showArrow && (
          <Arrow asChild>
            <Icon
              name="arrow"
              size="md"
            />
          </Arrow>
        )}
        {children}
      </MenuPanel>
    </RadixPopover.Portal>
  );
};
PopoverContent.displayName = "PopoverContent";
Popover.Content = PopoverContent;

export default Popover;
