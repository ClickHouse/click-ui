import styled from "styled-components";
import { Icon, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text } from "@/components/Typography/Text/Text";
import { HTMLAttributes, ReactNode } from "react";

type CardColor = "default" | "muted";

export interface CardHorizontalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  icon?: IconName;
  disabled?: boolean;
  description?: ReactNode;
  isSelected?: boolean;
  children?: ReactNode;
  color?: CardColor;
}

const Wrapper = styled.div<{
  $hasShadow?: boolean;
  $disabled?: boolean;
  $isSelected?: boolean;
  $color: CardColor;
}>`
  display: flex;
  max-width: 100%;
  align-items: center;
  justify-content: flex-start;

  ${({ theme, $color }) => `
    background: ${theme.click.card.horizontal[$color].color.background.default};
    border-radius: ${theme.click.card.horizontal.radii.all};
    border: 1px solid ${theme.click.card.horizontal[$color].color.stroke.default};
    padding: ${theme.click.card.horizontal.space[$size].x} ${theme.click.card.horizontal.space[$size].y};
    gap: ${theme.click.card.horizontal.space[$size].gap};
  `}
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

  ${({ $isSelected, theme }) =>
    $isSelected
      ? `border-color: ${theme.click.button.basic.color.primary.stroke.active};`
      : ""}
`;

const Header = styled.div<{ $size?: "sm" | "md"; $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $size = "md", theme }) => theme.click.card.horizontal.space[$size].gap};

  h3 {
    color: ${({ $disabled, theme }) =>
      $disabled == true
        ? theme.click.global.color.text.muted
        : theme.click.global.color.text.default};
  }

  svg {
    height: ${({ $size = "md", theme }) =>
      theme.click.card.horizontal.size.icon[$size].all};
    width: ${({ $size = "md", theme }) =>
      theme.click.card.horizontal.size.icon[$size].all};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: inherit;
`;

const Content = styled.div<{ $size?: "sm" | "md" }>`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: ${({ $size = "md", theme }) => theme.click.card.horizontal.space[$size].gap};
  flex: 1;
`;

export const CardHorizontal = ({
  title,
  icon,
  description,
  disabled = false,
  isSelected,
  children,
  ...props
}: CardHorizontalProps) => {
  return (
    <Wrapper
      $disabled={disabled}
      $isSelected={isSelected}
      {...props}
    >
      {icon && (
        <Icon
          name={icon}
          aria-hidden
        />
      )}
      <ContentWrapper>
        <Header $disabled={disabled}>{title && <Title type="h3">{title}</Title>}</Header>

        {description && <Text color="muted">{description}</Text>}
        {children && <Content>{children}</Content>}
      </ContentWrapper>
    </Wrapper>
  );
};
