import { ComponentPropsWithoutRef } from "react";
import styles from "./InlineCodeBlock.module.scss";

export const InlineCodeBlock = (props: ComponentPropsWithoutRef<"span">) => (
  <span
    className={styles.cuiInlineContainer}
    {...props}
  />
);
