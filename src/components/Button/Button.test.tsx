import { ThemeProvider } from "styled-components";
import { Button, ButtonProps } from "./Button";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";

describe("Button", () => {
  const renderButton = (props: ButtonProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <Button {...props} />
      </ThemeProvider>
    );

  it("should render the button", () => {
    const { getByText } = renderButton({ children: "Hello" });
    expect(getByText("Hello").textContent).toBe("Hello");
  });

  it("should execute action on click", () => {
    let counter = 0;
    const hanldeClick = () => (counter = 1);
    const { getByText } = renderButton({
      onClick: hanldeClick,
      label: "Button",
    });
    const button = getByText("Button");
    button.focus();
    fireEvent.click(button);

    expect(counter).toEqual(1);
  });
});
