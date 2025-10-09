"use client";

import { Badge, Icon, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text } from "@/components/Typography/Text/Text";
import { IconSize } from "@/components/Icon/types";
import { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./CardSecondary.module.scss";

export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled"
  | "warning"
  | "info";

export interface CardSecondaryProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: IconName;
  iconUrl?: string;
  badgeState?: BadgeState;
  hasShadow?: boolean;
  disabled?: boolean;
  badgeText?: string;
  description: ReactNode;
  infoUrl?: string;
  infoText?: string;
  infoIcon?: IconName;
  infoIconSize?: IconSize;
}

export const CardSecondary = ({
  title,
  icon,
  iconUrl,
  badgeState,
  badgeText = "",
  hasShadow = false,
  disabled = false,
  description,
  infoUrl,
  infoText,
  infoIcon = "chevron-right",
  infoIconSize = "md",
  className,
  ...props
}: CardSecondaryProps) => {
  const InfoLinkComponent = disabled || !infoUrl || infoUrl.length === 0 ? "div" : "a";

  return (
    <div
      aria-disabled={disabled}
      tabIndex={0}
      className={clsx(
        styles.cuiWrapper,
        {
          [styles.cuiHasShadow]: hasShadow,
          [styles.cuiDisabled]: disabled,
        },
        className
      )}
      {...props}
    >
      <div className={styles.cuiHeader}>
        <div
          className={clsx(styles.cuiHeaderLeft, {
            [styles.cuiDisabled]: disabled,
          })}
        >
          {iconUrl ? (
            <img
              className={styles.cuiCustomIcon}
              src={iconUrl}
              alt="card icon"
              aria-hidden
            />
          ) : (
            icon && (
              <Icon
                name={icon}
                aria-hidden
                size="lg"
              />
            )
          )}
          <Title type="h3">{title}</Title>
        </div>
        {badgeText && (
          <Badge
            text={badgeText}
            state={disabled == true ? "disabled" : badgeState}
          />
        )}
      </div>

      <div className={styles.cuiContent}>
        <Text color="muted">{description}</Text>
      </div>
      {(infoUrl || infoText) && (
        <InfoLinkComponent
          className={styles.cuiInfoLink}
          href={disabled ? undefined : infoUrl}
        >
          <Text className={styles.cuiLinkText}>{infoText}</Text>
          <Icon
            className={styles.cuiLinkIcon}
            size={infoIconSize}
            name={infoIcon}
          />
        </InfoLinkComponent>
      )}
    </div>
  );
};
