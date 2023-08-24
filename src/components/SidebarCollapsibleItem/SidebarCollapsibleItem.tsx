import { HTMLAttributes, ReactNode } from "react";
import { IconName } from "@/components/Icon/types";
import { Icon } from "@/components";

import { Collapsible, LabelContainer, IconDir } from "../Collapsible/Collapsible";
import { SidebarItemWrapper } from "../SidebarNavigationItem/SidebarNavigationItem";

export interface SidebarCollapsibleItemProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  iconDir?: IconDir;
  icon?: IconName;
  selected?: boolean;
  level?: number;
}

const SidebarCollapsibleItem = ({
  label,
  children,
  open,
  onOpenChange,
  iconDir = "left",
  icon,
  level = 0,
  selected,
  ...props
}: SidebarCollapsibleItemProps) => {
  if (!label) {
    return;
  }
  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
    >
      <SidebarItemWrapper
        as={Collapsible.Header}
        iconDir={iconDir}
        $collapsible
        $level={level}
        data-selected={selected}
        {...props}
      >
        {iconDir === "left" && <Collapsible.Trigger />}
        {children && (
          <LabelContainer>
            {icon && (
              <Icon
                name={icon}
                size="sm"
              />
            )}
            {label}
          </LabelContainer>
        )}
        {iconDir === "right" && <Collapsible.Trigger />}
      </SidebarItemWrapper>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible>
  );
};

export { SidebarCollapsibleItem };
