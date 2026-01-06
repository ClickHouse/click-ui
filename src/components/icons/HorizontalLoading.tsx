import { SVGAttributes } from "react";
import DotsHorizontal from "./DotsHorizontal";
import clsx from "clsx";
import styles from "./HorizontalLoading.module.scss";

const HorizontalLoading = (props: SVGAttributes<SVGElement>) => (
  <DotsHorizontal
    {...props}
    className={clsx(styles.cuiHorizontalLoading, props.className)}
  />
);

export default HorizontalLoading;
