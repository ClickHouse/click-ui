import { HTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import styles from "./Title.module.scss";
import { capitalize } from "@/utils/capitalize";

export type TitleAlignment = "left" | "center" | "right";
export type TitleColor = "default" | "muted";
export type TitleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TitleFamily = "product" | "brand";
export type TitleType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The text alignment of the title */
  align?: TitleAlignment;
  /** The color variant of the title */
  color?: TitleColor;
  /** The font size of the title */
  size?: TitleSize;
  /** The font family to use - product or brand */
  family?: TitleFamily;
  /** The heading level (h1-h6) */
  type: TitleType;
}

/** The `title` component allows you to easily add headings to your pages. They do not include built in margins. */
export const Title = forwardRef<HTMLHeadingElement, TitleProps>(
  (
    {
      align = "left",
      size = "md",
      family = "product",
      type,
      color = "default",
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Helper function to get font class based on size and family
    const getFontClass = (size: TitleSize, family: TitleFamily) => {
      return `cuiFontSize${capitalize(family)}${capitalize(size)}`;
    };

    const Component = type;

    return (
      <Component
        ref={ref}
        className={clsx(
          styles.cuiTitle,
          {
            [styles[getFontClass(size, family)]]: true,
            [styles.cuiColorDefault]: color === "default",
            [styles.cuiColorMuted]: color === "muted",
            [styles.cuiAlignLeft]: align === "left",
            [styles.cuiAlignCenter]: align === "center",
            [styles.cuiAlignRight]: align === "right",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
