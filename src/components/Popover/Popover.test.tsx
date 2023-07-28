import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { PopoverProps } from "@radix-ui/react-popover";
import { Checkbox, Popover } from "@/components";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Popover", () => {
  const renderPopover = (props: PopoverProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <Popover {...props}>
          <Popover.Trigger>
            <div>Click Here</div>
          </Popover.Trigger>
          <Popover.Content>
            <div>
              Click on the input element below
              <Checkbox />
              <div>This is a sample data to experiment the popover</div>
            </div>
          </Popover.Content>
        </Popover>
      </ThemeProvider>
    );

  it("should open popover on click", () => {
    const { getByText } = renderPopover({});
    const popoverTrigger = getByText("Click Here");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(getByText("Click on the input element below")).not.toBeNull();
  });

  it("should not close popover on clicking the checkbox", () => {
    const { getByText, getByTestId } = renderPopover({});
    const popoverTrigger = getByText("Click Here");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(getByText("Click on the input element below")).not.toBeNull();
    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);
    expect(getByText("Click on the input element below")).not.toBeNull();
  });
});
