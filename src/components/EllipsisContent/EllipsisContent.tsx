import { ElementType, forwardRef } from "react";
import { mergeRefs } from "@/utils/mergeRefs";
import clsx from "clsx";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";
import styles from "./EllipsisContent.module.scss";

export interface EllipsisContentProps<T extends ElementType = "div">
  extends PolymorphicComponentProps<T> {}

const _EllipsisContent = <T extends ElementType = "div">(
  { component, className, ...props }: PolymorphicProps<T, EllipsisContentProps<T>>,
  ref: PolymorphicRef<T>
) => {
  const Component = component ?? "div";

  return (
    <Component
      className={clsx(styles.cuiEllipsisContainer, className)}
      ref={mergeRefs([
        ref,
        node => {
          if (node && node.scrollWidth > node.clientWidth) {
            node.title = node.innerText;
          }
        },
      ])}
      {...props}
    />
  );
};

export const EllipsisContent: PolymorphicComponent<EllipsisContentProps> =
  forwardRef(_EllipsisContent);
