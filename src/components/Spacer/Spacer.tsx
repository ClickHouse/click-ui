import { capitalize } from "@/utils/capitalize";
import clsx from "clsx";
import styles from "./Spacer.module.scss";

export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export interface SpacerProps {
  /** The size of the spacer */
  size?: SizeType;
  className?: string;
}

export const Spacer = ({ size = "md", className }: SpacerProps) => {
  const sizeClass = `cuiSize${capitalize(size)}`;

  return (
    <div
      className={clsx(styles.cuiSpacer, styles[sizeClass], className)}
      data-cui-size={size}
    />
  );
};
