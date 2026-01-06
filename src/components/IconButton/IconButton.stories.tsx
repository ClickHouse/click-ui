import { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: "Buttons/IconButton",
  tags: ["icon-button", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
  args: {
    icon: "user",
    size: "default",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    icon: "user",
  },
};

export const Empty: Story = {
  args: {
    type: "ghost",
    icon: "user",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    icon: "user",
  },
};
