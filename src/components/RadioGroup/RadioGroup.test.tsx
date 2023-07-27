import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { fireEvent, render } from "@testing-library/react";
import { RadioGroup } from "@/components";
import { RadioGroupProps } from "./RadioGroup";

describe("RadioGroup", () => {
  const renderRadioGroup = (props: RadioGroupProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <RadioGroup
          inline
          {...props}
        >
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
    const handleClick = jest.fn();
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
    });
    const radio = getByLabelText("Radio Button1");
    expect(radio.dataset.state).toBe("unchecked");
    fireEvent.click(radio);
    expect(radio.dataset.state).toBe("checked");
    expect(handleClick).toBeCalledTimes(1);
  });

  it("should not execute action on click if the radio is disabled", () => {
    const handleClick = jest.fn();
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
      disabled: true,
    });
    const radio = getByLabelText("Radio Button2");
    expect(radio.dataset.state).toBe("unchecked");
    expect(radio).not.toBeNull();
    fireEvent.click(radio);
    expect(radio.dataset.state).toBe("unchecked");
    expect(handleClick).toBeCalledTimes(0);
  });
});
