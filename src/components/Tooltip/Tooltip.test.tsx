import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { TooltipProps } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipProvider } from "..";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Tooltip", () => {
  const renderTooltip = (props: TooltipProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <TooltipProvider delayDuration={0}>
          <Tooltip {...props}>
            <Tooltip.Trigger>
              <div>Hover Here</div>
            </Tooltip.Trigger>
            <Tooltip.Content data-testid="tooltip-content">
              Tooltip content
            </Tooltip.Content>
          </Tooltip>
        </TooltipProvider>
      </ThemeProvider>
    );

  it("should open tooltip on hover", async () => {
    const { getByText, getAllByText } = renderTooltip({});
    const TooltipTrigger = getByText("Hover Here");
    expect(TooltipTrigger).not.toBeNull();
    await userEvent.hover(TooltipTrigger);
    expect(getAllByText("Tooltip content")).not.toBeNull();
  });

  it("should close hover card on pointerLeave", async () => {
    const { getByText, getAllByText, getByTestId } = renderTooltip({});
    const TooltipTrigger = getByText("Hover Here");
    expect(TooltipTrigger).not.toBeNull();
    await userEvent.hover(TooltipTrigger);
    expect(getAllByText("Tooltip content")).not.toBeNull();
    await userEvent.unhover(TooltipTrigger);
    waitFor(() => {
      expect(getByTestId("tooltip-content")).toBeNull();
    });
  });
});
