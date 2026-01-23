import { Alert, AlertProps } from "./Alert";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderCUI } from "../../utils/test-utils";

describe("Alert", () => {
  const renderAlert = (props: AlertProps) => renderCUI(<Alert {...props} />);

  it("given a dismissible alert, should not be visible after dismissing it", async () => {
    const text = "Test alert component";
    const { queryAllByText, getByTestId } = renderAlert({
      text,
      dismissible: true,
    });

    expect(queryAllByText(text).length).toEqual(1);

    const dismissButton = getByTestId("click-alert-dismiss-button");
    userEvent.click(dismissButton);
    await waitFor(() => expect(queryAllByText(text).length).toEqual(0));
  });
});
