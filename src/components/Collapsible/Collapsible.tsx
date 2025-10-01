import {
  createContext,
  useState,
  HTMLAttributes,
  MouseEvent,
  useContext,
  useEffect,
  forwardRef,
} from "react";
import clsx from "clsx";
import { Icon, HorizontalDirection, IconName } from "@/components";
import { EmptyButton } from "@/components/commonElement";
import { IconWrapper } from "./IconWrapper";
import styles from "./Collapsible.module.scss";

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

  useEffect(() => {
    setOpen(open => openProp ?? open);
  }, [openProp]);

  const value = {
    open: openProp ?? open,
    onOpenChange,
  };
  return (
    <div
      className={styles.cuiCollapsibleContainer}
      {...props}
    >
      <NavContext.Provider value={value}>{children}</NavContext.Provider>
    </div>
  );
};

interface CollapsipleHeaderProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  indicatorDir?: HorizontalDirection;
  wrapInTrigger?: boolean;
}

const CollapsipleHeader = forwardRef<HTMLDivElement, CollapsipleHeaderProps>(
  (
    {
      indicatorDir = "start",
      icon,
      iconDir,
      children,
      wrapInTrigger,
      onClick: onClickProp,
      ...props
    }: CollapsipleHeaderProps,
    ref
  ) => {
    const { onOpenChange } = useContext(NavContext);
    return (
      <div
        ref={ref}
        onClick={e => {
          if (wrapInTrigger && typeof onOpenChange === "function") {
            onOpenChange();
          }
          if (typeof onClickProp === "function") {
            onClickProp(e);
          }
        }}
        data-collapsible-header
        className={clsx(styles.cuiHeaderContainer, {
          [styles.cuiIndicatorStart]: indicatorDir === "start",
          [styles.cuiIndicatorEnd]: indicatorDir === "end",
        })}
        {...props}
      >
        {indicatorDir === "start" && <Collapsible.Trigger />}
        {children && (
          <IconWrapper
            icon={icon}
            iconDir={iconDir}
          >
            {children}
          </IconWrapper>
        )}
        {indicatorDir === "end" && <Collapsible.Trigger />}
      </div>
    );
  }
);

CollapsipleHeader.displayName = "CollapsibleHeader";
Collapsible.Header = CollapsipleHeader;

interface CollapsipleTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  indicatorDir?: HorizontalDirection;
}

const CollapsipleTrigger = ({
  onClick: onClickProp,
  children,
  indicatorDir = "start",
  icon,
  iconDir = "start",
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
    <EmptyButton
      onClick={onClick}
      aria-label="trigger children"
      className={styles.cuiTriggerButton}
      {...props}
    >
      {indicatorDir === "start" && (
        <Icon
          data-trigger-icon
          name="chevron-right"
          data-open={open.toString()}
          size="sm"
        />
      )}
      {children && (
        <IconWrapper
          icon={icon}
          iconDir={iconDir}
        >
          {children}
        </IconWrapper>
      )}
      {indicatorDir === "end" && (
        <Icon
          data-trigger-icon
          name="chevron-right"
          data-open={open.toString()}
          size="sm"
        />
      )}
    </EmptyButton>
  );
};

CollapsipleTrigger.displayName = "CollapsibleTrigger";
Collapsible.Trigger = CollapsipleTrigger;

const CollapsipleContent = ({
  indicatorDir,
  ...props
}: HTMLAttributes<HTMLDivElement> & { indicatorDir?: HorizontalDirection }) => {
  const { open } = useContext(NavContext);
  if (!open) {
    return;
  }
  return (
    <div
      className={clsx(styles.cuiContentWrapper, {
        [styles.cuiIndicatorStart]: indicatorDir === "start",
        [styles.cuiIndicatorEnd]: indicatorDir === "end",
      })}
      {...props}
    />
  );
};

CollapsipleContent.displayName = "CollapsibleContent";
Collapsible.Content = CollapsipleContent;
