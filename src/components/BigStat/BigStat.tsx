import { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./BigStat.module.scss";
export type bigStatOrder = "titleTop" | "titleBottom";
export type bigStatSize = "sm" | "lg";
export type bigStatSpacing = "sm" | "lg";
export type bigStatState = "default" | "muted";

export interface BigStatProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  fillWidth?: boolean;
  maxWidth?: string;
  height?: string;
  label: React.ReactNode;
  order?: bigStatOrder;
  size?: bigStatSize;
  spacing?: bigStatSpacing;
  state?: bigStatState;
  title: React.ReactNode;
  error?: boolean;
}

//* Use this component to highlight important pieces of information. */
export const BigStat = ({
  fillWidth = false,
  maxWidth,
  height = "6rem",
  label = "Label",
  order = "titleTop",
  size = "lg",
  spacing = "sm",
  state = "default",
  title = "Title",
  error = false,
  style,
  ...props
}: BigStatProps) => (
  <div
    className={clsx(styles.cuiWrapper, {
      [styles.cuiDefault]: state === "default",
      [styles.cuiMuted]: state === "muted",
      [styles.cuiError]: error,
      [styles.cuiSm]: size === "sm",
      [styles.cuiLg]: size === "lg",
      [styles.cuiSpacingSm]: spacing === "sm",
      [styles.cuiSpacingLg]: spacing === "lg",
      [styles.cuiTitleTop]: order === "titleTop",
      [styles.cuiTitleBottom]: order === "titleBottom",
      [styles.cuiFillWidth]: fillWidth,
      [styles.cuiAutoWidth]: !fillWidth,
    })}
    style={{
      ...style,
      minHeight: height,
      maxWidth: maxWidth || "none",
    }}
    {...props}
  >
    <div
      className={clsx(styles.cuiLabel, {
        [styles.cuiDefault]: state === "default",
        [styles.cuiMuted]: state === "muted",
        [styles.cuiError]: error,
        [styles.cuiSm]: size === "sm",
        [styles.cuiLg]: size === "lg",
      })}
    >
      {label}
    </div>
    <div
      className={clsx(styles.cuiTitle, {
        [styles.cuiDefault]: state === "default",
        [styles.cuiMuted]: state === "muted",
        [styles.cuiSm]: size === "sm",
        [styles.cuiLg]: size === "lg",
      })}
    >
      {title}
    </div>
  </div>
);
