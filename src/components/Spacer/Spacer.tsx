import clsx from "clsx";
import styles from "./Spacer.module.scss";

export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export interface SpacerProps {
  /** The size of the spacer */
  size?: SizeType;
  className?: string;
}

export const Spacer = ({ size = "md", className }: SpacerProps) => (
  <div
    className={clsx(
      styles.cuiSpacer,
      {
        [styles.cuiXs]: size === "xs",
        [styles.cuiSm]: size === "sm",
        [styles.cuiMd]: size === "md",
        [styles.cuiLg]: size === "lg",
        [styles.cuiXl]: size === "xl",
        [styles.cuiXxl]: size === "xxl",
      },
      className
    )}
  />
);
