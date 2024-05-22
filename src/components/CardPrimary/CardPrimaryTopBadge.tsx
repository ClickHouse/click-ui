import { Badge } from "@/components/Badge/Badge";
import { ComponentType, FC } from "react";
import styled from "styled-components";

export interface WithTopBadgeProps {
  topBadgeText?: string;
  isSelected?: boolean;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
`;

const TopBadge = styled(Badge)<{ $isSelected?: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ $isSelected, theme }) =>
    $isSelected
      ? `border-color: ${theme.click.button.basic.color.primary.stroke.active};`
      : ""}
  div:active + & {
    border-color: ${({ theme }) => theme.click.button.basic.color.primary.stroke.active};
  }
`;

export const withTopBadge =
  <P extends object>(Component: ComponentType<P>): FC<P & WithTopBadgeProps> =>
  ({ topBadgeText, ...props }: P & WithTopBadgeProps) => {
    return (
      <Wrapper>
        <Component {...(props as P)} />
        {topBadgeText && (
          <TopBadge
            text={topBadgeText}
            $isSelected={props.isSelected || false}
          />
        )}
      </Wrapper>
    );
  };
