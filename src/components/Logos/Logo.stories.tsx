import { Logo } from "./Logo";
import LogosLight from "./LogosLight";

export default {
  component: Logo,
  title: "Display/Logo",
  tags: ["LOGO", "autodocs"],
  argTypes: {
    name: {
      options: Object.keys(LogosLight),
      control: { type: "select" },
    },
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    name: "aws",
    width: "",
    height: "",
    size: "xl",
  },
};
