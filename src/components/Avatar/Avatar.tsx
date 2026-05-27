import { Fallback, Image, Root } from '@radix-ui/react-avatar';
import { cn, cva } from '@/lib/cva';
import { AvatarProps } from './Avatar.types';
import styles from './Avatar.module.css';

const fallbackVariants = cva(styles.avatar__fallback, {
  variants: {
    textSize: {
      sm: styles['avatar__fallback_size_sm'],
      md: styles['avatar__fallback_size_md'],
    },
  },
  defaultVariants: {
    textSize: 'sm',
  },
});

export const Avatar = ({
  text,
  textSize = 'sm',
  src,
  srcSet,
  className,
  ...delegated
}: AvatarProps) => (
  <Root
    {...delegated}
    className={cn(styles.avatar, className)}
  >
    <Image
      src={src}
      srcSet={srcSet}
      alt={text}
      className={styles.avatar__image}
    />
    <Fallback
      delayMs={0}
      className={cn(fallbackVariants({ textSize }))}
    >
      {text
        .trim()
        .replace(/(^.)([^ ]* )?(.).*/, '$1$3')
        .trim()
        .toUpperCase()}
    </Fallback>
  </Root>
);
