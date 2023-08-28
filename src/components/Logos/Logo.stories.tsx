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
  },
};

export const Playground = {
  args: {
    name: "aws",
    width: "1rem",
    height: "16px",
  },
};
