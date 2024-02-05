import {
  ComponentProps,
  ComponentPropsWithRef,
  ElementType,
  ReactNode,
  forwardRef,
} from "react";
import { mergeRefs } from "@/utils/mergeRefs";
import styled from "styled-components";

const EllipsisContainer = styled.div`
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  justify-content: flex-start;
  width: 100%;
  width: -webkit-fill-available;
  width: fill-available;
  width: stretch;
  & > *:not(button) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export interface EllipsisContentProps<T extends ElementType = "div"> {
  component?: T;
}

type PolymorphicComponent = <T extends ElementType = "div">(
  props: Omit<ComponentProps<T>, keyof T> & EllipsisContentProps<T>
) => ReactNode;

const _EllipsisContent = <T extends ElementType = "div">(
  { component, ...props }: Omit<ComponentProps<T>, keyof T> & EllipsisContentProps<T>,
  ref: ComponentPropsWithRef<T>["ref"]
) => {
  return (
    <EllipsisContainer
      as={component ?? "div"}
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

export const EllipsisContent: PolymorphicComponent = forwardRef(_EllipsisContent);
