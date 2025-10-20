"use client";

import { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";
import {
  Badge,
  BadgeState,
  Button,
  Container,
  HorizontalDirection,
  Icon,
  IconName,
} from "@/components";
import styles from "./CardHorizontal.module.scss";

type CardColor = "default" | "muted";

export interface CardHorizontalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  icon?: IconName;
  disabled?: boolean;
  description?: ReactNode;
  infoUrl?: string;
  infoText?: string;
  isSelected?: boolean;
  isSelectable?: boolean;
  children?: ReactNode;
  color?: CardColor;
  badgeText?: string;
  badgeState?: BadgeState;
  badgeIcon?: IconName;
  badgeIconDir?: HorizontalDirection;
  onButtonClick?: MouseEventHandler<HTMLElement>;
}

export const CardHorizontal = ({
  title,
  icon,
  description,
  disabled = false,
  infoText,
  infoUrl,
  isSelected,
  isSelectable = infoText ? false : true,
  children,
  color = "default",
  badgeText,
  badgeState,
  badgeIcon,
  badgeIconDir,
  onButtonClick,
  ...props
}: CardHorizontalProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (typeof onButtonClick === "function") {
      onButtonClick(e);
    }
    if (infoUrl && infoUrl.length > 0) {
      window.open(infoUrl, "_blank");
    }
  };

  const wrapperClasses = clsx(styles.cuiWrapper, {
    [styles.cuiColorDefault]: color === "default",
    [styles.cuiColorMuted]: color === "muted",
    [styles.cuiIsSelectable]: isSelectable,
    [styles.cuiIsSelected]: isSelected,
    [styles.cuiDisabled]: disabled,
  });

  const iconClasses = clsx(styles.cuiCardIcon);

  return (
    <div
      className={wrapperClasses}
      tabIndex={0}
      onClick={handleClick}
      {...props}
    >
      <div className={styles.cuiContentWrapper}>
        <div className={styles.cuiIconTextContentWrapper}>
          {icon && (
            <Icon
              name={icon}
              aria-hidden
              className={iconClasses}
            />
          )}
          <Container
            padding="none"
            orientation="vertical"
          >
            {title && (
              <div className={styles.cuiHeader}>
                <Container
                  orientation="horizontal"
                  gap="xs"
                  isResponsive={false}
                  fillWidth={false}
                  grow="1"
                >
                  {title}
                </Container>
                {badgeText && (
                  <Container
                    isResponsive={false}
                    justifyContent="end"
                    fillWidth={false}
                    data-testid="horizontal-card-badge"
                  >
                    <Badge
                      text={badgeText}
                      size="md"
                      state={badgeState}
                      icon={badgeIcon}
                      iconDir={badgeIconDir}
                    />
                  </Container>
                )}
              </div>
            )}

            {description && <div className={styles.cuiDescription}>{description}</div>}
            {children && <div className={styles.cuiDescription}>{children}</div>}
          </Container>
        </div>
        {infoText && (
          <Container
            justifyContent="end"
            fillWidth={false}
            data-testid="horizontal-card-button"
          >
            <Button
              label={infoText}
              onClick={handleClick}
              fillWidth
            />
          </Container>
        )}
      </div>
    </div>
  );
};
