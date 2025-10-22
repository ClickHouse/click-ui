import { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label";

const FieldExample = ({
  disabled,
  error,
  text,
}: {
  disabled: boolean;
  error: boolean;
  text: string;
}) => (
  <Label
    disabled={disabled}
    error={error}
    htmlFor="test"
  >
    {text}
    <input
      id="test"
      style={{ colorScheme: "light" }}
    />
  </Label>
);

export default {
  component: FieldExample,
  title: "Forms/Label",
  tags: ["form-field", "label", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

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
