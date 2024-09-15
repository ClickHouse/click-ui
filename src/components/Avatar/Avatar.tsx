import {
  AvatarProps as RadixAvatarProps,
  Fallback,
  Image,
  Root,
} from "@radix-ui/react-avatar";
import { styled } from "styled-components";

type TextSize = "md" | "sm";

export interface AvatarProps extends RadixAvatarProps {
  text: string;
  textSize?: TextSize;
  src?: string;
  srcSet?: string;
}

const Avatar = ({ text, textSize = "sm", src, srcSet, ...delegated }: AvatarProps) => (
  <StyledRoot {...delegated}>
    <AvatarImage
      src={src}
      srcSet={srcSet}
      alt={text}
    />
    <StyledFallback
      $textSize={textSize}
      delayMs={0}
    >
      {text
        .trim()
        .replace(/(^.)([^ ]* )?(.).*/, "$1$3")
        .trim()
        .toUpperCase()}
    </StyledFallback>
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

const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
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
