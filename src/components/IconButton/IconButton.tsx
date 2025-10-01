import { Icon, IconName } from "@/components";
import { HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import styles from "./IconButton.module.scss";

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "xs";
  disabled?: boolean;
  type?: "primary" | "secondary" | "ghost" | "danger" | "info";
  icon: IconName;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ type = "primary", icon, size, ...props }, ref) => {
    const iconName = icon ? icon.toString() : "unknown icon";

    return (
      <button
        {...props}
        className={clsx(
          styles.cuiIconButton,
          {
            [styles.cuiDefault]: !size || size === "default",
            [styles.cuiSm]: size === "sm",
            [styles.cuiXs]: size === "xs",
            [styles.cuiPrimary]: type === "primary",
            [styles.cuiSecondary]: type === "secondary",
            [styles.cuiGhost]: type === "ghost",
            [styles.cuiDanger]: type === "danger",
            [styles.cuiInfo]: type === "info",
          },
          props.className
        )}
        ref={ref}
        role="button"
        aria-label={iconName}
      >
        <Icon
          name={icon}
          size="sm"
        />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
