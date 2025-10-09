"use client";

import { HTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "@/components";
import styles from "./SidebarNavigationItem.module.scss";

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  level?: number;
  icon?: IconName;
  iconDir?: HorizontalDirection;
  type?: "main" | "sqlSidebar";
}

const SidebarNavigationItem = forwardRef<HTMLDivElement, SidebarNavigationItemProps>(
  (
    { label, level = 0, icon, selected, iconDir, disabled, type = "main", ...props },
    ref
  ) => {
    return (
      <div
        data-selected={selected}
        ref={ref}
        aria-disabled={disabled}
        className={clsx(styles.cuiSidebarItemWrapper, {
          [styles.cuiItem]: level === 0,
          [styles.cuiSubItem]: level > 0,
          [styles.cuiMain]: type === "main",
          [styles.cuiSqlSidebar]: type === "sqlSidebar",
          [styles.cuiSelected]: selected,
          [styles.cuiDisabled]: disabled,
        })}
        {...props}
      >
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {label}
        </IconWrapper>
      </div>
    );
  }
);

export { SidebarNavigationItem };
