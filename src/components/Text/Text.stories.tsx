import { Text } from "./Text";

export default {
  component: Text,
  title: "Text",
  tags: ["text"],
  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],
      control: { type: "radio" },
    },
  }
};

export const Default = {
  args: {
    text: "Query billions of rows in milliseconds",
    size: "md",
		weight: "normal",
		color: "default"
  },
};
