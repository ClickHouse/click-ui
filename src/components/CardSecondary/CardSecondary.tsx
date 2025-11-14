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
  /** The title text displayed in the card header */
  title: string;
  /** Icon name to display in the header */
  icon?: IconName;
  /** URL to a custom icon image */
  iconUrl?: string;
  /** The visual state of the badge */
  badgeState?: BadgeState;
  /** Whether to show a shadow on the card */
  hasShadow?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Text to display in the badge */
  badgeText?: string;
  /** The description content of the card */
  description: ReactNode;
  /** URL for the info link */
  infoUrl?: string;
  /** Text to display in the info link */
  infoText?: string;
  /** Icon to display in the info link */
  infoIcon?: IconName;
  /** Size of the info link icon */
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
      {...props}
      className={clsx(
        styles.cuiWrapper,
        {
          [styles.cuiHasShadow]: hasShadow,
          [styles.cuiDisabled]: disabled,
        },
        className
      )}
      data-cui-disabled={disabled ? "true" : undefined}
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
