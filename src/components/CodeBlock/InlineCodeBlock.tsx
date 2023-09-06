import { HTMLAttributes } from "react";
import styled from "styled-components";

const InlineContainer = styled.span`
  ${({ theme }) => `
    background: ${theme.click.codeInline.color.background.default};
    color: ${theme.click.codeInline.color.text.default};
    border: 1px solid ${theme.click.codeInline.color.stroke.default};
    font: ${theme.click.codeInline.typography.text.default};
    border-radius: ${theme.click.codeInline.radii.all};
    padding: 0 ${theme.click.codeInline.space.x};
  `}
`;
export const InlineCodeBlock = (props: HTMLAttributes<HTMLSpanElement>) => (
  <InlineContainer {...props} />
);
