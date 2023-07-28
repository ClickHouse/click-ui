import { ThemeProvider } from "styled-components";
import "@testing-library/jest-dom";
import { themes } from "../../theme";
import { HoverCardProps } from "@radix-ui/react-hover-card";
import { Checkbox, HoverCard } from "@/components";
import { render, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

describe("HoverCard", () => {
  const renderHoverCard = (props: HoverCardProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <HoverCard
          openDelay={0}
          closeDelay={0}
          {...props}
        >
          <HoverCard.Trigger>Hover Here</HoverCard.Trigger>
          <HoverCard.Content data-testid="popover-panel">
            <div>
              Click on the input element below
              <Checkbox />
              <div>This is a sample data to experiment the hoverCard</div>
            </div>
          </HoverCard.Content>
        </HoverCard>
      </ThemeProvider>
    );

  it("should open hover card on hover", async () => {
    const { getByText } = renderHoverCard({});
    const hoverCardTrigger = getByText("Hover Here");
    expect(hoverCardTrigger).not.toBeNull();
    fireEvent.pointerEnter(hoverCardTrigger);
    await waitFor(() => {
      expect(getByText("Click on the input element below")).not.toBeNull();
    });
  });

  it("should not close hoverCard on clicking the checkbox", async () => {
    const { getByTestId, getByText } = renderHoverCard({});
    const hoverCardTrigger = getByText("Hover Here");
    expect(hoverCardTrigger).not.toBeNull();
    fireEvent.pointerOver(hoverCardTrigger);

    await waitFor(() => {
      expect(getByText("Click on the input element below")).not.toBeNull();
    });
    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);
    expect(getByText("Click on the input element below")).not.toBeNull();
  });

  it("should close hover card on pointerLeave", async () => {
    const { getByText, queryByText } = renderHoverCard({});
    const hoverCardTrigger = getByText("Hover Here");
    expect(hoverCardTrigger).not.toBeNull();
    fireEvent.pointerOver(hoverCardTrigger);

    await waitFor(() => {
      expect(getByText("Click on the input element below")).not.toBeNull();
    });
    fireEvent.pointerLeave(hoverCardTrigger);
    await waitFor(() => {
      expect(queryByText("Click on the input element below")).not.toBeInTheDocument();
    });
  });

  it("should not close hover card on pointerLeave and focus ", async () => {
    const { getByText, queryByText, getByTestId } = renderHoverCard({});
    const hoverCardTrigger = getByText("Hover Here");
    expect(hoverCardTrigger).not.toBeNull();
    fireEvent.pointerOver(hoverCardTrigger);

    await waitFor(() => {
      expect(getByText("Click on the input element below")).not.toBeNull();
    });
    const checkbox = getByTestId("checkbox");
    fireEvent.click(checkbox);
    fireEvent.pointerLeave(getByTestId("popover-panel"));
    await waitFor(() => {
      expect(queryByText("Click on the input element below")).not.toBeInTheDocument();
    });
  });
});
