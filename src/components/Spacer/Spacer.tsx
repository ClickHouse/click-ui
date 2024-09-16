import { styled } from "styled-components";

export type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
export interface SpacerProps {
  size?: SizeType;
}

const CUISpacer = styled.div<{
  $size?: SizeType;
}>`
  background: transparent;
  display: flex;
  padding: ${({ theme, $size = "md" }) =>
    `${theme.click.spacer.horizontal.space.y[$size]} ${theme.click.spacer.horizontal.space.x.all}`};
`;

export const Spacer = ({ size }: SpacerProps) => <CUISpacer $size={size} />;
