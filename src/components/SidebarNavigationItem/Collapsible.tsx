import { createContext, useState, HTMLAttributes, MouseEvent, useContext } from "react";
import { styled } from "styled-components";
import { Icon } from "@/components";
import { EmptyButton } from "../commonElement";

export type IconDir = "left" | "right";

export interface CollapsibleProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

type ContextProps = {
  open: boolean;
  onOpenChange: () => void;
};

const NavContext = createContext<ContextProps>({
  open: false,
  onOpenChange: () => null,
});

export const Collapsible = ({
  open: openProp,
  onOpenChange: onOpenChangeProp,
  children,
  ...props
}: CollapsibleProps) => {
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

const CollapsipleHeaderContainer = styled.div<{ $iconDir: IconDir }>`
  margin-left: ${({ theme, $iconDir }) =>
    $iconDir === "left" ? 0 : theme.click.image.small.size.width};
`;

interface CollapsipleHeaderProps extends HTMLAttributes<HTMLDivElement> {
  iconDir?: IconDir;
}

const CollapsipleHeader = ({ iconDir = "left", ...props }: CollapsipleHeaderProps) => {
  return (
    <CollapsipleHeaderContainer
      $iconDir={iconDir}
      {...props}
    />
  );
};

CollapsipleHeader.displayName = "CollapsibleHeader";
Collapsible.Header = CollapsipleHeader;

const CollapsipleTriggerButton = styled(EmptyButton)<{ $iconDir: IconDir }>`
  display: flex;
  align-items: center;
  font: inherit;
  color: inherit;
  cursor: default;
  [data-trigger-icon] {
    visibility: hidden;
    transition: transform 150ms cubic-bezier(0.87, 0, 0.13, 1);
    &[data-open="true"] {
      transform: rotate(90deg);
    }
  }
  &:hover {
    [data-trigger-icon] {
      visibility: visible;
    }
  }
`;
export const FlexContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface CollapsipleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  iconDir?: IconDir;
}

const CollapsipleTrigger = ({
  onClick: onClickProp,
  children,
  iconDir = "left",
  ...props
}: CollapsipleTriggerProps) => {
  const { open, onOpenChange } = useContext(NavContext);
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClickProp) {
      onClickProp(e);
    }
    onOpenChange();
  };

  return (
    <CollapsipleTriggerButton
      onClick={onClick}
      $iconDir={iconDir}
      {...props}
    >
      {iconDir === "left" && (
        <Icon
          data-trigger-icon
          name="chevron-right"
          data-open={open.toString()}
          size="small"
        />
      )}
      {children && <FlexContainer>{children}</FlexContainer>}
      {iconDir === "right" && (
        <Icon
          data-trigger-icon
          name="chevron-right"
          data-open={open.toString()}
          size="small"
        />
      )}
    </CollapsipleTriggerButton>
  );
};

CollapsipleTrigger.displayName = "CollapsibleTrigger";
Collapsible.Trigger = CollapsipleTrigger;

const CollapsipleContent = (props: HTMLAttributes<HTMLDivElement>) => {
  const { open } = useContext(NavContext);
  if (!open) {
    return;
  }
  return <div {...props} />;
};

CollapsipleContent.displayName = "CollapsibleContent";
Collapsible.Content = CollapsipleContent;
