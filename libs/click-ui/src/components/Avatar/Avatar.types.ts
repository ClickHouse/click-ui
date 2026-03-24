import { AvatarProps as RadixAvatarProps } from '@radix-ui/react-avatar';

export type TextSize = 'md' | 'sm';

export interface AvatarProps extends RadixAvatarProps {
  text: string;
  textSize?: TextSize;
  src?: string;
  srcSet?: string;
}
