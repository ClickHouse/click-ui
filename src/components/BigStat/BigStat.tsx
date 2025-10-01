import { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./BigStat.module.scss";
export type bigStatOrder = "titleTop" | "titleBottom";
export type bigStatSize = "sm" | "lg";
export type bigStatSpacing = "sm" | "lg";
export type bigStatState = "default" | "muted";

export interface BigStatProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Whether the component should fill the full width of its container */
  fillWidth?: boolean;
  /** Maximum width of the component */
  maxWidth?: string;
  /** Height of the component */
  height?: string;
  /** The label text displayed below or above the title */
  label: React.ReactNode;
  /** The order of title and label - titleTop shows title first, titleBottom shows label first */
  order?: bigStatOrder;
  /** The size variant of the component */
  size?: bigStatSize;
  /** The spacing between title and label */
  spacing?: bigStatSpacing;
  /** The visual state of the component */
  state?: bigStatState;
  /** The main title/value to display */
  title: React.ReactNode;
  /** Whether to show an error state with danger border */
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
