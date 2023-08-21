import { createContext, useState, HTMLAttributes, MouseEvent, useContext } from "react";
import {
  IconButton,
  IconButtonProps,
  SidebarNavigationItem,
  SidebarNavigationItemProps,
} from "@/components";
import { styled } from "styled-components";

export interface CollapsibleSidebarNavigationItemProps
  extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

type ContextProps = {
  open: boolean;
  onOpenChange: () => void;
};

export const NavContext = createContext<ContextProps>({
  open: false,
  onOpenChange: () => null,
});

export const CollapsibleNavigationItem = ({
  open: openProp,
  onOpenChange: onOpenChangeProp,
  children,
  ...props
}: CollapsibleSidebarNavigationItemProps) => {
  const [open, setOpen] = useState(openProp ?? false);
  const onOpenChange = () => {
    setOpen(open => {
      if (typeof onOpenChangeProp === "function") {
        onOpenChangeProp(!open);
      }
      return !open;
    });
  };
  const value = {
    open,
    onOpenChange,
  };
  return (
    <div {...props}>
      <NavContext.Provider value={value}>{children}</NavContext.Provider>
    </div>
  );
};

const CollapsipleHeaderContainer = styled(SidebarNavigationItem)`
  padding-left: 0;
`;

const CollapsipleHeader = (props: SidebarNavigationItemProps) => {
  return <CollapsipleHeaderContainer {...props} />;
};

CollapsipleHeader.displayName = "CollapsibleNavigationItemHeader";
CollapsibleNavigationItem.Header = CollapsipleHeader;

const CollapsipleTriggerButton = styled.button`
  padding: 0;
`;

const CollapsipleTrigger = ({
  icon,
  onClick: onClickProp,
  ...props
}: Partial<IconButtonProps>) => {
  const { open, onOpenChange } = useContext(NavContext);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClickProp) {
      onClickProp(e);
    }
    onOpenChange();
  };
  return (
    <CollapsipleTriggerButton
      as={IconButton}
      icon={icon ?? "chevron-right"}
      onClick={onClick}
      data-state={open.toString()}
      size="small"
      {...props}
    />
  );
};

CollapsipleTrigger.displayName = "CollapsibleNavigationItemTrigger";
CollapsibleNavigationItem.Trigger = CollapsipleTrigger;

const CollapsipleContent = (props: HTMLAttributes<HTMLDivElement>) => {
  const { open } = useContext(NavContext);
  if (!open) {
    return;
  }
  return <div {...props} />;
};

CollapsipleContent.displayName = "CollapsibleNavigationItemContent";
CollapsibleNavigationItem.Content = CollapsipleContent;
