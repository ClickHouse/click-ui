import { screen } from "@testing-library/react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Dialog } from "./Dialog";
import { fireEvent } from "@testing-library/react";
import { renderCUI } from "@/utils/test-utils";

describe("Dialog Component", () => {
  const renderDialog = (props: DialogProps) =>
    renderCUI(
      <Dialog {...props}>
        <Dialog.Trigger>
          <div>Open Dialog</div>
        </Dialog.Trigger>
        <Dialog.Close label="Close" />
        <Dialog.Content title="Test Dialog">Test Content</Dialog.Content>
      </Dialog>
    );

  it("renders the dialog content with title", () => {
    const { getByText } = renderDialog({});
    const dialogTrigger = getByText("Open Dialog");
    expect(dialogTrigger).not.toBeNull();
    fireEvent.click(dialogTrigger);

    const dialogTitle = screen.getByText("Test Dialog");
    const dialogContent = screen.getByText("Test Content");

    expect(dialogTitle).toBeTruthy();
    expect(dialogContent).toBeTruthy();
  });

  it("closes the dialog when close button is clicked", () => {
    const { getByText } = renderDialog({});
    const dialogTrigger = getByText("Open Dialog");
    expect(dialogTrigger).not.toBeNull();
    fireEvent.click(dialogTrigger);

    const DialogClose = screen.getByText("Close");
    fireEvent.click(DialogClose);

    const dialogTitle = screen.queryByText("Test Dialog");
    const dialogContent = screen.queryByText("Test Content");

    expect(dialogTitle).toBeFalsy();
    expect(dialogContent).toBeFalsy();
  });
});
