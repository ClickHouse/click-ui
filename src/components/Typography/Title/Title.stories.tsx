import { Title } from "./Title";

export default {
  component: Title,
  title: "Typography/Title",
  tags: ["title", "autodocs"],
  argTypes: {
    size: {
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      control: { type: "select" },
    },
    weight: {
      options: ["1", "2", "3", "4"],
      control: { type: "select" },
    },
    type: {
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      control: { type: "select" },
    },
    family: {
      options: ["product", "brand"],
      control: { type: "radio" },
    },
    align: {
      options: ["left", "center", "right"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    size: "md",
    weight: "inherit",
    type: "h1",
    family: "product",
    color: "default",
    align: "left",
    children: "Query billions of rows in milliseconds",
  },
};
