import styled from "styled-components";
import { Button, Icon, Spacer, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text, TextAlignment } from "@/components/Typography/Text/Text";
import { HTMLAttributes, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { WithTopBadgeProps, withTopBadge } from "@/components/CardPrimary/withTopBadge";

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

const Wrapper = styled.div<{
  $size?: CardPrimarySize;
  $hasShadow?: boolean;
  $isSelected?: boolean;
  $alignContent?: ContentAlignment;
}>`
  background-color: ${({ theme }) => theme.click.card.primary.color.background.default};
  border-radius: ${({ theme }) => theme.click.card.primary.radii.all};
  border: ${({ theme }) => `1px solid ${theme.click.card.primary.color.stroke.default}`};
  display: flex;
  width: 100%;
  max-width: 100%;
  text-align: ${({ $alignContent }) =>
    $alignContent === "start" ? "left" : $alignContent === "end" ? "right" : "center"};
  flex-direction: column;
  padding: ${({ $size = "md", theme }) =>
    `${theme.click.card.primary.space[$size].x} ${theme.click.card.primary.space[$size].y}`};
  gap: ${({ $size = "md", theme }) => theme.click.card.primary.space[$size].gap};
  box-shadow: ${({ $hasShadow, theme }) => ($hasShadow ? theme.shadow[1] : "none")};

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.click.card.secondary.color.background.hover};
    cursor: pointer;
    button {
      background-color: ${({ theme }) =>
        theme.click.button.basic.color.primary.background.hover};
      border-color: ${({ theme }) => theme.click.button.basic.color.primary.stroke.hover};
      &:active {
        background-color: ${({ theme }) =>
          theme.click.button.basic.color.primary.background.active};
        border-color: ${({ theme }) =>
          theme.click.button.basic.color.primary.stroke.active};
      }
    }
  }

  &:active {
    border-color: ${({ theme }) => theme.click.button.basic.color.primary.stroke.active};
  }

  &[aria-disabled="true"],
  &[aria-disabled="true"]:hover,
  &[aria-disabled="true"]:focus,
  &[aria-disabled="true"]:active {
    ${({ theme }) => `
    background-color: ${theme.click.card.primary.color.background.disabled};
    color: ${theme.click.card.primary.color.title.disabled};
    border: 1px solid ${theme.click.card.primary.color.stroke.disabled};
    cursor: not-allowed;

    button {
      background-color: ${theme.click.button.basic.color.primary.background.disabled};
      border-color: ${theme.click.button.basic.color.primary.stroke.disabled};
      &:active {
        background-color: ${theme.click.button.basic.color.primary.background.disabled};
        border-color: ${theme.click.button.basic.color.primary.stroke.disabled};
      }
    }`}
  }

  ${({ $isSelected, theme }) =>
    $isSelected
      ? `border-color: ${theme.click.button.basic.color.primary.stroke.active};`
      : ""}
`;

const Header = styled.div<{
  $size?: "sm" | "md";
  $disabled?: boolean;
  $alignContent?: ContentAlignment;
}>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $alignContent = "center" }) =>
    ["start", "end"].includes($alignContent) ? `flex-${$alignContent}` : $alignContent};
  gap: ${({ $size = "md", theme }) => theme.click.card.primary.space[$size].gap};

  h3 {
    color: ${({ $disabled, theme }) =>
      $disabled == true
        ? theme.click.global.color.text.muted
        : theme.click.global.color.text.default};
  }

  svg,
  img {
    height: ${({ $size = "md", theme }) => theme.click.card.primary.size.icon[$size].all};
    width: ${({ $size = "md", theme }) => theme.click.card.primary.size.icon[$size].all};
  }
`;

const Content = styled.div<{ $size?: "sm" | "md"; $alignContent?: ContentAlignment }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: ${({ $alignContent = "center" }) =>
    ["start", "end"].includes($alignContent) ? `flex-${$alignContent}` : $alignContent};
  gap: ${({ $size = "md", theme }) => theme.click.card.primary.space[$size].gap};
  flex: 1;
`;

const convertCardAlignToTextAlign = (align: ContentAlignment): TextAlignment => {
  if (align === "center") {
    return "center";
  }
  return align === "start" ? "left" : "right";
};

const Card = ({
  alignContent,
  title,
  icon,
  iconUrl,
  hasShadow = false,
  description,
  infoUrl,
  infoText,
  size,
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

  const Component = !!infoUrl || typeof onButtonClick === "function" ? Button : "div";
  return (
    <Wrapper
      $alignContent={alignContent}
      $hasShadow={hasShadow}
      $size={size}
      aria-disabled={disabled}
      $isSelected={isSelected}
      tabIndex={0}
      {...props}
    >
      {(icon || title) && (
        <Header
          $size={size}
          $disabled={disabled}
          $alignContent={alignContent}
        >
          {iconUrl ? (
            <img
              src={iconUrl}
              alt="card image"
              aria-hidden
            />
          ) : (
            icon && (
              <Icon
                name={icon}
                aria-hidden
              />
            )
          )}
          {title && <Title type="h3">{title}</Title>}
        </Header>
      )}

      {(description || children) && (
        <Content
          $size={size}
          $alignContent={alignContent}
        >
          {description && (
            <Text
              color="muted"
              align={convertCardAlignToTextAlign(alignContent ?? "start")}
            >
              {description}
            </Text>
          )}
          {children}
        </Content>
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
    </Wrapper>
  );
};

export const CardPrimary = withTopBadge<CardPrimaryProps>(Card);
