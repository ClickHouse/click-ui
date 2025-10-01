import clsx from "clsx";
import * as RadixSeparator from "@radix-ui/react-separator";
import styles from "./Separator.module.scss";

interface Props extends RadixSeparator.SeparatorProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}

const Separator = ({ orientation = "horizontal", size, className, ...props }: Props) => (
  <RadixSeparator.Root
    orientation={orientation}
    className={clsx(
      styles.cuiSeparator,
      {
        [styles.cuiHorizontal]: orientation === "horizontal",
        [styles.cuiVertical]: orientation === "vertical",
        [styles.cuiXs]: size === "xs",
        [styles.cuiSm]: size === "sm",
        [styles.cuiMd]: size === "md",
        [styles.cuiLg]: size === "lg",
        [styles.cuiXl]: size === "xl",
        [styles.cuiXxl]: size === "xxl",
      },
      className
    )}
    {...props}
  />
);

export default Separator;
