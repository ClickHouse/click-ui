import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";
import { Icon, IconName } from "@/components";

type CardColor = "default" | "muted";

export interface CardHorizontalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  icon?: IconName;
  disabled?: boolean;
  description?: ReactNode;
  isSelected?: boolean;
  children?: ReactNode;
  color?: CardColor;
  fillWidth?: boolean;
}

const Header = styled.div<{ $fillWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: ${({ $fillWidth = false }) => ($fillWidth ? "100%" : "fit-content")};
  max-width: 100%;
  gap: inherit;
`;

const Description = styled.div<{ $fillWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: ${({ theme }) => theme.click.card.horizontal.space.gap};
  flex: 1;
  width: ${({ $fillWidth = false }) => ($fillWidth ? "100%" : "auto")};
`;

const Wrapper = styled.div<{
  $hasShadow?: boolean;
  $disabled?: boolean;
  $isSelected?: boolean;
  $color: CardColor;
}>`
  display: inline-flex;
  width: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: flex-start;

  ${({ theme, $color, $isSelected, $disabled }) => `
    background: ${theme.click.card.horizontal[$color].color.background.default};
    color: ${theme.click.card.horizontal[$color].color.title.default};
    border-radius: ${theme.click.card.horizontal.radii.all};
    border: 1px solid ${
      theme.click.card.horizontal[$color].color.stroke[$isSelected ? "active" : "default"]
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
      background-color: ${theme.click.card.horizontal[$color].color.background.hover};
      color: ${theme.click.card.horizontal[$color].color.title.hover};
      border: 1px solid ${
        theme.click.card.horizontal[$color].color.stroke[$isSelected ? "active" : "hover"]
      };
      cursor: pointer;
      font: ${theme.click.card.horizontal.typography.title.hover};
      ${Description} {
        color: ${theme.click.card.horizontal[$color].color.description.hover};
        font: ${theme.click.card.horizontal.typography.description.hover};
      }
    }

    &:active, &:focus, &:focus-within {
      background-color: ${theme.click.card.horizontal[$color].color.background.active};
      color: ${theme.click.card.horizontal[$color].color.title.active};
      border: 1px solid ${theme.click.card.horizontal[$color].color.stroke.active};
      ${Description} {
        color: ${theme.click.card.horizontal[$color].color.description.active};
        font: ${theme.click.card.horizontal.typography.description.active};
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
  flex-direction: column;
  width: 100%;
`;

export const CardHorizontal = ({
  title,
  icon,
  description,
  disabled = false,
  isSelected,
  children,
  color = "default",
  fillWidth,
  ...props
}: CardHorizontalProps) => {
  return (
    <Wrapper
      $disabled={disabled}
      $isSelected={isSelected}
      $color={color}
      tabIndex={0}
      {...props}
    >
      {icon && (
        <CardIcon
          name={icon}
          aria-hidden
        />
      )}
      <ContentWrapper>
        {title && <Header $fillWidth={fillWidth}>{title}</Header>}

        {description && <Description $fillWidth={fillWidth}>{description}</Description>}
        {children && <Description $fillWidth={fillWidth}>{children}</Description>}
      </ContentWrapper>
    </Wrapper>
  );
};
