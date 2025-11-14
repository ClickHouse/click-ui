"use client";

import clsx from "clsx";
import { Button, Icon, Spacer, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text, TextAlignment } from "@/components/Typography/Text/Text";
import { HTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { WithTopBadgeProps, withTopBadge } from "@/components/CardPrimary/withTopBadge";
import { capitalize } from "../../utils/capitalize";
import styles from "./CardPrimary.module.scss";

export type CardPrimarySize = "sm" | "md";
type ContentAlignment = "start" | "center" | "end";
export interface CardPrimaryProps
  extends HTMLAttributes<HTMLDivElement>,
    WithTopBadgeProps {
  title?: string;
  icon?: IconName;
  iconUrl?: string;
  hasShadow?: boolean;
  disabled?: boolean;
  description?: ReactNode;
  infoUrl?: string;
  infoText?: string;
  size?: CardPrimarySize;
  isSelected?: boolean;
  children?: ReactNode;
  alignContent?: ContentAlignment;
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
  className,
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

  const sizeClass = `cuiSize${capitalize(size)}`;
  const alignClass = `cuiAlign${capitalize(alignContent)}`;
  const iconSizeClass = `cuiIcon${capitalize(size)}`;

  const wrapperClasses = clsx(
    styles.cuiWrapper,
    styles[sizeClass],
    styles[alignClass],
    {
      [styles.cuiHasShadow]: hasShadow,
      [styles.cuiIsSelected]: isSelected,
    },
    className
  );

  const headerClasses = clsx(
    styles.cuiHeader,
    styles[sizeClass],
    styles[alignClass],
    {
      [styles.cuiDisabled]: disabled,
    }
  );

  const contentClasses = clsx(styles.cuiContent, styles[sizeClass], styles[alignClass]);

  const iconClasses = styles[iconSizeClass];

  const Component = !!infoUrl || typeof onButtonClick === "function" ? Button : "div";
  return (
    <div
      aria-disabled={disabled}
      tabIndex={0}
      {...props}
      className={wrapperClasses}
      data-cui-size={size}
      data-cui-align={alignContent}
    >
      {(icon || title) && (
        <div
          className={headerClasses}
          data-cui-size={size}
          data-cui-align={alignContent}
        >
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
        <div
          className={contentClasses}
          data-cui-size={size}
          data-cui-align={alignContent}
        >
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
