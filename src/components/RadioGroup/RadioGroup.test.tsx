import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { fireEvent, render, screen } from "@testing-library/react";
import { RadioGroup } from "@/components";
import { RadioGroupProps } from "./RadioGroup";

describe("RadioGroup", () => {
  const renderRadioGroup = (props: RadioGroupProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <RadioGroup {...props}>
          <RadioGroup.Item
            id="RadioButton1"
            label="Radio Button1"
            value="RadioButton1"
          />
          <RadioGroup.Item
            label="Radio Button2"
            value="RadioButton2"
            id="RadioButton2"
          />
          <RadioGroup.Item
            label="Radio Button3"
            value="RadioButton3"
            id="RadioButton3"
          />
        </RadioGroup>
      </ThemeProvider>
    );

  it("should execute action on click", () => {
    const handleClick = jest.fn(() => null);
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
    });
    const radio = getByLabelText("Radio Button1");
    screen.debug(radio);
    fireEvent.click(radio);
    screen.debug(getByLabelText("Radio Button1"));
    expect(handleClick).toBeCalledTimes(1);
  });

  it("should not execute action on click if the radio is disabled", () => {
    const handleClick = jest.fn(() => null);
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
      disabled: true,
    });
    const radio = getByLabelText("Radio Button2");
    expect(radio).not.toBeNull();
    fireEvent.click(radio);
    expect(handleClick).toBeCalledTimes(0);
  });
});
