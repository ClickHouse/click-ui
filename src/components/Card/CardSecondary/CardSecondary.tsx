import styled from "styled-components";
import { Badge } from "@/components/Badge/Badge";
import { Title } from "../../Typography/Title/Title";
import { Text } from "../../Typography/Text/Text";
import { IconName } from "@/components/Icon/types";
import { Icon } from "../..";

export type CardState = 
  | "default" 
  | "hover" 
  | "active" 
  | "disabled";

export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled"
  | "warning"
  | "info";

export interface CardProps {
  title: string;
  logo: IconName;
  hasBadge?: boolean;
  hasShadow?: boolean;
  badgeState?: BadgeState;
  badgeText?: string;
  description: string;
  infoUrl: string;
  infoText: string;
  state?: CardState;
}

export const CardSecondary = ({
  title,
  logo,
  hasBadge = true,
  badgeText = "",
  badgeState,
  hasShadow = false,
  description,
  infoUrl,
  infoText,
  state = "default",
}: CardProps) => (
  <Wrapper state={state} hasShadow={hasShadow} onClick={() => alert(`We need to implement a routing system so I can go to ${infoUrl}`)}>
    <Header>
      <HeaderLeft>
        <Icon name={logo} size="large" />
        <Title type='h3'>{title}</Title>
      </HeaderLeft>
      { hasBadge && (
        <Badge
          text={badgeText}
          state={state == "disabled" ? "disabled" : badgeState }
        />)
      }
    </Header>

    <Content>
      <Text color="muted">{description}</Text>
    </Content>

    <InfoLink state={state}>
      <Text className="link">{infoText}</Text>
      <ArrowContainer 
        state={state}
        as={Icon} 
        name="chevron-right"
        className="link-arrow" />
    </InfoLink>
  </Wrapper>
);

interface WrapperProps {
  state: CardState;
  hasShadow: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ state = "default", theme }) => theme.click.card.secondary.color.background[state]};
  border-radius: ${({ theme }) => theme.click.card.secondary.radii.all};
  border: ${({ state, theme }) => `1px solid ${theme.click.card.secondary.color.stroke[state]}`};
  max-width: 420px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.click.card.secondary.space.all};
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
  justify-content: space-between;
  align-items: center;
  z-index: 1;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.click.card.secondary.space.gap};
`;

const Content = styled.div`
  /* width: 330px; */
`;

const InfoLink = styled.div<Pick<CardProps, "state">>`
  display: flex;
  align-items: center;
  a {
    color: ${({ state = "default", theme }) => theme.click.card.secondary.color.link[state]};
    text-decoration: none;
  }
`;

const ArrowContainer = styled.svg<Pick<CardProps, "state">>`
  color: ${({ state = "default", theme }) => theme.click.card.secondary.color.link[state]};
  height: ${({ theme }) => theme.click.image.medium.size.height};
  width: ${({ theme }) => theme.click.image.medium.size.width};
`