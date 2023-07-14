import Separator from "./Separator";

export default {
  component: Separator,
  title: "Separator",
  tags: ["separator"],
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

export const Default = {
  args: {
    size: "xs",
    orientation: "horizontal",
  },
};
