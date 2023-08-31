import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dialog } from "./Dialog";

describe("Dialog Component", () => {
  it("renders the dialog content with title", () => {
    render(
      <Dialog>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Content title="Test Dialog">Test Content</Dialog.Content>
      </Dialog>
    );

    const openButton = screen.getByText("Open Dialog");
    userEvent.click(openButton);

    const dialogTitle = screen.getByText("Test Dialog");
    const dialogContent = screen.getByText("Test Content");

    expect(dialogTitle).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
  });

  it("closes the dialog when close button is clicked", () => {
    render(
      <Dialog>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Dialog.Content
          title="Test Dialog"
          showClose
        >
          Test Content
        </Dialog.Content>
      </Dialog>
    );

    const openButton = screen.getByText("Open Dialog");
    userEvent.click(openButton);

    const closeButton = screen.getByRole("button", { name: "Close" });
    userEvent.click(closeButton);

    const dialogTitle = screen.queryByText("Test Dialog");
    const dialogContent = screen.queryByText("Test Content");

    expect(dialogTitle).not.toBeInTheDocument();
    expect(dialogContent).not.toBeInTheDocument();
  });
});
