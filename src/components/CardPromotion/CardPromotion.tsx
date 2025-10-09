"use client";

import { HTMLAttributes, useState } from "react";
import { Icon, IconName, Text } from "@/components";
import styles from "./CardPromotion.module.scss";

export interface CardPromotionProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  icon: IconName;
  dismissible?: boolean;
}

export const CardPromotion = ({
  label,
  icon,
  dismissible = false,
  ...props
}: CardPromotionProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className={styles.cuiBackground}>
      <div
        className={styles.cuiWrapper}
        {...props}
      >
        <Icon
          name={icon}
          aria-hidden
          className={styles.cuiCardIcon}
        />

        <Text>{label}</Text>

        {dismissible && (
          <button
            className={styles.cuiDismissWrapper}
            data-testid="click-alert-dismiss-button"
            onClick={() => setIsVisible(false)}
          >
            <Icon
              name="cross"
              aria-label="close"
            />
          </button>
        )}
      </div>
    </div>
  ) : null;
};
