import {
  AvatarProps as RadixAvatarProps,
  Fallback,
  Image,
  Root,
} from "@radix-ui/react-avatar";
import clsx from "clsx";
import { capitalize } from "../../utils/capitalize";
import styles from "./Avatar.module.scss";

type TextSize = "md" | "sm";

export interface AvatarProps extends RadixAvatarProps {
  /** The text to display as initials in the avatar fallback */
  text: string;
  /** The font size of the text */
  textSize?: TextSize;
  /** The image source URL */
  src?: string;
  /** The image srcSet for responsive images */
  srcSet?: string;
}

const Avatar = ({
  text,
  textSize = "sm",
  src,
  srcSet,
  className,
  ...delegated
}: AvatarProps) => {
  const textSizeClass = `cuiTextSize${capitalize(textSize)}`;

  return (
    <Root
      {...delegated}
      className={clsx(styles.cuiAvatarRoot, className)}
    >
      <Image
        src={src}
        srcSet={srcSet}
        alt={text}
        className={styles.cuiAvatarImage}
      />
      <Fallback
        className={clsx(styles.cuiAvatarFallback, styles[textSizeClass])}
        data-cui-text-size={textSize}
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
};

export { Avatar };
