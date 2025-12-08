import { styled } from "styled-components";
import { Badge, Icon, IconName } from "@/components";
import { Title } from "@/components/Typography/Title/Title";
import { Text } from "@/components/Typography/Text/Text";
import { IconSize } from "@/components/Icon/types";
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
  /** The title text displayed in the card header */
  title: string;
  /** Icon name to display in the header */
  icon?: IconName;
  /** URL to a custom icon image */
  iconUrl?: string;
  /** The visual state of the badge */
  badgeState?: BadgeState;
  /** Whether to show a shadow on the card */
  hasShadow?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Text to display in the badge */
  badgeText?: string;
  /** The description content of the card */
  description: ReactNode;
  /** URL for the info link */
  infoUrl?: string;
  /** Text to display in the info link */
  infoText?: string;
  /** Icon to display in the info link */
  infoIcon?: IconName;
  /** Size of the info link icon */
  infoIconSize?: IconSize;
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

const CustomIcon = styled.img`
  height: ${({ theme }) => theme.click.image.lg.size.height};
  width: ${({ theme }) => theme.click.image.lg.size.width};
`;

const InfoLink = styled.a`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.click.card.secondary.color.link.default};
  gap: ${({ theme }) => theme.click.card.secondary.space.link.gap};
  text-decoration: none;
`;
const LinkIconContainer = styled(Icon)`
  color: ${({ theme }) => theme.click.card.secondary.color.link.default};
  height: ${({ theme }) => theme.click.image.md.size.height};
  width: ${({ theme }) => theme.click.image.md.size.width};
`;

const LinkText = styled(Text)``;
const LinkIcon = styled(LinkIconContainer)``;

const Wrapper = styled.div<{
  $hasShadow?: boolean;
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
    ${LinkIcon} {
      color: ${({ theme }) => theme.click.card.secondary.color.link.hover};
    }
  }

  &[aria-disabled="true"],
  &[aria-disabled="true"]:hover,
  &[aria-disabled="true"]:focus,
  &[aria-disabled="true"]:active {
    pointer-events: none;
    ${({ theme }) => `
      background-color: ${theme.click.card.secondary.color.background.disabled};
      color: ${theme.click.card.secondary.color.title.disabled};
      border: 1px solid ${theme.click.card.secondary.color.stroke.disabled};
      cursor: not-allowed;

      ${LinkText},
      ${LinkIcon} {
        color: ${theme.click.card.secondary.color.link.disabled};
      }
    `}
  }
`;

export const CardSecondary = ({
  title,
  icon,
  iconUrl,
  badgeState,
  badgeText = "",
  hasShadow = false,
  disabled = false,
  description,
  infoUrl,
  infoText,
  infoIcon = "chevron-right",
  infoIconSize = "md",
  ...props
}: CardSecondaryProps) => {
  return (
    <Wrapper
      aria-disabled={disabled}
      tabIndex={0}
      $hasShadow={hasShadow}
      {...props}
    >
      <Header>
        <HeaderLeft $disabled={disabled}>
          {iconUrl ? (
            <CustomIcon
              src={iconUrl}
              alt="card icon"
              aria-hidden
            />
          ) : (
            icon && (
              <Icon
                name={icon}
                aria-hidden
                size="lg"
              />
            )
          )}
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
          <LinkIcon
            size={infoIconSize}
            name={infoIcon}
          />
        </InfoLink>
      )}
    </Wrapper>
  );
};
