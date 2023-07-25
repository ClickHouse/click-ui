import { Text } from "./Text";

export default {
  component: Text,
  title: "Typography/Text",
  tags: ["text", "autodocs"],
  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    size: "md",
    weight: "normal",
    color: "default",
    children: "Query billions of rows in milliseconds",
  },
};
