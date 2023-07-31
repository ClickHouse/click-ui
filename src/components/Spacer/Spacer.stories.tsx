import { Spacer } from "./Spacer";

export default {
  component: Spacer,
  title: "Display/Spacer",
  tags: ["spacer","autodocs"],
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    size: "xxl",
  },
};

