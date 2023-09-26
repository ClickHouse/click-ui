import styled from "styled-components";
import { Button, Icon, Spacer, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text } from "@/components/Typography/Text/Text";
import { MouseEvent, MouseEventHandler, ReactNode } from "react";

export interface CardPrimaryProps {
  title: string;
  icon: IconName;
  hasShadow?: boolean;
  disabled?: boolean;
  description: ReactNode;
  infoUrl?: string;
  infoText?: string;
  size?: "sm" | "md";
  onButtonClick?: MouseEventHandler<HTMLElement>;
}

const Wrapper = styled.div<{
  $size?: "sm" | "md";
  $hasShadow?: boolean;
  $disabled?: boolean;
}>`
  background-color: ${({ theme }) => theme.click.card.primary.color.background.default};
  border-radius: ${({ theme }) => theme.click.card.primary.radii.all};
  border: ${({ theme }) => `1px solid ${theme.click.card.primary.color.stroke.default}`};
  display: flex;
  max-width: 100%;
  text-align: center;
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

  &[disabled],
  &[disabled]:hover,
  &[disabled]:active {
    background-color: ${({ theme }) =>
      theme.click.card.primary.color.background.disabled};
    color: ${({ theme }) => theme.click.card.primary.color.title.disabled};
    border: 1px solid ${({ theme }) => theme.click.card.primary.color.stroke.disabled};
    cursor: not-allowed;

    button {
      background-color: ${({ theme }) =>
        theme.click.button.basic.color.primary.background.disabled};
      border-color: ${({ theme }) =>
        theme.click.button.basic.color.primary.stroke.disabled};
      &:active {
        background-color: ${({ theme }) =>
          theme.click.button.basic.color.primary.background.disabled};
        border-color: ${({ theme }) =>
          theme.click.button.basic.color.primary.stroke.disabled};
      }
    }
  }
`;

const Header = styled.div<{ $size?: "sm" | "md"; $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $size = "md", theme }) => theme.click.card.primary.space[$size].gap};

  h3 {
    color: ${({ $disabled, theme }) =>
      $disabled == true
        ? theme.click.global.color.text.muted
        : theme.click.global.color.text.default};
  }

  svg {
    height: ${({ $size = "md", theme }) => theme.click.card.primary.size.icon[$size].all};
    width: ${({ $size = "md", theme }) => theme.click.card.primary.size.icon[$size].all};
  }
`;

const Content = styled.div<{ $size?: "sm" | "md" }>`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: ${({ $size = "md", theme }) => theme.click.card.primary.space[$size].gap};
`;

export const CardPrimary = ({
  title,
  icon,
  hasShadow = false,
  description,
  infoUrl,
  infoText,
  size,
  disabled = false,
  onButtonClick,
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
      $hasShadow={hasShadow}
      $size={size}
      $disabled={disabled}
      {...props}
    >
      <Header
        $size={size}
        $disabled={disabled}
      >
        <Icon
          name={icon}
          aria-hidden
        />
        <Title type="h3">{title}</Title>
      </Header>

      <Content $size={size}>
        <Text color="muted">{description}</Text>
      </Content>

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
