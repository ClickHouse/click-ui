import React from "react";
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
  title: "Label",
  tags: ["form-field", "label"],
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
