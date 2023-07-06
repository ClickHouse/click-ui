import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "@/components";
import { CheckboxProps } from "@/components/Checkbox/Checkbox";

describe("Checkbox", () => {
  const renderCheckbox = (props: CheckboxProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <Checkbox {...props} />
      </ThemeProvider>
    );

  it("should execute action on click", () => {
    let counter = 0;
    const hanldeClick = () => (counter = 1);
    const { getByTestId } = renderCheckbox({
      onCheckedChange: hanldeClick,
      label: "Accept terms and conditions",
    });
    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);

    expect(counter).toEqual(1);
  });

  it("should not execute action on click if the checkbox is disabled", () => {
    let counter = 0;
    const hanldeClick = () => (counter = 1);
    const { getByTestId } = renderCheckbox({
      onCheckedChange: hanldeClick,
      label: "Accept terms and conditions",
      isDisabled: true,
    });
    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);

    expect(counter).toEqual(0);
  });
});
