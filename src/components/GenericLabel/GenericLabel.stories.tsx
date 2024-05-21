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
    <input id="test" />
  </GenericLabel>
);

export default {
  component: FieldExample,
  title: "Forms/GenericLabel",
  tags: ["form-field", "generic-label", "autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    text: { control: "string" },
  },
};

export const Playground = {
  args: {
    text: "Form Field generic label",
    disabled: false,
  },
};
