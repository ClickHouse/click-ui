import { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { Icon, IconName, Text } from "@/components";

export interface CardPromotionProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  icon: IconName;
  dismissible?: boolean;
}
const Background = styled.div`
  ${({ theme }) => `
    background-image: ${theme.click.card.promotion.color.stroke.default};
    padding: 1px;
    border-radius: ${theme.click.card.promotion.radii.all};
    box-shadow: ${theme.click.card.shadow};
    display: flex;

    &:focus {
      background: ${theme.click.card.promotion.color.stroke.focus};
    }
  `}
`;
const Wrapper = styled.div<{
  $dismissible?: boolean;
}>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  ${({ theme }) => `
    background: ${theme.click.card.promotion.color.background.default};
    color: ${theme.click.card.promotion.color.text.default}; 
    border-radius: ${theme.click.card.promotion.radii.all};
    padding: ${theme.click.card.promotion.space.y} ${theme.click.card.promotion.space.x};
    gap: ${theme.click.card.promotion.space.gap};
    transition: .2s ease-in-out all;
  
    &:hover {
      background: ${theme.click.card.promotion.color.background.hover};
      color: ${theme.click.card.promotion.color.text.hover};
    }

    &:active, &:focus {
      background: ${theme.click.card.promotion.color.background.active};
      color: ${theme.click.card.promotion.color.text.active};
    }
  `}
`;

const CardIcon = styled(Icon)`
  ${({ theme }) => `
      height: ${theme.click.card.promotion.icon.size.all};
      width: ${theme.click.card.promotion.icon.size.all};
      color: ${theme.click.card.promotion.color.icon.default};
  `}
`;

const DismissWrapper = styled.button`
  display: flex;
  align-items: center;
  margin-left: auto;
  border: none;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
`;

export const CardPromotion = ({
  label,
  icon,
  dismissible = false,
  ...props
}: CardPromotionProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return isVisible ? (
    <Background>
      <Wrapper
        $dismissible={dismissible}
        {...props}
      >
        <CardIcon
          name={icon}
          aria-hidden
        />

        <Text>{label}</Text>

        {dismissible && (
          <DismissWrapper
            data-testid="click-alert-dismiss-button"
            onClick={() => setIsVisible(false)}
          >
            <Icon
              name="cross"
              aria-label="close"
            />
          </DismissWrapper>
        )}
      </Wrapper>
    </Background>
  ) : null;
};
