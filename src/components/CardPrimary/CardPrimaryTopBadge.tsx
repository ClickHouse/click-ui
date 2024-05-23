import { Badge } from "@/components/Badge/Badge";
import styled from "styled-components";

export const TopBadgeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  display: flex;
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
