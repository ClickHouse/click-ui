import { TooltipProps } from "@radix-ui/react-tooltip";
import { Tooltip } from "..";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderCUI } from "@/utils/test-utils";

describe("Tooltip", () => {
  const renderTooltip = (props: TooltipProps) =>
    renderCUI(
      <Tooltip {...props}>
        <Tooltip.Trigger>
          <div>Hover Here</div>
        </Tooltip.Trigger>
        <Tooltip.Content data-testid="tooltip-content">Tooltip content</Tooltip.Content>
      </Tooltip>
    );

  it("should open tooltip on hover", async () => {
    const { getAllByText } = renderTooltip({});
    const TooltipTrigger = getAllByText("Hover Here");
    expect(TooltipTrigger.length).toEqual(1);
    await userEvent.hover(TooltipTrigger[0]);
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
