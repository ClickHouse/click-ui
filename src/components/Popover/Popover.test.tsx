import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { PopoverProps } from "@radix-ui/react-popover";
import { Checkbox, Popover, Button } from "@/components";
import { render, fireEvent, screen } from "@testing-library/react";

describe("Popover", () => {
  const renderPopover = (props: PopoverProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <Popover {...props}>
          <Popover.Trigger>
            <Button>Click Here</Button>
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
    renderPopover({});
    const popoverTrigger = screen.getByText("Click Here");
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(screen.getByText("Click on the input element below")).not.toBeNull();
    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);
    expect(screen.getByText("Click on the input element below")).not.toBeNull();
  });
});
