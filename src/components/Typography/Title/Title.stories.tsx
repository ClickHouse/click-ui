import { Meta, StoryObj } from "@storybook/react-vite";
import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  component: Title,
  title: "Typography/Title",
  tags: ["title", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Title>;

export const Playground: Story = {
  args: {
    size: "md",
    type: "h1",
    family: "product",
    color: "default",
    align: "left",
    children: "Query billions of rows in milliseconds",
  },
};
