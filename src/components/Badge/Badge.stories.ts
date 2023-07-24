import { Badge } from "./Badge";

export default {
  component: Badge,
  title: "Display/Badge",
  tags: ["badge","autodocs"],
  argTypes: {
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
  }
};

export const Playground = {
  args: {
    text: "experiment",
    state: "success",
    size: "md",
  },
};
