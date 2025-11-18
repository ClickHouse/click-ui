import { SVGAttributes } from "react";
import Loading from "./Loading";
import clsx from "clsx";
import styles from "./LoadingAnimated.module.scss";

const LoadingAnimated = (props: SVGAttributes<SVGElement>) => (
  <Loading
    {...props}
    className={clsx(styles.cuiLoadingAnimated, props.className)}
  />
);

export default LoadingAnimated;
