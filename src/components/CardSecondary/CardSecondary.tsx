import styled from "styled-components";
import { Badge, Icon, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text } from "@/components/Typography/Text/Text";
import { HTMLAttributes, ReactNode } from "react";

export type BadgeState =
  | "default"
  | "success"
  | "neutral"
  | "danger"
  | "disabled"
  | "warning"
  | "info";

export interface CardSecondaryProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  icon: IconName;
  badgeState?: BadgeState;
  hasShadow?: boolean;
  disabled?: boolean;
  badgeText?: string;
  description: ReactNode;
  infoUrl?: string;
  infoText?: string;
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.click.card.secondary.space.gap};

  h3,
  svg {
    color: ${({ $disabled, theme }) =>
      $disabled == true
        ? theme.click.global.color.text.muted
        : theme.click.global.color.text.default};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const InfoLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.click.card.secondary.color.link.default};
  text-decoration: none;
`;
const ArrowContainer = styled(Icon)`
  color: ${({ theme }) => theme.click.card.secondary.color.link.default};
  height: ${({ theme }) => theme.click.image.md.size.height};
  width: ${({ theme }) => theme.click.image.md.size.width};
`;

const LinkText = styled(Text)``;
const LinkArrow = styled(ArrowContainer)``;

const Wrapper = styled.div<{
  $hasShadow?: boolean;
  $disabled?: boolean;
}>`
  background-color: ${({ theme }) => theme.click.card.secondary.color.background.default};
  border-radius: ${({ theme }) => theme.click.card.secondary.radii.all};
  border: ${({ theme }) =>
    `1px solid ${theme.click.card.secondary.color.stroke.default}`};
  max-width: 420px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.click.card.secondary.space.all};
  gap: ${({ theme }) => theme.click.card.secondary.space.gap};
  box-shadow: ${({ $hasShadow, theme }) => ($hasShadow ? theme.shadow[1] : "none")};

  &:hover,
  :focus {
    background-color: ${({ theme }) => theme.click.card.secondary.color.background.hover};
    cursor: pointer;
    ${LinkText},
    ${LinkArrow} {
      color: ${({ theme }) => theme.click.card.secondary.color.link.hover};
    }
  }

  &[disabled],
  &[disabled]:hover,
  &[disabled]:active {
    background-color: ${({ theme }) =>
      theme.click.card.secondary.color.background.disabled};
    color: ${({ theme }) => theme.click.card.secondary.color.title.disabled};
    border: 1px solid ${({ theme }) => theme.click.card.secondary.color.stroke.disabled};
    cursor: not-allowed;

    ${LinkText},
    ${LinkArrow} {
      color: ${({ theme }) => theme.click.card.secondary.color.link.disabled};
    }
  }
`;

export const CardSecondary = ({
  title,
  icon,
  badgeState,
  badgeText = "",
  hasShadow = false,
  disabled = false,
  description,
  infoUrl,
  infoText,
  ...props
}: CardSecondaryProps) => {
  return (
    <Wrapper
      $disabled={disabled}
      tabIndex={0}
      $hasShadow={hasShadow}
      {...props}
    >
      <Header>
        <HeaderLeft $disabled={disabled}>
          <Icon
            name={icon}
            size="lg"
            area-hidden=""
          />
          <Title type="h3">{title}</Title>
        </HeaderLeft>
        {badgeText && (
          <Badge
            text={badgeText}
            state={disabled == true ? "disabled" : badgeState}
          />
        )}
      </Header>

      <Content>
        <Text color="muted">{description}</Text>
      </Content>
      {(infoUrl || infoText) && (
        <InfoLink
          href={disabled ? undefined : infoUrl}
          as={disabled || !infoUrl || infoUrl.length === 0 ? "div" : "a"}
        >
          <LinkText>{infoText}</LinkText>
          <LinkArrow name="chevron-right" />
        </InfoLink>
      )}
    </Wrapper>
  );
};
