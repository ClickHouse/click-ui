import { ReactNode } from "react";
import { Icon, HorizontalDirection, IconName } from "@/components";
import styles from "./IconWrapper.module.scss";

export const IconWrapper = ({
  icon,
  iconDir = "start",
  children,
}: {
  icon?: IconName;
  iconDir?: HorizontalDirection;
  children: ReactNode;
}) => {
  return (
    <span className={styles.cuiLabelContainer}>
      {icon && iconDir === "start" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
      <span className={styles.cuiEllipsisContainer}>{children}</span>
      {icon && iconDir === "end" && (
        <Icon
          name={icon}
          size="sm"
        />
      )}
    </span>
  );
};
