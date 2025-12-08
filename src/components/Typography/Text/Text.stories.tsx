import { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  component: Text,
  title: "Typography/Text",
  tags: ["text", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Playground: Story = {
  args: {
    size: "md",
    weight: "normal",
    color: "default",
    align: "left",
    children: "Query billions of rows in milliseconds",
  },
};
