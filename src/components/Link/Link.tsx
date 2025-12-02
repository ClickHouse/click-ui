import { ElementType, ReactEventHandler, forwardRef } from "react";
import { Icon, IconName } from "@/components";
import { TextSize, TextWeight } from "@/components/commonTypes";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import clsx from "clsx";
import { capitalize } from "@/utils/capitalize";
import styles from "./Link.module.scss";

export interface LinkProps<
  T extends ElementType = "a",
> extends PolymorphicComponentProps<T> {
  size?: TextSize;
  /** The font weight of the link text */
  weight?: TextWeight;
  /** Click event handler */
  onClick?: ReactEventHandler;
  /** The content to display inside the link */
  children?: React.ReactNode;
  /** Optional icon to display after the link text */
  icon?: IconName;
}

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
  }: PolymorphicProps<T, LinkProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "a";
  const isSmallSize = size === "xs" || size === "sm";

  const sizeClass = `cui${capitalize(size)}`;
  const weightClass = weight !== "normal" ? `cuiWeight${capitalize(weight)}` : null;
  const iconSizeClass = isSmallSize ? "cuiSm" : "cuiMd";

  return (
    <Component
      ref={ref}
      className={clsx(
        styles.cuiLink,
        styles[sizeClass],
        weightClass && styles[weightClass],
        className
      )}
      onClick={onClick}
      data-cui-size={size}
      data-cui-weight={weight}
      {...props}
    >
      {children}
      {icon && (
        <span className={styles.cuiIconWrapper}>
          <Icon
            name={icon}
            className={clsx(styles.cuiExternalIcon, styles[iconSizeClass])}
            data-testid={icon}
          />
        </span>
      )}
    </Component>
  );
};
export const Link: PolymorphicComponent<LinkProps, "a"> = forwardRef(_Link);
