import React from "react";
import FormFieldLabel from "./FormFieldLabel";

const FieldExample = ({ disabled, error, text }) => (
  <FormFieldLabel
    disabled={disabled}
    error={error}
    htmlFor="test"
  >
    {text}
    <input id="test" />
  </FormFieldLabel>
);

export default {
  component: FieldExample,
  title: "FormFieldLabel",
  tags: ["form-field", "form-field-label"],
  argTypes: {
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    text: { control: "string" },
  },
};

export const Default = {
  args: {
    text: "Form Field label",
    error: false,
    disabled: false,
  },
};
