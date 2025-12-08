import { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  component: Link,
  title: "Typography/Link",
  tags: ["link", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  args: {
    size: "md",
    weight: "normal",
    href: "https://www.google.com",
    children: "Try me!",
  },
};
