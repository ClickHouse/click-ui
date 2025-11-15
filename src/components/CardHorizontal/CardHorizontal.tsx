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
import { capitalize } from "@/utils/capitalize";
import styles from "./CardHorizontal.module.scss";

type CardColor = "default" | "muted";
export type CardSize = "sm" | "md";

export interface CardHorizontalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  icon?: IconName;
  disabled?: boolean;
  description?: ReactNode;
  infoUrl?: string;
  /** Shows and hides the button */
  infoText?: string;
  isSelected?: boolean;
  isSelectable?: boolean;
  children?: ReactNode;
  color?: CardColor;
  size?: CardSize;
  /** Shows and hides the badge */
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
  size = "md",
  badgeText,
  badgeState,
  badgeIcon,
  badgeIconDir,
  onButtonClick,
  className,
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

  const colorClass = `cuiColor${capitalize(color)}`;
  const sizeClass = `cuiSize${capitalize(size)}`;
  const selectedClass = isSelected ? "cuiSelected" : undefined;
  const disabledClass = disabled ? "cuiDisabled" : undefined;

  const wrapperClasses = clsx(
    styles.cuiWrapper,
    styles[colorClass],
    styles[sizeClass],
    selectedClass && styles[selectedClass],
    disabledClass && styles[disabledClass],
    {
      [styles.cuiIsSelectable]: isSelectable,
    },
    className
  );

  const contentWrapperClasses = clsx(styles.cuiContentWrapper, styles[sizeClass]);
  const iconTextContentWrapperClasses = clsx(
    styles.cuiIconTextContentWrapper,
    styles[sizeClass]
  );
  const iconClasses = clsx(styles.cuiCardIcon);

  return (
    <div
      tabIndex={0}
      onClick={handleClick}
      className={wrapperClasses}
      data-cui-color={color}
      data-cui-size={size}
      data-cui-selected={isSelected ? "true" : undefined}
      data-cui-disabled={disabled ? "true" : undefined}
      {...props}
    >
      <div className={contentWrapperClasses}>
        <div className={iconTextContentWrapperClasses}>
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
