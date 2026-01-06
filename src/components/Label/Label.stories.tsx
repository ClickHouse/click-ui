import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const meta = {
  component: Label,
  title: "Forms/Label",
  tags: ["form-field", "label", "autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Form Field label",
    error: false,
    disabled: false,
  },
  render: args => (
    <Label {...args}>
      {args.children}
      <input id="test" />
    </Label>
  ),
};
