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

export const CollapsibleSidebarNavigationItem = ({
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

const CollapsipleHeader = (props: SidebarNavigationItemProps<"button">) => {
  return <CollapsipleHeaderContainer {...props} />;
};

CollapsipleHeader.displayName = "CollapsibleSidebarNavigationItemHeader";
CollapsibleSidebarNavigationItem.Header = CollapsipleHeader;

const CollapsipleTriggerButton = styled.button`
  padding: 0;
`;

const CollapsipleTriggerContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CollapsipleTrigger = ({
  icon = "chevron-right",
  onClick: onClickProp,
  children,
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
    <CollapsipleTriggerContainer>
      <CollapsipleTriggerButton
        as={IconButton}
        icon={icon}
        onClick={onClick}
        data-state={open.toString()}
        size="small"
        {...props}
      />
      {children}
    </CollapsipleTriggerContainer>
  );
};

CollapsipleTrigger.displayName = "CollapsibleSidebarNavigationItemTrigger";
CollapsibleSidebarNavigationItem.Trigger = CollapsipleTrigger;

const CollapsipleContent = (props: HTMLAttributes<HTMLDivElement>) => {
  const { open } = useContext(NavContext);
  if (!open) {
    return;
  }
  return <div {...props} />;
};

CollapsipleContent.displayName = "CollapsibleSidebarNavigationItemContent";
CollapsibleSidebarNavigationItem.Content = CollapsipleContent;
