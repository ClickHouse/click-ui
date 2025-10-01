import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { HorizontalDirection, IconName } from "@/components";

import { Collapsible } from "@/components";
import { SidebarNavigationItem } from "@/components";

export interface SidebarCollapsibleItemProps extends HTMLAttributes<HTMLDivElement> {
  /** The label content to display */
  label: ReactNode;
  /** The content to display when expanded */
  children: ReactNode;
  /** Whether the item is expanded */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (value: boolean) => void;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** Icon to display before the label */
  icon?: IconName;
  /** The direction of the collapse indicator */
  indicatorDir?: HorizontalDirection;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Nesting level for indentation */
  level?: number;
  /** The sidebar style type */
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
            {...props}
          />
        </Collapsible.Header>
        <Collapsible.Content indicatorDir={indicatorDir}>{children}</Collapsible.Content>
      </Collapsible>
    );
  }
);

export { SidebarCollapsibleItem };
