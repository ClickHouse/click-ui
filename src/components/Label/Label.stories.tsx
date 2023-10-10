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
    <input id="test" />
  </Label>
);

export default {
  component: FieldExample,
  title: "Forms/Label",
  tags: ["form-field", "label", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    text: { control: "string" },
  },
};

export const Playground = {
  args: {
    text: "Form Field label",
    error: false,
    disabled: false,
  },
};
