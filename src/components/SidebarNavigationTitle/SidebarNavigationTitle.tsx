import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "@/components";
import styles from "./SidebarNavigationTitle.module.scss";

export interface SidebarNavigationTitleProps extends HTMLAttributes<HTMLButtonElement> {
  /** The label content to display */
  label: ReactNode;
  /** Whether the title is currently selected */
  selected?: boolean;
  /** Icon to display before the label */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The sidebar style type */
  type?: "main" | "sqlSidebar";
}

export const SidebarNavigationTitle = ({
  label,
  icon,
  iconDir,
  selected,
  type = "main",
  ...props
}: SidebarNavigationTitleProps) => {
  return (
    <button
      data-selected={selected}
      className={clsx(styles.cuiSidebarTitleWrapper, {
        [styles.cuiMain]: type === "main",
        [styles.cuiSqlSidebar]: type === "sqlSidebar",
        [styles.cuiSelected]: selected,
      })}
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
