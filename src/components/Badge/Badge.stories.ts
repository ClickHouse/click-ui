import { Badge } from "./Badge";

export default {
  component: Badge,
  title: "Badge",
  tags: ["badge"],
  argTypes: {
    size: {
      options: ["sm", "md"],
      control: { type: "radio" },
    },
  }
};

export const Default = {
  args: {
    text: "experiment",
    state: "success",
    size: "md",
    dismissable: false,
  },
};
