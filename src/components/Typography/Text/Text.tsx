import { ElementType, ReactNode, forwardRef } from "react";
import clsx from "clsx";
import { TextSize, TextWeight } from "@/components/commonTypes";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import styles from "./Text.module.scss";
import { capitalize } from "@/utils/capitalize";

export type TextAlignment = "left" | "center" | "right";
export type TextColor = "default" | "muted" | "danger" | "disabled";

export interface TextProps<
  T extends ElementType = "p",
> extends PolymorphicComponentProps<T> {
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
  fillWidth?: boolean;
}

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
  }: PolymorphicProps<T, TextProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "p";

  // Helper function to get font class based on size and weight
  const getFontClass = (size: TextSize, weight: TextWeight) => {
    const weightCapitalized = weight === "normal" ? "" : capitalize(weight);
    return `cuiFontSize${capitalize(size)}${weightCapitalized}`;
  };

  const colorClass = `cuiColor${capitalize(color)}`;
  const alignClass = `cuiAlign${capitalize(align)}`;

  return (
    <Component
      ref={ref}
      className={clsx(
        styles.cuiText,
        styles[getFontClass(size, weight)],
        styles[colorClass],
        styles[alignClass],
        { [styles.cuiFillWidth]: fillWidth },
        className
      )}
      data-cui-size={size}
      data-cui-weight={weight}
      data-cui-color={color}
      data-cui-align={align}
      {...props}
    >
      {children}
    </Component>
  );
};

_Text.displayName = "Text";

const Text: PolymorphicComponent<TextProps, "p"> = forwardRef(_Text);
export { Text };
