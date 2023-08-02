import styled from "styled-components";
import { Title } from "../../Typography/Title/Title";
import { Text } from "../../Typography/Text/Text";
import { IconName } from "@/components/Icon/types";
import { Button, Icon, Spacer } from "../..";

export interface CardProps {
  title: string;
  image: IconName;
  hasShadow?: boolean;
  disabled?: boolean;
  description: string;
  infoUrl: string;
  infoText: string;
  size?: "sm" | "md";
}

const Wrapper = styled.div<Pick<CardProps, "size" | "hasShadow" | "size" | "disabled">>`
  background-color: ${({ theme }) => theme.click.card.primary.color.background.default};
  border-radius: ${({ theme }) => theme.click.card.primary.radii.all};
  border: ${({ theme }) => `1px solid ${theme.click.card.primary.color.stroke.default}`};
  display: flex;
  max-width: 100%;
  text-align: center;
  flex-direction: column;
  padding: ${({ size = "md", theme }) =>
    `${theme.click.card.primary.space[size].x} ${theme.click.card.primary.space[size].y}`};
  gap: ${({ size = "md", theme }) => theme.click.card.primary.space[size].gap};
  box-shadow: ${({ hasShadow, theme }) => (hasShadow ? theme.shadow[1] : "none")};

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

const Header = styled.div<Pick<CardProps, "size" | "disabled">>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ size = "md", theme }) => theme.click.card.primary.space[size].gap};

  h3 {
    color: ${({ disabled, theme }) =>
      disabled == true
        ? theme.click.global.color.text.muted
        : theme.click.global.color.text.default};
  }

  svg {
    height: ${({ size = "md", theme }) => theme.click.card.primary.size.icon[size].all};
    width: ${({ size = "md", theme }) => theme.click.card.primary.size.icon[size].all};
  }
`;

const Content = styled.div<Pick<CardProps, "size">>`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: ${({ size = "md", theme }) => theme.click.card.primary.space[size].gap};
`;

export const CardPrimary = ({
  title,
  image,
  hasShadow = false,
  description,
  infoUrl,
  infoText,
  size,
  disabled = false,
}: CardProps) => (
  <Wrapper
    hasShadow={hasShadow}
    size={size}
    disabled={disabled}
    onClick={() =>
      alert(`We need to implement a routing system so I can go to ${infoUrl}`)
    }
  >
    <Header
      size={size}
      disabled={disabled}
    >
      <Icon name={image} />
      <Title type="h3">{title}</Title>
    </Header>

    <Content size={size}>
      <Text color="muted">{description}</Text>
    </Content>

    {size == "sm" && <Spacer size="sm" />}

    <Button disabled={disabled}>{infoText}</Button>
  </Wrapper>
);
