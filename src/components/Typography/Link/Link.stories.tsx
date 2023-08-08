import { Link } from "./Link";

export default {
  component: Link,
  title: "Typography/Link",
  tags: ["link", "autodocs"],
  argTypes: {
    size: {
      options: ["lg", "md", "sm", "xs"],
      control: { type: "radio" },
    },
    weight: {
      options: ["normal", "medium", "semibold", "bold"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    size: "md",
    weight: "normal",
    href: "https://www.google.com",
    children: "Try me!",
    isExternal: false,
  },
};
