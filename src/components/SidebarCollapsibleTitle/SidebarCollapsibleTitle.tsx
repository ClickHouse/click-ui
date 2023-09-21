import { ReactNode } from "react";
import { Icon, HorizontalDirection, IconName } from "@/components";
import { Collapsible } from "../Collapsible/Collapsible";
import { SidebarTitleWrapper } from "../SidebarNavigationTitle/SidebarNavigationTitle";

export interface SidebarCollapsibleTitleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  label: ReactNode;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: HorizontalDirection;
  icon?: IconName;
  selected?: boolean;
  type: "main" | "sqlSidebar";
}

export const SidebarCollapsibleTitle = ({
  label,
  children,
  open,
  onOpenChange,
  iconDir,
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
        {icon && (
          <Icon
            name={icon}
            size="sm"
          />
        )}
        {label}
      </SidebarTitleWrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};
