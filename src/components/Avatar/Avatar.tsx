import {
  AvatarProps as RadixAvatarProps,
  Fallback,
  Image,
  Root,
} from "@radix-ui/react-avatar";
import clsx from "clsx";
import styles from "./Avatar.module.scss";

type TextSize = "md" | "sm";

export interface AvatarProps extends RadixAvatarProps {
  text: string;
  textSize?: TextSize;
  src?: string;
  srcSet?: string;
}

const Avatar = ({ text, textSize = "sm", src, srcSet, ...delegated }: AvatarProps) => (
  <Root
    {...delegated}
    className={clsx(styles.cuiAvatarRoot, delegated.className)}
  >
    <Image
      src={src}
      srcSet={srcSet}
      alt={text}
      className={styles.cuiAvatarImage}
    />
    <Fallback
      className={clsx(styles.cuiAvatarFallback, {
        [styles.cuiMd]: textSize === "md",
        [styles.cuiSm]: textSize === "sm",
      })}
      delayMs={0}
    >
      {text
        .trim()
        .replace(/(^.)([^ ]* )?(.).*/, "$1$3")
        .trim()
        .toUpperCase()}
    </Fallback>
  </Root>
);

export { Avatar };
