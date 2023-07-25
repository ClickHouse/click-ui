import Separator from "./Separator";

export default {
  component: Separator,
  title: "Display/Separator",
  tags: ["separator","autodocs"],
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
