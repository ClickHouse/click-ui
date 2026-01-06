import type { Meta, StoryObj } from "@storybook/react-vite";
import { GenericLabel } from "./GenericLabel";

const meta = {
  component: GenericLabel,
  title: "Forms/GenericLabel",
  tags: ["form-field", "generic-label", "autodocs"],
} satisfies Meta<typeof GenericLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    disabled: false,
    htmlFor: "test",
  },
  render: args => (
    <GenericLabel {...args}>
      Form Field generic label
      <input id="test" />
    </GenericLabel>
  ),
};
