import { ElementType, forwardRef } from "react";
import { mergeRefs } from "@/utils/mergeRefs";
import { styled } from "styled-components";
import {
  PolymorphicComponent,
  PolymorphicComponentProps,
  PolymorphicProps,
  PolymorphicRef,
} from "@/utils/polymorphic";

const EllipsisContainer = styled.div`
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: text-bottom;
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
export interface EllipsisContentProps<T extends ElementType = "div">
  extends PolymorphicComponentProps<T> {}

const _EllipsisContent = <T extends ElementType = "div">(
  { component, ...props }: PolymorphicProps<T, EllipsisContentProps<T>>,
  ref: PolymorphicRef<T>
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

export const EllipsisContent: PolymorphicComponent<EllipsisContentProps> =
  forwardRef(_EllipsisContent);
