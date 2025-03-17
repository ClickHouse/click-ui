import { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { styled } from "styled-components";
import {
  Badge,
  BadgeState,
  Button,
  Container,
  HorizontalDirection,
  Icon,
  IconName,
} from "@/components";

type CardColor = "default" | "muted";

export interface CardHorizontalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  icon?: IconName;
  disabled?: boolean;
  description?: ReactNode;
  infoUrl?: string;
  infoText?: string;
  isSelected?: boolean;
  isSelectable?: boolean;
  children?: ReactNode;
  color?: CardColor;
  badgeText?: string;
  badgeState?: BadgeState;
  badgeIcon?: IconName;
  badgeIconDir?: HorizontalDirection;
  onButtonClick?: MouseEventHandler<HTMLElement>;
}

const Header = styled.div`
  max-width: 100%;
  gap: inherit;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: ${({ theme }) => theme.click.card.horizontal.space.gap};
  flex: 1;
  width: 100%;
`;

const Wrapper = styled.div<{
  $hasShadow?: boolean;
  $disabled?: boolean;
  $isSelected?: boolean;
  $isSelectable?: boolean;
  $color: CardColor;
}>`
  display: inline-flex;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: flex-start;

  ${({ theme, $color, $isSelected, $isSelectable, $disabled }) => `
    background: ${theme.click.card.horizontal[$color].color.background.default};
    color: ${theme.click.card.horizontal[$color].color.title.default};
    border-radius: ${theme.click.card.horizontal.radii.all};
    border: 1px solid ${
      theme.click.card.horizontal[$color].color.stroke[
        $isSelectable ? ($isSelected ? "active" : "hover") : "default"
      ]
    };
    padding: ${theme.click.card.horizontal.space.y} ${
    theme.click.card.horizontal.space.x
  };
    gap: ${theme.click.card.horizontal.space.gap};
    font: ${theme.click.card.horizontal.typography.title.default};
    ${Description} {
      color: ${theme.click.card.horizontal[$color].color.description.default};
      font: ${theme.click.card.horizontal.typography.description.default};
    }
    &:hover{
      background-color: ${
        theme.click.card.horizontal[$color].color.background[
          $isSelectable ? "hover" : "default"
        ]
      };
      color: ${
        theme.click.card.horizontal[$color].color.title[
          $isSelectable ? "hover" : "default"
        ]
      };
      border: 1px solid ${
        theme.click.card.horizontal[$color].color.stroke[
          $isSelectable ? ($isSelected ? "active" : "default") : "default"
        ]
      };
      cursor: ${$isSelectable ? "pointer" : "default"};
      font: ${theme.click.card.horizontal.typography.title.hover};
      ${Description} {
        color: ${
          theme.click.card.horizontal[$color].color.description[
            $isSelectable ? "hover" : "default"
          ]
        };
        font: ${
          theme.click.card.horizontal.typography.description[
            $isSelectable ? "hover" : "default"
          ]
        };
      }
    }

    &:active, &:focus, &:focus-within {
      background-color: ${
        theme.click.card.horizontal[$color].color.background[
          $isSelectable ? "active" : "default"
        ]
      };
      color: ${
        theme.click.card.horizontal[$color].color.title[
          $isSelectable ? "active" : "default"
        ]
      };
      border: 1px solid ${
        theme.click.card.horizontal[$color].color.stroke[
          $isSelectable ? "active" : "default"
        ]
      };
      ${Description} {
        color: ${
          theme.click.card.horizontal[$color].color.description[
            $isSelectable ? "active" : "default"
          ]
        };
        font: ${
          theme.click.card.horizontal.typography.description[
            $isSelectable ? "active" : "default"
          ]
        };
      }
    }
    ${
      $disabled
        ? `
          pointer-events: none;
          &,
          &:hover,
          &:active, &:focus, &:focus-within {
            background-color: ${
              theme.click.card.horizontal[$color].color.background.disabled
            };
            color: ${theme.click.card.horizontal[$color].color.title.disabled};
            border: 1px solid ${
              theme.click.card.horizontal[$color].color.stroke[
                $isSelected ? "active" : "disabled"
              ]
            };
            cursor: not-allowed;
            ${Description} {
              color: ${theme.click.card.horizontal[$color].color.description.disabled};
              font: ${theme.click.card.horizontal.typography.description.disabled};
            }
          },
          &:active, &:focus, &:focus-within {
            border: 1px solid ${theme.click.card.horizontal[$color].color.stroke.active};
          }
        `
        : ""
    }
  `}
`;

const CardIcon = styled(Icon)`
  ${({ theme }) => `
      height: ${theme.click.card.horizontal.icon.size.all};
      width: ${theme.click.card.horizontal.icon.size.all};
  `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${({ theme }) => theme.click.card.horizontal.space.gap};

  @media (max-width: ${({ theme }) => theme.breakpoint.sizes.md}) {
    flex-direction: column;
  }
`;

const IconTextContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.click.card.horizontal.space.gap};
`;

export const CardHorizontal = ({
  title,
  icon,
  description,
  disabled = false,
  infoText,
  infoUrl,
  isSelected,
  isSelectable = infoText ? false : true,
  children,
  color = "default",
  badgeText,
  badgeState,
  badgeIcon,
  badgeIconDir,
  onButtonClick,
  ...props
}: CardHorizontalProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    MouseEvent;
    if (typeof onButtonClick === "function") {
      onButtonClick(e);
    }
    if (infoUrl && infoUrl.length > 0) {
      window.open(infoUrl, "_blank");
    }
  };
  return (
    <Wrapper
      $disabled={disabled}
      $isSelected={isSelected}
      $isSelectable={isSelectable}
      $color={color}
      tabIndex={0}
      onClick={handleClick}
      {...props}
    >
      <ContentWrapper>
        <IconTextContentWrapper>
          {icon && (
            <CardIcon
              name={icon}
              aria-hidden
            />
          )}
          <Container
            padding="none"
            orientation="vertical"
          >
            {title && (
              <Header
                as={Container}
                isResponsive={false}
                gap="xs"
                justifyContent="space-between"
                fillWidth
              >
                <Container
                  orientation="horizontal"
                  gap="xs"
                  isResponsive={false}
                  fillWidth={false}
                  grow="1"
                >
                  {title}
                </Container>
                {badgeText && (
                  <Container
                    isResponsive={false}
                    justifyContent="end"
                    fillWidth={false}
                    data-testid="horizontal-card-badge"
                  >
                    <Badge
                      text={badgeText}
                      size="md"
                      state={badgeState}
                      icon={badgeIcon}
                      iconDir={badgeIconDir}
                    />
                  </Container>
                )}
              </Header>
            )}

            {description && <Description>{description}</Description>}
            {children && <Description>{children}</Description>}
          </Container>
        </IconTextContentWrapper>
        {infoText && (
          <Container
            justifyContent="end"
            fillWidth={false}
            data-testid="horizontal-card-button"
          >
            <Button
              label={infoText}
              onClick={handleClick}
              fillWidth
            />
          </Container>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};
