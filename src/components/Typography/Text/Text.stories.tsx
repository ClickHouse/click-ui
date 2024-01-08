import { Text } from "./Text";

export default {
  component: Text,
  title: "Typography/Text",
  tags: ["text", "autodocs"],
  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],
      control: { type: "select" },
    },
    align: {
      options: ["left", "center", "right"],
      control: { type: "radio" },
    },
    color: {
      options: ["default", "muted"],
      control: { type: "radio" },
    },
    weight: {
      options: ["normal", "medium", "semibold", "bold", "mono"],
      control: { type: "select" },
    },
  },
};

export const Playground = {
  args: {
    size: "md",
    weight: "normal",
    color: "default",
    align: "left",
    children: "Query billions of rows in milliseconds",
  },
};
