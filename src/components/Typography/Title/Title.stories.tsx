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
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
    family: {
      options: ["product", "brand"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    size: "md",
    type: "h1",
    family: "product",
    color: "default",
    children: "Query billions of rows in milliseconds",
  },
};
