import {
  AvatarProps as RadixAvatarProps,
  Fallback,
  Image,
  Root,
} from "@radix-ui/react-avatar";
import styled from "styled-components";

type Size = "md" | "sm";
type TextSize = "md" | "sm";
type State = "neutral" | "success" | "vivid";

export interface AvatarProps extends RadixAvatarProps {
  text: string;
  textSize?: TextSize;
  src?: string;
  srcSet?: string;
  size?: Size;
  state?: State;
}

const Avatar = ({
  text,
  textSize = "sm",
  size = "md",
  src,
  srcSet,
  state = "neutral",
  ...delegated
}: AvatarProps) => (
  <StyledRoot
    {...delegated}
    $size={size}
    $state={state}
  >
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

const StyledRoot = styled(Root)<{ $size: Size; $state: State }>`
  ${({ theme, $size = "sm" }) => `
    width: ${theme.click.avatar.size[$size].width};
    height: ${theme.click.avatar.size[$size].height};
  `}
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  overflow: hidden;
  user-select: none;

  background-color: ${({ $state = "neutral", theme }) =>
    theme.click.avatar.color[$state].background.default};
  color: ${({ $state = "neutral", theme }) =>
    theme.click.avatar.color[$state].text.default};
  border-radius: ${props => props.theme.click.avatar.radii.all};

  &:active {
    background-color: ${({ $state = "neutral", theme }) =>
      theme.click.avatar.color[$state].background.active};
    color: ${({ $state = "neutral", theme }) =>
      theme.click.avatar.color[$state].text.active};
  }

  &:hover {
    background-color: ${({ $state = "neutral", theme }) =>
      theme.click.avatar.color[$state].background.hover};
    color: ${({ $state = "neutral", theme }) =>
      theme.click.avatar.color[$state].text.hover};
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
