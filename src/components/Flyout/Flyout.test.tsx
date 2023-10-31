import { fireEvent } from "@testing-library/react";
import { Flyout } from "./Flyout";
import { renderCUI } from "@/utils/test-utils";
import { Button } from "..";
import { DialogProps } from "@radix-ui/react-dialog";

describe("Flyout", () => {
  const renderFlyout = (props: DialogProps) => {
    return renderCUI(
      <Flyout {...props}>
        <Flyout.Trigger>
          <Button iconLeft="user">Flyout Fixed</Button>
        </Flyout.Trigger>
        <Flyout.Content strategy="fixed">
          <Flyout.Header
            title="test1"
            description="test2"
          />
          <Flyout.Body>Flyout Text</Flyout.Body>
          <Flyout.Footer>
            <Flyout.Close label="Cancel" />
            <Button type="primary">Primary Button</Button>
          </Flyout.Footer>
        </Flyout.Content>
      </Flyout>
    );
  };
  it("should open flyout on click", () => {
    const { queryByText } = renderFlyout({});
    const selectTrigger = queryByText("Flyout Fixed");
    expect(selectTrigger).not.toBeNull();
    expect(queryByText("Flyout Text")).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Flyout Text")).not.toBeNull();
    expect(queryByText("test1")).not.toBeNull();
  });

  it("should open on updating open param", () => {
    const { queryByText } = renderFlyout({
      open: true,
    });
    expect(queryByText("Flyout Text")).not.toBeNull();
  });

  it("should close flyout on clicking close Button in header", () => {
    const { queryByText, getByTestId } = renderFlyout({});
    const selectTrigger = queryByText("Flyout Fixed");
    expect(selectTrigger).not.toBeNull();
    expect(queryByText("Flyout Text")).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Flyout Text")).not.toBeNull();
    expect(queryByText("test1")).not.toBeNull();
    fireEvent.click(getByTestId("flyout-header-close-btn"));
    expect(queryByText("Flyout Text")).toBeNull();
  });

  it("should close flyout on clicking close Button in footer", () => {
    const { queryByText, getByText } = renderFlyout({});
    const selectTrigger = queryByText("Flyout Fixed");
    expect(selectTrigger).not.toBeNull();
    expect(queryByText("Flyout Text")).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Flyout Text")).not.toBeNull();
    fireEvent.click(getByText("Cancel"));
    expect(queryByText("Flyout Text")).toBeNull();
  });
});
