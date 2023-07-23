import { Text } from "./Text";

export default {
  component: Text,
  title: "Typography/Text",
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    text: "Query billions of rows in milliseconds",
    size: "md",
    weight: "normal",
    color: "default",
  },
};
