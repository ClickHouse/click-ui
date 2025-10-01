import { SVGAttributes } from "react";
import Loading from "./Loading";
import clsx from "clsx";
import styles from "./LoadingAnimated.module.scss";

const LoadingAnimated = (props: SVGAttributes<SVGElement>) => (
  <Loading
    className={clsx(styles.cuiLoadingAnimated, props.className)}
    {...props}
  />
);

export default LoadingAnimated;
