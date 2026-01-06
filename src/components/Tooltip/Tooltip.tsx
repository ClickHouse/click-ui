"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { HTMLAttributes, CSSProperties } from "react";
import clsx from "clsx";
import styles from "./Tooltip.module.scss";

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

const TooltipContent = ({
  showArrow,
  children,
  sideOffset = 6,
  maxWidth,
  ...props
}: TooltipContentProps) => {
  const contentStyle: CSSProperties = maxWidth
    ? ({ "--max-width": maxWidth } as CSSProperties)
    : {};

  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        className={clsx(styles.cuiTooltipContent, {
          [styles.cuiTooltipContentWithMaxWidth]: !!maxWidth,
        })}
        style={contentStyle}
        sideOffset={sideOffset}
        data-cui-has-max-width={!!maxWidth}
        {...props}
      >
        {showArrow && (
          <RadixTooltip.Arrow
            className={styles.cuiTooltipArrow}
            width={20}
            height={8}
          />
        )}
        {children}
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
};
TooltipContent.displayName = "TooltipContent";
Tooltip.Content = TooltipContent;
