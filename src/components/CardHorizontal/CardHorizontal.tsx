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
export type CardSize = "sm" | "md";

export interface CardHorizontalProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** The title text displayed in the card */
  title?: ReactNode;
  /** Icon to display in the card */
  icon?: IconName;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** The description content of the card */
  description?: ReactNode;
  /** URL to navigate to when clicked */
  infoUrl?: string;
  /** Text for the action button (shows/hides the button) */
  infoText?: string;
  /** Whether the card is in a selected state */
  isSelected?: boolean;
  /** Whether the card can be selected */
  isSelectable?: boolean;
  /** Additional content to display in the card */
  children?: ReactNode;
  /** Color variant of the card */
  color?: CardColor;
  /** Size variant of the card */
  size?: CardSize;
  /** Text for the badge (shows/hides the badge) */
  badgeText?: string;
  /** State/color variant of the badge */
  badgeState?: BadgeState;
  /** Icon to display in the badge */
  badgeIcon?: IconName;
  /** Direction of the badge icon */
  badgeIconDir?: HorizontalDirection;
  /** Callback when the card button is clicked */
  onButtonClick?: MouseEventHandler<HTMLElement>;
  /** Makes the card unactionable and read-only */
  readOnly?: boolean;
}

const Header = styled.div`
  max-width: 100%;
  gap: inherit;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: ${({ theme }) => theme.click.card.horizontal.space.md.gap};
  flex: 1;
  width: 100%;
`;

const Wrapper = styled.div<{
  $hasShadow?: boolean;
  $disabled?: boolean;
  $isSelected?: boolean;
  $isSelectable?: boolean;
  $color: CardColor;
  $size?: CardSize;
  $readOnly?: boolean;
}>`
  display: inline-flex;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: flex-start;

  ${({ theme, $color, $size, $isSelected, $isSelectable, $disabled, $readOnly }) => `
    background: ${theme.click.card.horizontal[$color].color.background.default};
    color: ${theme.click.card.horizontal[$color].color.title.default};
    border-radius: ${theme.click.card.horizontal.radii.all};
    border: 1px solid ${
      theme.click.card.horizontal[$color].color.stroke[
        $isSelectable ? ($isSelected ? "active" : "hover") : "default"
      ]
    };
     padding: ${
       $size === "md"
         ? `${theme.click.card.horizontal.space.md.y} ${theme.click.card.horizontal.space.md.x}`
         : `${theme.click.card.horizontal.space.sm.y} ${theme.click.card.horizontal.space.sm.x}`
     };
    font: ${theme.click.card.horizontal.typography.title.default};
    ${Description} {
      color: ${theme.click.card.horizontal[$color].color.description.default};
      font: ${theme.click.card.horizontal.typography.description.default};
    }
    &:hover{
      background-color: ${
        theme.click.card.horizontal[$color].color.background[
          $isSelectable && !$readOnly ? "hover" : "default"
        ]
      };
      color: ${
        theme.click.card.horizontal[$color].color.title[
          $isSelectable && !$readOnly ? "hover" : "default"
        ]
      };
      border: 1px solid ${
        theme.click.card.horizontal[$color].color.stroke[
          $isSelectable && !$readOnly ? ($isSelected ? "active" : "default") : "default"
        ]
      };
      cursor: ${$isSelectable && !$readOnly ? "pointer" : "default"};
      font: ${theme.click.card.horizontal.typography.title.hover};
      ${Description} {
        color: ${
          theme.click.card.horizontal[$color].color.description[
            $isSelectable && !$readOnly ? "hover" : "default"
          ]
        };
        font: ${
          theme.click.card.horizontal.typography.description[
            $isSelectable && !$readOnly ? "hover" : "default"
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

const ContentWrapper = styled.div<{ $size: CardSize }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${({ theme, $size }) =>
    $size === "md"
      ? theme.click.card.horizontal.space.md.gap
      : theme.click.card.horizontal.space.sm.gap};

  @media (max-width: ${({ theme }) => theme.breakpoint.sizes.md}) {
    flex-direction: column;
  }
`;

const IconTextContentWrapper = styled.div<{ $size: CardSize }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: ${({ theme, $size }) =>
    $size === "md"
      ? theme.click.card.horizontal.space.md.gap
      : theme.click.card.horizontal.space.sm.gap};
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
  size = "md",
  badgeText,
  badgeState,
  badgeIcon,
  badgeIconDir,
  onButtonClick,
  readOnly,
  ...props
}: CardHorizontalProps) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

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
      $isSelectable={isSelectable && !readOnly}
      $color={color}
      $size={size}
      $readOnly={readOnly}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <ContentWrapper $size={size}>
        <IconTextContentWrapper $size={size}>
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
              disabled={disabled}
              fillWidth
            />
          </Container>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};
