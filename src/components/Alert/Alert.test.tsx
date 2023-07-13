import { ThemeProvider } from "@/theme";
import { Alert, AlertProps } from "./Alert";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Alert", () => {
  const renderAlert = (props: AlertProps) =>
    render(
      <ThemeProvider theme="light">
        <Alert {...props} />
      </ThemeProvider>
    );

  it("given a dismissable alert, should not be visible after dismissing it", async () => {
    const text = "Test alert component";
    const { queryAllByText, getByTestId } = renderAlert({
      text,
      dismissable: true,
    });

    expect(queryAllByText(text).length).toEqual(1);

    const dismissButton = getByTestId("click-alert-dismiss-button");
    userEvent.click(dismissButton);
    await waitFor(() => expect(queryAllByText(text).length).toEqual(0));
  });
});
