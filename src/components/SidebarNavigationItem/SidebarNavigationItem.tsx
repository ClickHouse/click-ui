"use client";

import { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";
import { HorizontalDirection, IconName } from "@/components";
import { IconWrapper } from "@/components";
import { capitalize } from "@/utils/capitalize";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import styles from "./SidebarNavigationItem.module.scss";

export interface SidebarNavigationItemProps<
  T extends ElementType = "div",
> extends PolymorphicComponentProps<T> {
  label: ReactNode;
  /** Whether the item is currently selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Nesting level for indentation */
  level?: number;
  /** Icon to display before the label */
  icon?: IconName;
  /** The direction of the icon relative to the label */
  iconDir?: HorizontalDirection;
  /** The sidebar style type */
  type?: "main" | "sqlSidebar";
  collapsible?: boolean;
}

const _SidebarNavigationItem = <T extends ElementType = "div">(
  {
    component,
    label,
    level = 0,
    icon,
    selected,
    iconDir,
    disabled,
    type = "main",
    collapsible = false,
    className,
    ...props
  }: PolymorphicProps<T, SidebarNavigationItemProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "div";
  const typeClass = `cuiType${capitalize(type)}`;
  const selectedClass = selected ? "cuiSelected" : undefined;
  const disabledClass = disabled ? "cuiDisabled" : undefined;

  // Collapsible.Header already wraps children with IconWrapper, so pass icon props
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
      data-selected={selected}
      ref={ref}
      aria-disabled={disabled}
      icon={component ? icon : undefined}
      iconDir={component ? iconDir : undefined}
      className={clsx(
        styles.cuiSidebarItemWrapper,
        styles[typeClass],
        selectedClass && styles[selectedClass],
        disabledClass && styles[disabledClass],
        {
          [styles.cuiItem]: level === 0,
          [styles.cuiSubItem]: level > 0,
          [styles.cuiCollapsible]: collapsible,
        },
        className
      )}
      data-cui-type={type}
      data-cui-level={level}
      data-cui-selected={selected ? "true" : undefined}
      data-cui-disabled={disabled ? "true" : undefined}
      data-cui-collapsible={collapsible || undefined}
      {...props}
    >
      {content}
    </Component>
  );
};

export const SidebarNavigationItem: PolymorphicComponent<SidebarNavigationItemProps> =
  forwardRef(_SidebarNavigationItem);
