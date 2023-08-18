import { Fallback, Root } from "@radix-ui/react-avatar";
import styled from "styled-components";

type TextSize = "md" | "sm";

export type AvatarProps = {
  text: string;
  textSize?: TextSize;
};

const Avatar = ({ text = "", textSize = "sm", ...delegated }: AvatarProps) => (
  <StyledRoot {...delegated}>
    <StyledFallback $textSize={textSize}>{text}</StyledFallback>
  </StyledRoot>
);

const StyledRoot = styled(Root)`
  width: ${props => props.theme.click.avatar.size.width};
  height: ${props => props.theme.click.avatar.size.height};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;

  background-color: ${props => props.theme.click.avatar.color.background.default};
  color: ${props => props.theme.click.avatar.color.text.default};
  border-radius: ${props => props.theme.click.avatar.radii.all};

  &:active {
    background-color: ${props => props.theme.click.avatar.color.background.active};
    color: ${props => props.theme.click.avatar.color.text.active};
  }

  &:hover {
    background-color: ${props => props.theme.click.avatar.color.background.hover};
    color: ${props => props.theme.click.avatar.color.text.hover};
  }
`;

const StyledFallback = styled(Fallback)<{ $textSize: TextSize }>`
  width: ${props => props.theme.click.avatar.size.label.width};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${({ theme, $textSize = "sm" }) => `
    font: ${theme.click.avatar.typography.label[$textSize].default};

    &:active {
      font: ${theme.click.avatar.typography.label[$textSize].active};
    }

    &:hover {
      font: ${theme.click.avatar.typography.label[$textSize].hover};
      }
  `}
`;

export { Avatar };
