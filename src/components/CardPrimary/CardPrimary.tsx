import clsx from "clsx";
import { Button, Icon, Spacer, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text, TextAlignment } from "@/components/Typography/Text/Text";
import { HTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { WithTopBadgeProps, withTopBadge } from "@/components/CardPrimary/withTopBadge";
import styles from "./CardPrimary.module.scss";

export type CardPrimarySize = "sm" | "md";
type ContentAlignment = "start" | "center" | "end";
export interface CardPrimaryProps
  extends HTMLAttributes<HTMLDivElement>, WithTopBadgeProps {
  /** The title text displayed in the card */
  title?: string;
  /** Icon name to display in the card header */
  icon?: IconName;
  /** URL to a custom icon image */
  iconUrl?: string;
  /** Whether to show a shadow on the card */
  hasShadow?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** The description content of the card */
  description?: ReactNode;
  /** URL to navigate to when clicked */
  infoUrl?: string;
  /** Text to display on the action button */
  infoText?: string;
  /** The size variant of the card */
  size?: CardPrimarySize;
  /** Whether the card is in a selected state */
  isSelected?: boolean;
  /** Additional content to display in the card */
  children?: ReactNode;
  /** Content alignment within the card */
  alignContent?: ContentAlignment;
  /** Callback when the card button is clicked */
  onButtonClick?: MouseEventHandler<HTMLElement>;
}

const convertCardAlignToTextAlign = (align: ContentAlignment): TextAlignment => {
  if (align === "center") {
    return "center";
  }
  return align === "start" ? "left" : "right";
};

const Card = ({
  alignContent = "center",
  title,
  icon,
  iconUrl,
  hasShadow = false,
  description,
  infoUrl,
  infoText,
  size = "md",
  disabled = false,
  onButtonClick,
  isSelected,
  children,
  ...props
}: CardPrimaryProps) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (typeof onButtonClick === "function") {
      onButtonClick(e);
    }
    if (infoUrl && infoUrl.length > 0) {
      window.open(infoUrl, "_blank");
    }
  };

  const wrapperClasses = clsx(styles.cuiWrapper, {
    [styles.cuiHasShadow]: hasShadow,
    [styles.cuiSizeSm]: size === "sm",
    [styles.cuiSizeMd]: size === "md",
    [styles.cuiAlignStart]: alignContent === "start",
    [styles.cuiAlignCenter]: alignContent === "center",
    [styles.cuiAlignEnd]: alignContent === "end",
    [styles.cuiIsSelected]: isSelected,
  });

  const headerClasses = clsx(styles.cuiHeader, {
    [styles.cuiSizeSm]: size === "sm",
    [styles.cuiSizeMd]: size === "md",
    [styles.cuiAlignStart]: alignContent === "start",
    [styles.cuiAlignCenter]: alignContent === "center",
    [styles.cuiAlignEnd]: alignContent === "end",
    [styles.cuiDisabled]: disabled,
  });

  const contentClasses = clsx(styles.cuiContent, {
    [styles.cuiSizeSm]: size === "sm",
    [styles.cuiSizeMd]: size === "md",
    [styles.cuiAlignStart]: alignContent === "start",
    [styles.cuiAlignCenter]: alignContent === "center",
    [styles.cuiAlignEnd]: alignContent === "end",
  });

  const iconClasses = clsx({
    [styles.cuiSizeSm]: size === "sm",
    [styles.cuiSizeMd]: size === "md",
  });

  const Component = !!infoUrl || typeof onButtonClick === "function" ? Button : "div";
  return (
    <div
      className={wrapperClasses}
      aria-disabled={disabled}
      tabIndex={0}
      {...props}
    >
      {(icon || title) && (
        <div className={headerClasses}>
          {iconUrl ? (
            <img
              src={iconUrl}
              alt="card icon"
              aria-hidden
              className={iconClasses}
            />
          ) : (
            icon && (
              <Icon
                name={icon}
                aria-hidden
                className={iconClasses}
              />
            )
          )}
          {title && <Title type="h3">{title}</Title>}
        </div>
      )}

      {(description || children) && (
        <div className={contentClasses}>
          {description && (
            <Text
              color="muted"
              align={convertCardAlignToTextAlign(alignContent)}
            >
              {description}
            </Text>
          )}
          {children}
        </div>
      )}

      {size == "sm" && <Spacer size="sm" />}

      {infoText && (
        <Component
          onClick={handleClick}
          disabled={disabled}
        >
          {infoText}
        </Component>
      )}
    </div>
  );
};

export const CardPrimary = withTopBadge<CardPrimaryProps>(Card);
