import { SVGAttributes } from "react";
import DotsHorizontal from "./DotsHorizontal";
import clsx from "clsx";
import styles from "./HorizontalLoading.module.scss";

const HorizontalLoading = (props: SVGAttributes<SVGElement>) => (
  <DotsHorizontal
    className={clsx(styles.cuiHorizontalLoading, props.className)}
    {...props}
  />
);

export default HorizontalLoading;
