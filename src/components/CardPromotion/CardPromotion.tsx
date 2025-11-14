"use client";

import { HTMLAttributes, useState } from "react";
import clsx from "clsx";
import { Icon, IconName, Text } from "@/components";
import styles from "./CardPromotion.module.scss";

export interface CardPromotionProps extends HTMLAttributes<HTMLDivElement> {
  /** The text label displayed in the promotion card */
  label: string;
  /** The icon to display */
  icon: IconName;
  /** Whether the card can be dismissed/closed */
  dismissible?: boolean;
}

export const CardPromotion = ({
  label,
  icon,
  dismissible = false,
  className,
  ...props
}: CardPromotionProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <div className={styles.cuiBackground}>
      <div
        className={clsx(styles.cuiWrapper, className)}
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
