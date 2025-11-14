"use client";

import { HTMLAttributes, ReactNode, forwardRef } from "react";
import clsx from "clsx";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "@/components";
import { capitalize } from "@/utils/capitalize";
import styles from "./SidebarNavigationItem.module.scss";

export interface SidebarNavigationItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The label content to display */
  label: ReactNode;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Nesting level for indentation */
  level?: number;
  /** Icon to display before the label */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The sidebar style type */
  type?: "main" | "sqlSidebar";
  collapsible?: boolean;
}

const SidebarNavigationItem = forwardRef<HTMLDivElement, SidebarNavigationItemProps>(
  (
    { label, level = 0, icon, selected, iconDir, disabled, type = "main", collapsible = false, className, ...props },
    ref
  ) => {
    const typeClass = `cuiType${capitalize(type)}`;
    const selectedClass = selected ? "cuiSelected" : undefined;
    const disabledClass = disabled ? "cuiDisabled" : undefined;

    return (
      <div
        data-selected={selected}
        ref={ref}
        aria-disabled={disabled}
        className={clsx(
          styles.cuiSidebarItemWrapper,
          styles[typeClass],
          selectedClass && styles[selectedClass],
          disabledClass && styles[disabledClass],
          {
            [styles.cuiItem]: level === 0,
            [styles.cuiSubItem]: level > 0,
            [styles.cuiCollapsible]: collapsible,
          },
          className
        )}
        data-cui-type={type}
        data-cui-selected={selected ? "true" : undefined}
        data-cui-disabled={disabled ? "true" : undefined}
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
