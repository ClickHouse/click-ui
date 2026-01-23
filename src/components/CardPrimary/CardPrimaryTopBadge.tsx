import { Badge } from "../Badge/Badge";
import { Container } from "../Container/Container";
import { styled } from "styled-components";

export const TopBadgeWrapper = styled(Container)`
  position: relative;
`;

export const CardPrimaryTopBadge = styled(Badge)<{ $isSelected?: boolean }>`
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
