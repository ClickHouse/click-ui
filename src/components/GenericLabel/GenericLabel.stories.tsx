import { StoryObj } from "@storybook/react-vite";
import { GenericLabel } from "./GenericLabel";

const FieldExample = ({
  disabled,
  text,
}: {
  disabled: boolean;
  error: boolean;
  text: string;
}) => {
  const inputStyle = { colorScheme: "light" as const };

  return (
    <GenericLabel
      disabled={disabled}
      htmlFor="test"
    >
      {text}
      <input
        id="test"
        style={inputStyle}
      />
    </GenericLabel>
  );
};

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
