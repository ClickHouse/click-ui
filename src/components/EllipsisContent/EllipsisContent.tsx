import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import { mergeRefs } from "@/utils/mergeRefs";
import clsx from "clsx";
import styles from "./EllipsisContent.module.scss";

export interface EllipsisContentProps<T extends ElementType = "div"> {
  component?: T;
}

type EllipsisPolymorphicComponent = <T extends ElementType = "div">(
  props: Omit<ComponentProps<T>, keyof EllipsisContentProps<T>> & EllipsisContentProps<T>
) => ReactNode;

const _EllipsisContent = <T extends ElementType = "div">(
  {
    component,
    className,
    ...props
  }: Omit<ComponentProps<T>, keyof EllipsisContentProps<T>> & EllipsisContentProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
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

export const EllipsisContent: EllipsisPolymorphicComponent = forwardRef(_EllipsisContent);
