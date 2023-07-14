import React from "react";
import styled from "styled-components";
import * as RadixSeparator from "@radix-ui/react-separator";
interface Props extends RadixSeparator.SeparatorProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
const CUISeparator = styled(RadixSeparator.Root)<Props>`
  &[data-orientation="horizontal"] {
    height: 0.0625rem;
    width: 100%;
  }
  &[data-orientation="vertical"] {
    height: 100%;
    width: 0.0625rem;
  }
  ${({ theme, size, orientation }) => `
    background: ${theme.click.separator.color.stroke.default};
    margin: ${
      orientation === "horizontal"
        ? theme.click.separator.horizontal.space.y[size]
        : theme.click.separator.vertical.space.y.all
    } ${
    orientation === "horizontal"
      ? theme.click.separator.horizontal.space.x.all
      : theme.click.separator.vertical.space.x[size]
  }
  `}
`;

const Separator = ({ orientation = "horizontal", ...props }: Props) => (
  <CUISeparator orientation={orientation} {...props} />
);

export default Separator;
