import React, {
  ComponentPropsWithoutRef,
  ElementType,
} from "react";
import clsx from "clsx";
import { IconSize } from "./Icon/types";
import styles from "./commonElement.module.scss";
import { capitalize } from "@/utils/capitalize";

interface FormRootProps extends ComponentPropsWithoutRef<"div"> {
  orientation?: "horizontal" | "vertical";
  dir?: "start" | "end";
  addLabelPadding?: boolean;
}

export const FormRoot: React.FC<FormRootProps> = ({
  orientation = "vertical",
  dir = "start",
  addLabelPadding = false,
  className,
  ...props
}) => (
  <div
    className={clsx(
      styles.cuiFormRoot,
      {
        [styles.cuiOrientationHorizontal]: orientation === "horizontal",
        [styles.cuiOrientationVertical]: orientation === "vertical",
        [styles.cuiDirStart]: dir === "start",
        [styles.cuiDirEnd]: dir === "end",
        [styles.cuiAddLabelPadding]: addLabelPadding && orientation === "horizontal",
      },
      className
    )}
    {...props}
  />
);

export const Error: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(styles.cuiError, className)}
    {...props}
  />
);

export const EmptyButton: React.FC<ComponentPropsWithoutRef<"button">> = ({
  className,
  ...props
}) => (
  <button
    className={clsx(styles.cuiEmptyButton, className)}
    {...props}
  />
);

export const CrossButton: React.FC<ComponentPropsWithoutRef<"button">> = ({
  className,
  ...props
}) => (
  <button
    className={clsx(styles.cuiCrossButton, className)}
    {...props}
  />
);

export const GridCenter: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(styles.cuiGridCenter, className)}
    {...props}
  />
);

export const BaseButton: React.FC<ComponentPropsWithoutRef<"button">> = ({
  className,
  ...props
}) => (
  <button
    className={clsx(styles.cuiBaseButton, className)}
    {...props}
  />
);

interface SvgImageElementProps<C extends ElementType = "div"> {
  as?: C;
  size?: IconSize;
  className?: string;
}

export const SvgImageElement = <C extends ElementType = "svg">({
  as,
  size,
  className,
  ...props
}: SvgImageElementProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof SvgImageElementProps<C>>) => {
  const Component = as || "svg";

  return (
    <Component
      className={clsx(
        styles.cuiSvgImageElement,
        {
          [styles[`cuiSize${size ? capitalize(size) : ""}`]]: size,
        },
        className
      )}
      {...props}
    />
  );
};

export const FormElementContainer: React.FC<ComponentPropsWithoutRef<"div">> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(styles.cuiFormElementContainer, className)}
    {...props}
  />
);

export const EllipsisContainer: React.FC<ComponentPropsWithoutRef<"span">> = ({
  className,
  ...props
}) => (
  <span
    className={clsx(styles.cuiEllipsisContainer, className)}
    {...props}
  />
);
