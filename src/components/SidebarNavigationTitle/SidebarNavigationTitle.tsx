"use client";

import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "@/components";
import styles from "./SidebarNavigationTitle.module.scss";

export interface SidebarNavigationTitleProps extends HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  selected?: boolean;
  icon?: IconName;
  iconDir?: HorizontalDirection;
  type?: "main" | "sqlSidebar";
  collapsible?: boolean;
}

export const SidebarNavigationTitle = ({
  label,
  icon,
  iconDir,
  selected,
  type = "main",
  collapsible = false,
  className,
  ...props
}: SidebarNavigationTitleProps) => {
  return (
    <button
      data-selected={selected}
      className={clsx(styles.cuiSidebarTitleWrapper, {
        [styles.cuiMain]: type === "main",
        [styles.cuiSqlSidebar]: type === "sqlSidebar",
        [styles.cuiCollapsible]: collapsible,
      }, className)}
      {...props}
    >
      <IconWrapper
        icon={icon}
        iconDir={iconDir}
      >
        {label}
      </IconWrapper>
    </button>
  );
};
