"use client";

import { Icon } from "@/components";
import { IconName } from "@/components/Icon/types";
import { capitalize } from "@/utils/capitalize";
import { useState, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Alert.module.scss";

type AlertType = "default" | "banner";
type AlertSize = "small" | "medium";
type AlertState = "neutral" | "success" | "warning" | "danger" | "info";
export type AlertProps = {
  state?: AlertState;
  title?: ReactNode;
  text: ReactNode;
  size?: AlertSize;
  type?: AlertType;
  showIcon?: boolean;
  dismissible?: boolean;
  customIcon?: IconName;
};

const stateIconMap: Record<AlertState, IconName> = {
  neutral: "information",
  success: "check",
  warning: "warning",
  danger: "warning",
  info: "information",
};

const Alert = ({
  text,
  title = "",
  size = "small",
  state = "neutral",
  type = "default",
  showIcon = true,
  dismissible,
  customIcon,
  ...delegated
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const typeClass = `cuiType${capitalize(type)}`;
  const stateClass = `cuiState${capitalize(state)}`;
  const sizeClass = `cuiSize${capitalize(size)}`;

  return isVisible ? (
    <div
      className={clsx(styles.cuiWrapper, styles[typeClass], styles[stateClass])}
      data-testid="click-alert"
      data-cui-type={type}
      data-cui-state={state}
      data-cui-size={size}
      {...delegated}
    >
      {dismissible && type === "banner" && (
        <button className={styles.cuiDismissWrapper}></button>
      )}
      {showIcon && (
        <div
          className={clsx(styles.cuiIconWrapper, styles[typeClass], styles[stateClass], styles[sizeClass])}
        >
          <Icon
            className={size === "small" ? styles.cuiStyledIconSmall : styles.cuiStyledIconMedium}
            size="sm"
            aria-hidden
            name={customIcon || stateIconMap[state]}
          />
        </div>
      )}
      <div
        className={clsx(styles.cuiTextWrapper, styles[sizeClass])}
      >
        {title && (
          <h6
            className={clsx(styles.cuiTitle, styles[sizeClass])}
          >
            {title}
          </h6>
        )}
        <div
          className={clsx(styles.cuiText, styles[sizeClass])}
        >
          {text}
        </div>
      </div>
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
  ) : null;
};

const DangerAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="danger"
  />
);

const InfoAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="info"
  />
);

const SuccessAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="success"
  />
);

const WarningAlert = (props: AlertProps) => (
  <Alert
    {...props}
    state="warning"
  />
);

export { Alert, DangerAlert, InfoAlert, SuccessAlert, WarningAlert };
