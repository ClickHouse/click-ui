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
    state: {
      options: ["default","success","neutral", "info", "warning", "danger", "disabled"],
      control: { type: "radio" },
    },
    dismissible: {
      options: [true, false],
      control: { type: "boolean" },
    }
  }
};

export const Playground = {
  args: {
    text: "experiment",
    state: "success",
    size: "md",
    dismissible: false,
  },
};
