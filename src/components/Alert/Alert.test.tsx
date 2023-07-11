import { ThemeProvider } from "@/theme";
import { Alert, AlertProps } from "./Alert";
import { fireEvent, render } from "@testing-library/react";

describe("Alert", () => {
  const renderAlert = (props: AlertProps) =>
    render(
      <ThemeProvider theme="light">
        <Alert {...props} />
      </ThemeProvider>
    );

  it("given no arguments, should render the Alert component", () => {
    const { getAllByTestId } = renderAlert({ text: "Test alert component" });

    expect(getAllByTestId("click-alert").length).toEqual(1);
  });

  it("given a text, should render it", () => {
    const text = "Test alert component";
    const { getAllByText } = renderAlert({ text });

    expect(getAllByText(text).length).toEqual(1);
  });

  it("given a dismissable alert, should not be visible after dismissing it", () => {
    const text = "Test alert component";
    const { getAllByText, getByTestId } = renderAlert({
      text,
      dismissable: true,
    });

    expect(getAllByText(text).length).toEqual(1);

    const dismissButton = getByTestId("click-alert-dismiss-button");
    fireEvent.click(dismissButton);
    expect(getAllByText(text).length).toEqual(0);
  });
});
