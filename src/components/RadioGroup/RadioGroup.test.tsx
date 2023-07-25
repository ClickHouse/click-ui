import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";
import { RadioGroup } from "@/components";
import { RadioGroupProps } from "./RadioGroup";

describe("RadioGroup", () => {
  const renderRadioGroup = (props: RadioGroupProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <RadioGroup {...props}>
          <RadioGroup.Item
            label="Radio Button1"
            value="RadioButton1"
          />
          <RadioGroup.Item
            label="Radio Button2"
            value="RadioButton2"
          />
          <RadioGroup.Item
            label="Radio Button3"
            value="RadioButton3"
          />
        </RadioGroup>
      </ThemeProvider>
    );

  it("should execute action on click", () => {
    let counter = 0;
    const handleClick = () => counter++;
    const { getByText } = renderRadioGroup({
      onValueChange: handleClick,
    });
    const radio = getByText("Radio Button2");
    fireEvent.click(radio);

    expect(counter).toEqual(1);
  });

  it("should not execute action on click if the radio is disabled", () => {
    let counter = 0;
    const handleClick = () => counter++;
    const { getByTestId } = renderRadioGroup({
      onValueChange: handleClick,
      disabled: true,
    });
    const radio = getByTestId("radio");
    fireEvent.click(radio);

    expect(counter).toEqual(0);
  });
});
