import { HTMLAttributes, forwardRef } from "react";
import { mergeRefs } from "@/utils/mergeRefs";
import styled from "styled-components";

const EllipsisContainer = styled.div`
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  justify-content: flex-start;
  width: fill-available;
  flex: 1;
  & > *:not(button) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const EllipsisContent = forwardRef<HTMLElement, HTMLAttributes<HTMLSpanElement>>(
  (props, ref) => {
    return (
      <EllipsisContainer
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
  }
);
