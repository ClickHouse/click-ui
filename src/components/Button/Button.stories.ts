import { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Buttons/Button",
  tags: ["button", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    type: "primary",
    disabled: false,
    label: "Button",
    align: "center",
    fillWidth: false,
    loading: false,
    showLabelWithLoading: false,
  },
};
