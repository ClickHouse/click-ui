import { HTMLAttributes, ReactNode } from "react";
import { styled } from "styled-components";
import { Icon, IconName } from "@/components";

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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  gap: inherit;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: ${({ theme }) => theme.click.card.horizontal.space.gap};
  flex: 1;
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
`;

export const CardHorizontal = ({
  title,
  icon,
  description,
  disabled = false,
  isSelected,
  children,
  color = "default",
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
        {title && <Header>{title}</Header>}

        {description && <Description>{description}</Description>}
        {children && <Description>{children}</Description>}
      </ContentWrapper>
    </Wrapper>
  );
};
