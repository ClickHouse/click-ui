import clsx from "clsx";
import { HorizontalDirection } from "@/components";
import { HTMLAttributes, MouseEvent, ReactNode } from "react";
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

export interface CommonBadgeProps extends HTMLAttributes<HTMLDivElement> {
  text: ReactNode;
  state?: BadgeState;
  size?: BadgeSize;
  type?: BadgeType;
  icon?: ImageName;
  iconDir?: HorizontalDirection;
  ellipsisContent?: boolean;
}

export interface DismissibleBadge extends CommonBadgeProps {
  dismissible: true;
  onClose: (e: MouseEvent<HTMLOrSVGElement>) => void;
}

export interface NonDismissibleBadge extends CommonBadgeProps {
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
