import { TextField } from "./TextField";
import { renderCUI } from "../../utils/test-utils";
import { useState } from "react";

const TextFieldWrapper = ({
  initialText = "",
  label,
  labelColor,
}: {
  initialText?: string;
  label: string;
  labelColor?: string;
}) => {
  const [text, setText] = useState<string>(initialText);

  console.log(text);
  return (
    <TextField
      label={label}
      labelColor={labelColor}
      onChange={setText}
      value={text}
    />
  );
};

describe("TextField", () => {
  describe("label color", () => {
    it("is the default color when labelColor is not set", () => {
      const label = "Hello there!";
      const text = "General Kenobi";

      const { getByText } = renderCUI(
        <TextFieldWrapper
          label={label}
          initialText={text}
        />
      );

      const labelElement = getByText(label);
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveStyle("color: rgb(179, 182, 189)");
    });

    it("is the color of the passed in labelColor", () => {
      const label = "Hello there!";

      const { getByText } = renderCUI(
        <TextFieldWrapper
          label={label}
          labelColor="#FF0000"
        />
      );

      const labelElement = getByText(label);
      expect(labelElement).toBeInTheDocument();
      expect(labelElement).toHaveStyle("color: #FF0000");
    });
  });
});
