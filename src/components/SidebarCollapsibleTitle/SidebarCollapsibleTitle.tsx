import { ReactNode } from "react";
import { Icon, HorizontalDirection, IconName } from "@/components";
import { Collapsible } from "../Collapsible/Collapsible";
import { SidebarTitleWrapper } from "../SidebarNavigationTitle/SidebarNavigationTitle";

import { CSSPropertiesWithVars } from "@/components/types";

export interface SidebarCollapsibleTitleProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** The label content to display */
  label: ReactNode;
  /** The content to display when expanded */
  children: React.ReactNode;
  /** Whether the title section is expanded */
  open?: boolean;
  /** Callback when the open state changes */
  onOpenChange?: (value: boolean) => void;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** Icon to display before the label */
  icon?: IconName;
  /** Whether the title is currently selected */
  selected?: boolean;
  /** The sidebar style type */
  type?: "main" | "sqlSidebar";
  style?: CSSPropertiesWithVars;
}

export const SidebarCollapsibleTitle = ({
  label,
  children,
  open,
  onOpenChange,
  iconDir = "start",
  icon,
  selected,
  type = "main",
  ...props
}: SidebarCollapsibleTitleProps) => {
  if (!label) {
    return;
  }
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
    >
      <SidebarTitleWrapper
        as={Collapsible.Trigger}
        $collapsible
        iconDir={iconDir}
        data-selected={selected}
        $type={type}
        {...props}
      >
        {icon && iconDir === "start" && (
          <Icon
            name={icon}
            size="sm"
          />
        )}
        {label}
        {icon && iconDir === "end" && (
          <Icon
            name={icon}
            size="sm"
          />
        )}
      </SidebarTitleWrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};
