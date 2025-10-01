import { HTMLAttributes } from "react";
import styles from "./InlineCodeBlock.module.scss";

export const InlineCodeBlock = (props: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={styles.cuiInlineContainer}
    {...props}
  />
);
