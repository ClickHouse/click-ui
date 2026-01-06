import clsx from "clsx";
import React from "react";
import styles from "./GenericMenu.module.scss";

interface GenericMenuPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "popover" | "dropdown-menu" | "context-menu";
  showArrow?: boolean;
  children: React.ReactNode;
}

export const GenericMenuPanel: React.FC<GenericMenuPanelProps> = ({
  type,
  showArrow,
  className,
  children,
  ...props
}) => {
  const typeClassName =
    type === "dropdown-menu"
      ? "cuiDropdownMenu"
      : type === "context-menu"
        ? "cuiContextMenu"
        : "cuiPopover";

  return (
    <div
      className={clsx(
        styles.cuiGenericMenuPanel,
        styles[typeClassName],
        { [styles.cuiShowArrow]: showArrow },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface GenericPopoverMenuPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "popover" | "hover-card";
  showArrow?: boolean;
  children: React.ReactNode;
}

export const GenericPopoverMenuPanel: React.FC<GenericPopoverMenuPanelProps> = ({
  type,
  showArrow,
  className,
  children,
  ...props
}) => {
  const typeClassName = type === "hover-card" ? "cuiHoverCard" : "cuiPopoverType";

  return (
    <div
      className={clsx(
        styles.cuiGenericPopoverMenuPanel,
        styles[typeClassName],
        { [styles.cuiShowArrow]: showArrow },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface ArrowProps extends React.SVGAttributes<SVGSVGElement> {}

export const Arrow: React.FC<ArrowProps> = ({ className, ...props }) => {
  return (
    <svg
      className={clsx(styles.cuiArrow, className)}
      {...props}
    />
  );
};

interface GenericMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const GenericMenuItem = React.forwardRef<HTMLDivElement, GenericMenuItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.cuiGenericMenuItem, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GenericMenuItem.displayName = "GenericMenuItem";
