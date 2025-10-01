import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactEventHandler,
  ReactNode,
  forwardRef,
} from "react";
import { Icon, IconName } from "@/components";
import { TextSize, TextWeight } from "@/components/commonTypes";
import clsx from "clsx";
import styles from "./Link.module.scss";

export interface LinkProps<T extends ElementType = "a"> {
  /** The font size of the link text */
  size?: TextSize;
  /** The font weight of the link text */
  weight?: TextWeight;
  /** Click event handler */
  onClick?: ReactEventHandler;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Optional icon to display after the link text */
  icon?: IconName;
  /** Custom component to render as the link element */
  component?: T;
}

type LinkPolymorphicComponent = <T extends ElementType = "a">(
  props: Omit<ComponentProps<T>, keyof LinkProps<T>> & LinkProps<T>
) => ReactNode;

/** Component for linking to other pages or sections from with body text */
const _Link = <T extends ElementType = "a">(
  {
    size = "md",
    weight = "normal",
    onClick,
    icon,
    children,
    component,
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof LinkProps<T>> & LinkProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
) => {
  const Component = component ?? "a";
  const isSmallSize = size === "xs" || size === "sm";

  return (
    <Component
      ref={ref}
      className={clsx(
        styles.cuiLink,
        {
          [styles.cuiXs]: size === "xs",
          [styles.cuiSm]: size === "sm",
          [styles.cuiMd]: size === "md",
          [styles.cuiLg]: size === "lg",
          [styles.cuiXl]: size === "xl",
          [styles.cuiWeightBold]: weight === "bold",
          [styles.cuiWeightSemibold]: weight === "semibold",
          [styles.cuiWeightMedium]: weight === "medium",
        },
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      {icon && (
        <span className={styles.cuiIconWrapper}>
          <Icon
            name={icon}
            className={clsx(styles.cuiExternalIcon, {
              [styles.cuiSm]: isSmallSize,
              [styles.cuiMd]: !isSmallSize,
            })}
            data-testid={icon}
          />
        </span>
      )}
    </Component>
  );
};
export const Link: LinkPolymorphicComponent = forwardRef(_Link);
