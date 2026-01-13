"use client";

import {
  createContext,
  useState,
  ComponentPropsWithoutRef,
  MouseEvent,
  useContext,
  useEffect,
  forwardRef,
} from "react";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import { Icon, HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "./IconWrapper";
import styles from "./Collapsible.module.scss";

export interface CollapsibleProps extends ComponentPropsWithoutRef<"div"> {
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
  className,
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
      className={clsx(styles.cuiCollapsibleContainer, className)}
      {...props}
    >
      <NavContext.Provider value={value}>{children}</NavContext.Provider>
    </div>
  );
};

interface CollapsipleHeaderProps extends ComponentPropsWithoutRef<"div"> {
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
      className,
      ...props
    }: CollapsipleHeaderProps,
    ref
  ) => {
    const { onOpenChange } = useContext(NavContext);
    const indicatorDirClass = `cuiIndicatorDir${capitalize(indicatorDir)}`;

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
        className={clsx(styles.cuiHeaderContainer, styles[indicatorDirClass], className)}
        data-cui-indicator-dir={indicatorDir}
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

interface CollapsipleTriggerProps extends ComponentPropsWithoutRef<"button"> {
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
  className,
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
    <button
      onClick={onClick}
      aria-label="trigger children"
      className={clsx(styles.cuiTriggerButton, className)}
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
    </button>
  );
};

CollapsipleTrigger.displayName = "CollapsibleTrigger";
Collapsible.Trigger = CollapsipleTrigger;

const CollapsipleContent = ({
  indicatorDir,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & { indicatorDir?: HorizontalDirection }) => {
  const { open } = useContext(NavContext);
  if (!open) {
    return;
  }

  const indicatorDirClass = indicatorDir
    ? `cuiIndicatorDir${capitalize(indicatorDir)}`
    : undefined;

  return (
    <div
      className={clsx(
        styles.cuiContentWrapper,
        {
          [styles[indicatorDirClass!]]: indicatorDirClass,
        },
        className
      )}
      data-cui-indicator-dir={indicatorDir}
      {...props}
    />
  );
};

CollapsipleContent.displayName = "CollapsibleContent";
Collapsible.Content = CollapsipleContent;
