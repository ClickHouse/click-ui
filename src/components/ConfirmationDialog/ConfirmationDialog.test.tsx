import { renderCUI } from "@/utils/test-utils";
import {
  ConfirmationDialog,
  ConfirmationDialogProps,
} from "@/components/ConfirmationDialog/ConfirmationDialog";
import { fireEvent } from "@testing-library/dom";
import { Button } from "@/components";

describe("Dialog Component", () => {
  const renderDialog = (
    {
      title = "Dialog Title",
      message = "Are you sure you want to proceed?",
      onPrimaryActionClick = () => {
        void undefined;
      },
      onOpenChange,
      open,
      primaryActionLabel = "Confirm",
      secondaryActionLabel = "Cancel",
      children,
    }: Partial<ConfirmationDialogProps> = {} as ConfirmationDialogProps
  ) =>
    renderCUI(
      <ConfirmationDialog
        title={title}
        message={message}
        onPrimaryActionClick={onPrimaryActionClick}
        primaryActionLabel={primaryActionLabel}
        secondaryActionLabel={secondaryActionLabel}
        onOpenChange={onOpenChange}
        open={open}
        children={children}
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
    const triggerLabel = "Open Dialog";
    const children = <Button label={triggerLabel} />;

    const { getByText, queryAllByText } = renderDialog({
      title,
      primaryActionLabel,
      children,
    });

    const triggerBtn = getByText(triggerLabel);
    fireEvent.click(triggerBtn);
    expect(queryAllByText(title).length).toEqual(1);
    const primaryBtn = getByText(primaryActionLabel);
    fireEvent.click(primaryBtn);
    expect(queryAllByText(title).length).toEqual(0);
  });

  it("executes the primary action on primary action click", () => {
    let counter = 0;
    const title = "Dialog Title";
    const primaryActionLabel = "PrimaryAction";
    const triggerLabel = "Open Dialog";
    const onPrimaryActionClick = () => counter++;
    const children = <Button label={triggerLabel} />;

    const { getByText } = renderDialog({
      title,
      primaryActionLabel,
      onPrimaryActionClick,
      children,
    });

    const triggerBtn = getByText(triggerLabel);
    fireEvent.click(triggerBtn);
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
    const triggerLabel = "Open Dialog";
    const children = <Button label={triggerLabel} />;

    const { getByText, queryAllByText } = renderDialog({
      title,
      secondaryActionLabel,
      children,
    });

    const triggerBtn = getByText(triggerLabel);
    fireEvent.click(triggerBtn);
    expect(queryAllByText(title).length).toEqual(1);
    const secondaryActionBtn = getByText(secondaryActionLabel);
    fireEvent.click(secondaryActionBtn);
    expect(queryAllByText(title).length).toEqual(0);
  });
});
