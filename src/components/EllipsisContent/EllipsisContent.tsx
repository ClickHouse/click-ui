import { HTMLAttributes, forwardRef } from "react";
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
