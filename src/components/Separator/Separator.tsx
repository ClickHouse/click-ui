import { styled } from "styled-components";
import * as RadixSeparator from "@radix-ui/react-separator";
interface Props extends RadixSeparator.SeparatorProps {
  size: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
}
const CUISeparator = styled(RadixSeparator.Root)<Props>`
  ${({ theme, size, orientation }) => `
    &[data-orientation="horizontal"] {
      width: 100%;
      border-top: 0.0625rem solid ${theme.click.separator.color.stroke.default};
    }
    &[data-orientation="vertical"] {
      height: 100%;
      border-right: 0.0625rem solid ${theme.click.separator.color.stroke.default};
    }
    margin: ${
      orientation === "horizontal"
        ? `${theme.click.separator.horizontal.space.y[size]} ${theme.click.separator.horizontal.space.x.all}`
        : `${theme.click.separator.vertical.space.y.all} ${theme.click.separator.vertical.space.x[size]}`
    }
  `}
`;

const Separator = ({ orientation = "horizontal", ...props }: Props) => (
  <CUISeparator
    orientation={orientation}
    {...props}
  />
);

export default Separator;
