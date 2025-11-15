import { ReactNode } from "react";
import { HorizontalDirection, IconName } from "@/components";
import { Collapsible } from "@/components";
import { SidebarNavigationTitle } from "@/components";

export interface SidebarCollapsibleTitleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: HorizontalDirection;
  icon?: IconName;
  selected?: boolean;
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
