import clsx from "clsx";
import { HorizontalDirection } from "@/components";
import { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { ImageName } from "@/components/Icon/types";
import { Icon } from "@/components/Icon/Icon";
import IconWrapper from "@/components/IconWrapper/IconWrapper";
import { capitalize } from "@/utils/capitalize";
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

export interface CommonBadgeProps extends ComponentPropsWithoutRef<"div"> {
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
  className,
  ...props
}: BadgeProps) => {
  const sizeClass = `cuiSize${capitalize(size)}`;
  const typeClass = `cuiType${capitalize(type)}`;
  const stateClass = `cuiState${capitalize(state)}`;

  return (
    <div
      className={clsx(
        styles.cuiWrapper,
        styles[sizeClass],
        styles[typeClass],
        styles[stateClass],
        className
      )}
      data-cui-size={size}
      data-cui-type={type}
      data-cui-state={state}
      {...props}
    >
      <div
        className={styles.cuiContent}
        data-testid={`${ellipsisContent ? "ellipsed" : "normal"}-badge-content`}
      >
        <IconWrapper
          className={styles.cuiBadgeContent}
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
            className={styles.cuiCloseIcon}
            onClick={onClose}
            aria-label="close"
          />
        )}
      </div>
    </div>
  );
};
