import { Title } from "./Title";

export default {
  component: Title,
  title: "Typography/Title",
  tags: ["autodocs"],
  argTypes: {
    size: {
      options: ["2xl", "xl", "lg", "md", "sm", "xs"],
      control: { type: "radio" },
    },
    type: {
      options: ["product", "brand"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    text: "Query billions of rows in milliseconds",
    size: "md",
    type: "product",
    color: "default",
  },
};
