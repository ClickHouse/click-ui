import * as RadixPopover from "@radix-ui/react-popover";
import { ReactNode } from "react";
import clsx from "clsx";
import { Icon } from "@/components";
import { EmptyButton } from "@/components/commonElement";
import PopoverArrow from "@/components/icons/PopoverArrow";
import styles from "./Popover.module.scss";

export const Popover = ({ children, ...props }: RadixPopover.PopoverProps) => {
  return <RadixPopover.Root {...props}>{children}</RadixPopover.Root>;
};

interface TriggerProps extends RadixPopover.PopoverTriggerProps {
  anchor?: ReactNode;
}

const PopoverTrigger = ({ anchor, children, ...props }: TriggerProps) => {
  return (
    <>
      <RadixPopover.Trigger
        className={styles.cuiTrigger}
        asChild
        {...props}
      >
        <div>{children}</div>
      </RadixPopover.Trigger>
      {anchor && <RadixPopover.Anchor asChild>{anchor}</RadixPopover.Anchor>}
    </>
  );
};
PopoverTrigger.displayName = "PopoverTrigger";
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
      <RadixPopover.Content
        className={clsx(styles.cuiMenuPanel, {
          [styles.cuiShowClose]: showClose,
        })}
        sideOffset={4}
        {...props}
      >
        {showClose && (
          <RadixPopover.Close
            className={styles.cuiCloseButton}
            asChild
          >
            <EmptyButton>
              <Icon name="cross" />
            </EmptyButton>
          </RadixPopover.Close>
        )}
        {showArrow && (
          <RadixPopover.Arrow
            width={20}
            height={10}
            asChild
          >
            <PopoverArrow />
          </RadixPopover.Arrow>
        )}
        {children}
      </RadixPopover.Content>
    </RadixPopover.Portal>
  );
};
PopoverContent.displayName = "PopoverContent";
Popover.Content = PopoverContent;
