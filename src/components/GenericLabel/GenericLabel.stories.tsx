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
