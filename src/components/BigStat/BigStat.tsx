import { HTMLAttributes } from "react";
import { capitalize } from "@/utils/capitalize";
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
}: BigStatProps) => {
  const stateClass = error ? "cuiStateError" : `cuiState${capitalize(state)}`;
  const sizeClass = `cuiSize${capitalize(size)}`;
  const spacingClass = `cuiSpacing${capitalize(spacing)}`;
  const orderClass = `cuiOrder${capitalize(order)}`;
  const widthClass = fillWidth ? "cuiWidthFill" : "cuiWidthAuto";

  return (
    <div
      className={clsx(
        styles.cuiWrapper,
        styles[stateClass],
        styles[sizeClass],
        styles[spacingClass],
        styles[orderClass],
        styles[widthClass]
      )}
      style={{
        ...style,
        minHeight: height,
        maxWidth: maxWidth || "none",
      }}
      data-cui-state={error ? "error" : state}
      data-cui-size={size}
      data-cui-spacing={spacing}
      data-cui-order={order}
      {...props}
    >
      <div className={clsx(styles.cuiLabel, styles[stateClass], styles[sizeClass])}>
        {label}
      </div>
      <div className={clsx(styles.cuiTitle, styles[stateClass], styles[sizeClass])}>
        {title}
      </div>
    </div>
  );
};
