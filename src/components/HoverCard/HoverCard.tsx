"use client";

import * as RadixHoverCard from "@radix-ui/react-hover-card";
import { Arrow, GenericPopoverMenuPanel } from "@/components/GenericMenu";
import { ReactNode } from "react";
import PopoverArrow from "@/components/icons/PopoverArrow";
import styles from "./HoverCard.module.scss";

export const HoverCard = ({ children, ...props }: RadixHoverCard.HoverCardProps) => {
  return <RadixHoverCard.Root {...props}>{children}</RadixHoverCard.Root>;
};

const HoverCardTrigger = ({
  children,
  ...props
}: RadixHoverCard.HoverCardTriggerProps) => {
  return (
    <RadixHoverCard.Trigger
      className={styles.cuiTrigger}
      {...props}
    >
      {children}
    </RadixHoverCard.Trigger>
  );
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
        type="hover-card"
        showArrow={showArrow}
        {...props}
      >
        {showArrow && (
          <Arrow
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
