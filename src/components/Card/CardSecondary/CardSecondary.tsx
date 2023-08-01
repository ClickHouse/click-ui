import styled from "styled-components";
import { Badge } from "@/components/Badge/Badge";
import { Title } from "../../Typography/Title/Title";
import { Text } from "../../Typography/Text/Text";
import { IconName } from "@/components/Icon/types";
import { Icon } from "../..";

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
  image: IconName;
  badgeState?: BadgeState;
  hasShadow?: boolean;
  disabled?: boolean;
  badgeText?: string;
  description: string;
  infoUrl: string;
  infoText: string;
}

const Wrapper = styled.div<Pick<CardProps, "hasShadow" | "disabled">>`
  background-color: ${({ theme }) => theme.click.card.secondary.color.background.default};
  border-radius: ${({ theme }) => theme.click.card.secondary.radii.all};
  border: ${({ theme }) => `1px solid ${theme.click.card.secondary.color.stroke.default}`};
  max-width: 420px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.click.card.secondary.space.all};
  gap: ${({ theme }) => theme.click.card.secondary.space.gap};
  box-shadow: ${({ hasShadow, theme }) => hasShadow ? theme.shadow[1] : "none"};

  &:hover, :focus {
    background-color: ${({ theme }) => theme.click.card.secondary.color.background.hover};
    cursor: pointer;
    .link, .link-arrow {
        color: ${({ theme }) => theme.click.card.secondary.color.link.hover};
      }
    }
  }

  &[disabled],
  &[disabled]:hover,
  &[disabled]:active {
    background-color: ${({ theme }) => theme.click.card.secondary.color.background.disabled};
    color: ${({ theme }) => theme.click.card.secondary.color.title.disabled};
    border: 1px solid ${({ theme }) => theme.click.card.secondary.color.stroke.disabled};
    cursor: not-allowed;

    .link, .link-arrow {
      color: ${({ theme }) => theme.click.card.secondary.color.link.disabled};
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

const HeaderLeft = styled.div<Pick<CardProps, "disabled">>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.click.card.secondary.space.gap};
  
  h3 {
    color: ${({ disabled, theme }) => disabled == true ? theme.click.global.color.text.muted : theme.click.global.color.text.default};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLink = styled.div`
  display: flex;
  align-items: center;
  a {
    color: ${({ theme }) => theme.click.card.secondary.color.link.default};
    text-decoration: none;
  }
`;

const ArrowContainer = styled(Icon)`
  color: ${({ theme }) => theme.click.card.secondary.color.link.default};
  height: ${({ theme }) => theme.click.image.medium.size.height};
  width: ${({ theme }) => theme.click.image.medium.size.width};
`

export const CardSecondary = ({
  title,
  image,
  badgeState,
  badgeText = "",
  hasShadow = false,
  disabled = false,
  description,
  infoUrl,
  infoText,
}: CardProps) => (
  <Wrapper disabled={disabled} hasShadow={hasShadow} onClick={() => alert(`We need to implement a routing system so I can go to ${infoUrl}`)}>
    <Header>
      <HeaderLeft disabled={disabled}>
        <Icon name={image} size="large" />
        <Title type='h3'>{title}</Title>
      </HeaderLeft>
      { badgeText && (
        <Badge
          text={badgeText}
          state={disabled == true ? "disabled" : badgeState }
        />)
      }
    </Header>

    <Content>
      <Text color="muted">{description}</Text>
    </Content>

    <InfoLink>
      <Text className="link">{infoText}</Text>
      <ArrowContainer
        name="chevron-right"
        className="link-arrow" />
    </InfoLink>
  </Wrapper>
);