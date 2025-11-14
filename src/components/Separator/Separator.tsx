import clsx from "clsx";
import { capitalize } from "../../utils/capitalize";
import styles from "./Separator.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = ({
  orientation = "horizontal",
  size,
  className,
  decorative = true,
  ...props
}: Props) => {
  const orientationClass = `cui${capitalize(orientation)}`;
  const sizeClass = `cuiSize${capitalize(size)}`;

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={!decorative && orientation !== "horizontal" ? orientation : undefined}
      className={clsx(
        styles.cuiSeparator,
        styles[orientationClass],
        styles[sizeClass],
        className
      )}
      data-cui-orientation={orientation}
      data-cui-size={size}
      {...props}
    />
  );
};

export default Separator;
