import { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: "Display/Avatar",
  tags: ["avatar", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  args: {
    text: "CM",
  },
};
