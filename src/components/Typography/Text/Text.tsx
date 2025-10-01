import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import clsx from "clsx";
import { TextSize, TextWeight } from "@/components/commonTypes";
import styles from "./Text.module.scss";

export type TextAlignment = "left" | "center" | "right";
export type TextColor = "default" | "muted" | "danger" | "disabled";

export interface TextProps<T extends ElementType = "p"> {
  /** The text content to display */
  children: ReactNode;
  /** The text alignment */
  align?: TextAlignment;
  /** The text color variant */
  color?: TextColor;
  /** The font size of the text */
  size?: TextSize;
  /** The font weight of the text */
  weight?: TextWeight;
  /** Additional CSS class name */
  className?: string;
  /** Custom component to render as */
  component?: T;
  /** Whether the text should fill the full width of its container */
  fillWidth?: boolean;
}

type TextPolymorphicComponent = <T extends ElementType = "p">(
  props: Omit<ComponentProps<T>, keyof T> & TextProps<T>
) => ReactNode;

const _Text = <T extends ElementType = "p">(
  {
    align = "left",
    color = "default",
    size = "md",
    weight = "normal",
    className,
    children,
    component,
    fillWidth,
    ...props
  }: Omit<ComponentProps<T>, keyof T> & TextProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
) => {
  const Component = component ?? "p";

  // Helper function to get font class based on size and weight
  const getFontClass = (size: TextSize, weight: TextWeight) => {
    const sizeCapitalized = size.charAt(0).toUpperCase() + size.slice(1);
    const weightCapitalized =
      weight === "normal" ? "" : weight.charAt(0).toUpperCase() + weight.slice(1);
    return `fontSize${sizeCapitalized}${weightCapitalized}`;
  };

  return (
    <Component
      ref={ref}
      className={clsx(
        styles.cuiText,
        {
          [styles[getFontClass(size, weight)]]: true,
          [styles.cuiColorDefault]: color === "default",
          [styles.cuiColorMuted]: color === "muted",
          [styles.cuiColorDanger]: color === "danger",
          [styles.cuiColorDisabled]: color === "disabled",
          [styles.cuiAlignLeft]: align === "left",
          [styles.cuiAlignCenter]: align === "center",
          [styles.cuiAlignRight]: align === "right",
          [styles.cuiFillWidth]: fillWidth,
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

_Text.displayName = "Text";

const Text: TextPolymorphicComponent = forwardRef(_Text);
export { Text };
