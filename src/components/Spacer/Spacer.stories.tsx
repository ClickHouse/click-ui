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
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    size: "xs",
    orientation: "horizontal",
  },
};
