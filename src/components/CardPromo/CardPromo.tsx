import { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import { Icon, IconName, Text } from "@/components";

export interface CardPromoProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  icon: IconName;
  dismissible?: boolean;
}
const Background = styled.div`
  ${({ theme }) => `
  background-image: ${theme.click.card.promotion.color.stroke.default};
  padding: 1px;
  border-radius: ${theme.click.card.horizontal.radii.all};
  box-shadow: ${theme.click.card.shadow};
  display: flex;
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
    border-radius: ${theme.click.card.horizontal.radii.all};
    padding: ${theme.click.card.horizontal.space.y} ${theme.click.card.horizontal.space.x};
    gap: ${theme.click.card.horizontal.space.gap};
    transition: .2s ease-in-out all;
  
    &:hover {
      background: ${theme.click.card.promotion.color.background.hover};
    }

    `}
`;

const CardIcon = styled(Icon)`
  ${({ theme }) => `
      height: ${theme.click.card.horizontal.icon.size.all};
      width: ${theme.click.card.horizontal.icon.size.all};
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

export const CardPromo = ({
  label,
  icon,
  dismissible = false,
  ...props
}: CardPromoProps) => {
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
