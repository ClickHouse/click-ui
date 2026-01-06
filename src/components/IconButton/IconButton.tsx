"use client";

import { Icon, IconName } from "@/components";
import { capitalize } from "@/utils/capitalize";
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
  ({ type = "primary", icon, size = "default", className, ...props }, ref) => {
    const iconName = icon ? icon.toString() : "unknown icon";
    const typeClass = `cuiType${capitalize(type)}`;
    const sizeClass = `cuiSize${capitalize(size)}`;

    return (
      <button
        className={clsx(
          styles.cuiIconButton,
          styles[typeClass],
          styles[sizeClass],
          className
        )}
        ref={ref}
        role="button"
        aria-label={iconName}
        data-cui-type={type}
        data-cui-size={size}
        {...props}
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
