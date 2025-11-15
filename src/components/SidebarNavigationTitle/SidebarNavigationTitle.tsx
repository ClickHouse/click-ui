"use client";

import { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "@/components";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import styles from "./SidebarNavigationTitle.module.scss";

export interface SidebarNavigationTitleProps<
  T extends ElementType = "button",
> extends PolymorphicComponentProps<T> {
  label: ReactNode;
  /** Whether the title is currently selected */
  selected?: boolean;
  /** Icon to display before the label */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The sidebar style type */
  type?: "main" | "sqlSidebar";
  collapsible?: boolean;
}

const _SidebarNavigationTitle = <T extends ElementType = "button">(
  {
    component,
    label,
    icon,
    iconDir,
    selected,
    type = "main",
    collapsible = false,
    className,
    ...props
  }: PolymorphicProps<T, SidebarNavigationTitleProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "button";

  // Collapsible.Trigger already wraps children with IconWrapper, so pass icon props
  // to the component and let it handle the wrapping to avoid double wrapping
  const content = component ? (
    label
  ) : (
    <IconWrapper
      icon={icon}
      iconDir={iconDir}
    >
      {label}
    </IconWrapper>
  );

  return (
    <Component
      ref={ref}
      data-selected={selected}
      data-cui-type={type}
      data-cui-collapsible={collapsible || undefined}
      icon={component ? icon : undefined}
      iconDir={component ? iconDir : undefined}
      className={clsx(
        styles.cuiSidebarTitleWrapper,
        {
          [styles.cuiMain]: type === "main",
          [styles.cuiSqlSidebar]: type === "sqlSidebar",
          [styles.cuiCollapsible]: collapsible,
        },
        className
      )}
      {...props}
    >
      {content}
    </Component>
  );
};

export const SidebarNavigationTitle: PolymorphicComponent<
  SidebarNavigationTitleProps,
  "button"
> = forwardRef(_SidebarNavigationTitle);
