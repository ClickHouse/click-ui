import { renderCUI } from "@/utils/test-utils";
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from "@/components/ConfirmationDialog/ConfirmationDialog";
import { fireEvent } from "@testing-library/dom";

describe("Dialog Component", () => {
  const renderDialog = (
    {
      title = "Dialog Title",
      message = "Are you sure you want to proceed?",
      onConfirm = () => {
        void undefined;
      },
      onCancel,
      open,
      primaryActionLabel = "Confirm",
      secondaryActionLabel = "Cancel",
      children,
      disabled,
      loading,
    }: Partial<ConfirmationDialogProps> = {} as ConfirmationDialogProps
  ) =>
    renderCUI(
      <ConfirmationDialog
        title={title}
        message={message}
        onConfirm={onConfirm}
        primaryActionLabel={primaryActionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onCancel={onCancel}
        open={open}
        children={children}
        disabled={disabled}
        loading={loading}
      />
    );

  it("renders the dialog title", () => {
    const title = "Test dialog";
    const { getByText } = renderDialog({ title, open: true });

    expect(getByText(title).textContent).toEqual(title);
  });

  it("doesn't render the dialog title when the open prop is false", () => {
    const title = "Test dialog";
    const { queryAllByText } = renderDialog({ title, open: false });

    expect(queryAllByText(title).length).toEqual(0);
  });

  it("renders the dialog message", () => {
    const message = "this is a test message";
    const { getByText } = renderDialog({ message, open: true });

    expect(getByText(message).textContent).toEqual(message);
  });

  it("renders the dialog primary action label", () => {
    const primaryActionLabel = "Action";
    const { getByText } = renderDialog({ primaryActionLabel, open: true });

    expect(getByText(primaryActionLabel).textContent).toEqual(primaryActionLabel);
  });

  it("closes the dialog on primary action click", () => {
    const title = "Dialog Title";
    const primaryActionLabel = "PrimaryAction";

    let open = true;
    const { getByText, queryAllByText } = renderDialog({
      title,
      primaryActionLabel,
      open,
      onCancel: () => (open = false),
    });

    expect(queryAllByText(title).length).toEqual(1);
    const primaryBtn = getByText(primaryActionLabel);
    fireEvent.click(primaryBtn);
    expect(open).toEqual(false);
  });

  it("executes the primary action on primary action click", () => {
    let counter = 0;
    const title = "Dialog Title";
    const primaryActionLabel = "PrimaryAction";
    const onConfirm = () => counter++;

    const { getByText } = renderDialog({
      title,
      primaryActionLabel,
      onConfirm,
      open: true,
    });

    const primaryBtn = getByText(primaryActionLabel);
    fireEvent.click(primaryBtn);
    expect(counter).toEqual(1);
  });

  it("renders the dialog secondary action label", () => {
    const secondaryActionLabel = "SecondaryAction";
    const { getByText } = renderDialog({ secondaryActionLabel, open: true });

    expect(getByText(secondaryActionLabel).textContent).toEqual(secondaryActionLabel);
  });

  it("closes the dialog on secondary action click", () => {
    const title = "Dialog Title";
    const secondaryActionLabel = "SecondaryAction";

    let open = true;
    const { getByText, queryAllByText } = renderDialog({
      title,
      secondaryActionLabel,
      open,
      onCancel: () => (open = false),
    });

    expect(queryAllByText(title).length).toEqual(1);
    const secondaryActionBtn = getByText(secondaryActionLabel);
    fireEvent.click(secondaryActionBtn);
    expect(open).toEqual(false);
  });

  it("fails to render in case you provide both children and message props", () => {
    const children = <div>test</div>;
    const message = "this is a test message";

    expect(() => renderDialog({ children, message, open: true })).toThrowError(
      "You can't pass children and message props at the same time"
    );
  });

  describe("Enter key functionality", () => {
    it("triggers onConfirm when Enter key is pressed", () => {
      const onConfirm = vi.fn();
      const { getByRole } = renderDialog({ onConfirm, open: true });

      fireEvent.keyDown(getByRole("dialog"), { key: "Enter" });
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it("triggers onConfirm multiple times when Enter is pressed multiple times", () => {
      const onConfirm = vi.fn();
      const { getByRole } = renderDialog({ onConfirm, open: true });

      fireEvent.keyDown(getByRole("dialog"), { key: "Enter" });
      fireEvent.keyDown(getByRole("dialog"), { key: "Enter" });
      fireEvent.keyDown(getByRole("dialog"), { key: "Enter" });
      expect(onConfirm).toHaveBeenCalledTimes(3);
    });

    it("does not trigger onConfirm when Enter is pressed and dialog is disabled", () => {
      const onConfirm = vi.fn();
      const { getByRole } = renderDialog({
        onConfirm,
        disabled: true,
        open: true,
      });

      fireEvent.keyDown(getByRole("dialog"), { key: "Enter" });
      expect(onConfirm).not.toHaveBeenCalled();
    });

    it("does not trigger onConfirm when Enter is pressed and dialog is loading", () => {
      const onConfirm = vi.fn();
      const { getByRole } = renderDialog({
        onConfirm,
        loading: true,
        open: true,
      });

      fireEvent.keyDown(getByRole("dialog"), { key: "Enter" });
      expect(onConfirm).not.toHaveBeenCalled();
    });

    it("does not trigger onConfirm when Enter is pressed and onConfirm is not provided", () => {
      const { getByRole } = renderDialog({ onConfirm: undefined, open: true });

      expect(() =>
        fireEvent.keyDown(getByRole("dialog"), { key: "Enter" })
      ).not.toThrow();
    });
  });
});
