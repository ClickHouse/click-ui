import React, { HTMLAttributes, ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { IconSize } from "./Icon/types";
import styles from "./commonElement.module.scss";

interface FormRootProps extends HTMLAttributes<HTMLDivElement> {
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

export const Error: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(styles.cuiError, className)}
    {...props}
  />
);

export const EmptyButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    className={clsx(styles.cuiEmptyButton, className)}
    {...props}
  />
);

export const CrossButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    className={clsx(styles.cuiCrossButton, className)}
    {...props}
  />
);

export const GridCenter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(styles.cuiGridCenter, className)}
    {...props}
  />
);

export const BaseButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => (
  <button
    className={clsx(styles.cuiBaseButton, className)}
    {...props}
  />
);

interface SvgImageElementProps extends React.SVGAttributes<SVGSVGElement> {
  size?: IconSize;
}

export const SvgImageElement: React.FC<SvgImageElementProps> = ({
  size,
  className,
  ...props
}) => (
  <svg
    className={clsx(
      styles.cuiSvgImageElement,
      {
        [styles[`size${size ? size.charAt(0).toUpperCase() + size.slice(1) : ""}`]]: size,
      },
      className
    )}
    {...props}
  />
);

export const FormElementContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={clsx(styles.cuiFormElementContainer, className)}
    {...props}
  />
);

export const EllipsisContainer: React.FC<HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => (
  <span
    className={clsx(styles.cuiEllipsisContainer, className)}
    {...props}
  />
);
