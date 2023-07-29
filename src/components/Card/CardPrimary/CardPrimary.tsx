import styled from "styled-components";
import { Title } from "../../Typography/Title/Title";
import { Text } from "../../Typography/Text/Text";
import { IconName } from "@/components/Icon/types";
import { Button, Icon } from "../..";

export type CardState = 
  | "default" 
  | "hover" 
  | "active" 
  | "disabled";

  export type CardSize = 
  | "sm" 
  | "md";

export interface CardProps {
  title: string;
  image: IconName;
  hasShadow?: boolean;
  description: string;
  infoUrl: string;
  infoText: string;
  state?: CardState;
  size?: CardSize;
}

export const CardPrimary = ({
  title,
  image,
  hasShadow = false,
  description,
  infoUrl,
  infoText,
  state = "default",
  size = "md",
}: CardProps) => (
  <Wrapper 
    state={state} 
    hasShadow={hasShadow} 
    onClick={() => alert(`We need to implement a routing system so I can go to ${infoUrl}`)}>
    
    <Header>
      <Icon name={image} size="large" />
      <Title type='h3'>{title}</Title>
    </Header>

    <Content>
      <Text color="muted">{description}</Text>
    </Content>

    <Button>{infoText}</Button>
  </Wrapper>
);

interface WrapperProps {
  state: CardState;
  hasShadow: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ state = "default", theme }) => theme.click.card.primary.color.background[state]};
  border-radius: ${({ theme }) => theme.click.card.primary.radii.all};
  border: ${({ state, theme }) => `1px solid ${theme.click.card.primary.color.stroke[state]}`};
  display: flex;
  text-align: center;
  flex-direction: column;
  padding: ${({ theme }) => theme.click.card.primary.space.md.x} ${({ theme }) => theme.click.card.primary.space.md.y};
  gap: ${({ theme }) => theme.click.card.secondary.space.gap};
  box-shadow: ${({ hasShadow, theme }) => hasShadow ? theme.shadow[1] : "none"};

  &:hover {
    background-color: ${({ theme }) => theme.click.card.secondary.color.background.hover};
    cursor: pointer;
    .link, .link-arrow {
        color: ${({ theme }) => theme.click.card.secondary.color.link.hover};
      }
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  gap: ${({ theme }) => theme.click.card.primary.space.md.gap};
`;

const Content = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  align-self: center;
`;