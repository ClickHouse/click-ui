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
  /** The visual state/severity of the alert */
  state?: AlertState;
  /** Optional title displayed above the text */
  title?: ReactNode;
  /** The main message text of the alert */
  text: ReactNode;
  /** The size variant of the alert */
  size?: AlertSize;
  /** The type of alert (default or banner) */
  type?: AlertType;
  /** Whether to show the state icon */
  showIcon?: boolean;
  /** Custom icon to display instead of the default state icon */
  customIcon?: IconName;
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when the alert is dismissed (requires dismissible=true) */
  onDismiss?: () => void;
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
  onDismiss,
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
          className={clsx(
            styles.cuiIconWrapper,
            styles[typeClass],
            styles[stateClass],
            styles[sizeClass]
          )}
        >
          <Icon
            className={
              size === "small" ? styles.cuiStyledIconSmall : styles.cuiStyledIconMedium
            }
            size="sm"
            aria-hidden
            name={customIcon || stateIconMap[state]}
          />
        </div>
      )}
      <div className={clsx(styles.cuiTextWrapper, styles[sizeClass])}>
        {title && <h6 className={clsx(styles.cuiTitle, styles[sizeClass])}>{title}</h6>}
        <div className={clsx(styles.cuiText, styles[sizeClass])}>{text}</div>
      </div>
      {dismissible && (
        <button
          className={styles.cuiDismissWrapper}
          data-testid="click-alert-dismiss-button"
          onClick={handleDismiss}
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
