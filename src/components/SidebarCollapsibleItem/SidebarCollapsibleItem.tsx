"use client";

import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { HorizontalDirection, IconName } from "@/components";

import { Collapsible } from "@/components";
import { SidebarNavigationItem } from "@/components";

export interface SidebarCollapsibleItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: HorizontalDirection;
  icon?: IconName;
  indicatorDir?: HorizontalDirection;
  selected?: boolean;
  level?: number;
  type?: "main" | "sqlSidebar";
}

const SidebarCollapsibleItem = forwardRef<HTMLDivElement, SidebarCollapsibleItemProps>(
  (
    {
      label,
      children,
      open,
      onOpenChange,
      iconDir = "start",
      indicatorDir = "start",
      icon,
      level = 0,
      selected,
      type = "main",
      ...props
    },
    ref
  ) => {
    if (!label) {
      return;
    }
    return (
      <Collapsible
        open={open}
        onOpenChange={onOpenChange}
      >
        <Collapsible.Header>
          <SidebarNavigationItem
            ref={ref}
            label={label}
            icon={icon}
            iconDir={iconDir}
            level={level}
            type={type}
            selected={selected}
            collapsible={true}
            {...props}
          />
        </Collapsible.Header>
        <Collapsible.Content indicatorDir={indicatorDir}>{children}</Collapsible.Content>
      </Collapsible>
    );
  }
);

export { SidebarCollapsibleItem };
