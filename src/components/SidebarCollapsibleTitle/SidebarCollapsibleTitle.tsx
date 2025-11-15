import { ReactNode } from "react";
import { HorizontalDirection, IconName } from "@/components";
import { Collapsible } from "@/components";
import { SidebarNavigationTitle } from "@/components";

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
      <SidebarNavigationTitle
        component={Collapsible.Trigger}
        label={label}
        icon={icon}
        iconDir={iconDir}
        selected={selected}
        type={type}
        collapsible={true}
        {...props}
      />
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};
