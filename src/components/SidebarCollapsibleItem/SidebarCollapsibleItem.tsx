import { HTMLAttributes, ReactNode, forwardRef } from "react";
import { HorizontalDirection, IconName } from "@/components";

import { Collapsible } from "../Collapsible/Collapsible";
import { SidebarItemWrapper } from "../SidebarNavigationItem/SidebarNavigationItem";

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
}

const SidebarCollapsibleItem = forwardRef<HTMLButtonElement, SidebarCollapsibleItemProps>(
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
        <SidebarItemWrapper
          ref={ref}
          as={Collapsible.Header}
          icon={icon}
          iconDir={iconDir}
          indicatorDir={indicatorDir}
          $collapsible
          $level={level}
          data-selected={selected}
          {...props}
        >
          {label}
        </SidebarItemWrapper>
        <Collapsible.Content indicatorDir={indicatorDir}>{children}</Collapsible.Content>
      </Collapsible>
    );
  }
);

export { SidebarCollapsibleItem };
