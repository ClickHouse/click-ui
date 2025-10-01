import clsx from "clsx";
import { HorizontalDirection } from "@/components";
import { HTMLAttributes, MouseEvent, ReactNode } from "react";
import { ImageName } from "@/components/Icon/types";
import { Icon } from "@/components/Icon/Icon";
import IconWrapper from "@/components/IconWrapper/IconWrapper";
import styles from "./Badge.module.scss";

export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled"
  | "warning"
  | "info";

export type BadgeSize = "sm" | "md";
export type BadgeType = "opaque" | "solid";

export interface CommonBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** The text content to display in the badge */
  text: ReactNode;
  /** The visual state of the badge */
  state?: BadgeState;
  /** The size of the badge */
  size?: BadgeSize;
  /** The type/style of the badge - opaque has a lighter background, solid has a filled background */
  type?: BadgeType;
  /** Optional icon to display alongside the text */
  icon?: ImageName;
  /** The direction of the icon relative to the text */
  iconDir?: HorizontalDirection;
  /** Whether to truncate content with ellipsis when it overflows */
  ellipsisContent?: boolean;
}

export interface DismissibleBadge extends CommonBadgeProps {
  /** When true, displays a close button on the badge */
  dismissible: true;
  /** Callback function when the close button is clicked */
  onClose: (e: MouseEvent<HTMLOrSVGElement>) => void;
}

export interface NonDismissibleBadge extends CommonBadgeProps {
  /** When false or undefined, the close button is hidden */
  dismissible?: never;
  onClose?: never;
}

export type BadgeProps = NonDismissibleBadge | DismissibleBadge;

export const Badge = ({
  icon,
  iconDir,
  text,
  state = "default",
  size = "md",
  type = "opaque",
  dismissible,
  onClose,
  ellipsisContent = true,
  ...props
}: BadgeProps) => {
  const wrapperClasses = clsx(styles.cuiWrapper, {
    [styles.cuiSm]: size === "sm",
    [styles.cuiMd]: size === "md",
    [styles.cuiOpaque]: type === "opaque",
    [styles.cuiSolid]: type === "solid",
    [styles.cuiDefault]: state === "default",
    [styles.cuiSuccess]: state === "success",
    [styles.cuiNeutral]: state === "neutral",
    [styles.cuiDanger]: state === "danger",
    [styles.cuiDisabled]: state === "disabled",
    [styles.cuiWarning]: state === "warning",
    [styles.cuiInfo]: state === "info",
  });

  const contentClasses = clsx(styles.cuiContent, {
    [styles.cuiSm]: size === "sm",
    [styles.cuiMd]: size === "md",
  });

  const badgeContentClasses = clsx(styles.cuiBadgeContent, {
    [styles.cuiSm]: size === "sm",
    [styles.cuiMd]: size === "md",
    [styles.cuiOpaque]: type === "opaque",
    [styles.cuiSolid]: type === "solid",
    [styles.cuiDefault]: state === "default",
    [styles.cuiSuccess]: state === "success",
    [styles.cuiNeutral]: state === "neutral",
    [styles.cuiDanger]: state === "danger",
    [styles.cuiDisabled]: state === "disabled",
    [styles.cuiWarning]: state === "warning",
    [styles.cuiInfo]: state === "info",
  });

  const closeIconClasses = clsx(styles.cuiCloseIcon, {
    [styles.cuiSm]: size === "sm",
    [styles.cuiMd]: size === "md",
    [styles.cuiOpaque]: type === "opaque",
    [styles.cuiSolid]: type === "solid",
    [styles.cuiDefault]: state === "default",
    [styles.cuiSuccess]: state === "success",
    [styles.cuiNeutral]: state === "neutral",
    [styles.cuiDanger]: state === "danger",
    [styles.cuiDisabled]: state === "disabled",
    [styles.cuiWarning]: state === "warning",
    [styles.cuiInfo]: state === "info",
  });

  return (
    <div
      className={wrapperClasses}
      {...props}
    >
      <div
        className={contentClasses}
        data-testid={`${ellipsisContent ? "ellipsed" : "normal"}-badge-content`}
      >
        <IconWrapper
          className={badgeContentClasses}
          icon={icon}
          iconDir={iconDir}
          size={size}
          ellipsisContent={ellipsisContent}
        >
          {text}
        </IconWrapper>
        {dismissible && (
          <Icon
            name="cross"
            className={closeIconClasses}
            onClick={onClose}
            aria-label="close"
          />
        )}
      </div>
    </div>
  );
};
