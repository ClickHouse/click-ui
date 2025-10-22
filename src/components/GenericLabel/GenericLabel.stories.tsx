import { Meta, StoryObj } from "@storybook/react-vite";
import { GenericLabel } from "./GenericLabel";

const FieldExample = ({
  disabled,
  text,
}: {
  disabled: boolean;
  error: boolean;
  text: string;
}) => (
  <GenericLabel
    disabled={disabled}
    htmlFor="test"
  >
    {text}
    <input
      id="test"
      style={{ colorScheme: "light" }}
    />
  </GenericLabel>
);

export default {
  component: FieldExample,
  title: "Forms/GenericLabel",
  tags: ["form-field", "generic-label", "autodocs"],
};

export default meta;

type Story = StoryObj<typeof GenericLabel>;

export const Playground: Story = {
  args: {
    children: "Form Field generic label",
    disabled: false,
  },
  render: args => (
    <GenericLabel {...args}>
      {args.children}
      <input id="test" />
    </GenericLabel>
  ),
};
