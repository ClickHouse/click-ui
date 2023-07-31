import { ThemeProvider } from "styled-components";
import { IconButton, IconButtonProps } from "./IconButton";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";

describe("Button", () => {
  const renderButton = (props: IconButtonProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <IconButton {...props} />
      </ThemeProvider>
    );

  it("should render the button", () => {
    const { getAllByRole } = renderButton({ icon: "user" });
    expect(getAllByRole("button").length).toEqual(1);
  });

  it("should execute action on click", () => {
    let counter = 0;
    const handleClick = () => (counter = 1);
    const { getByRole } = renderButton({
      onClick: handleClick,
      icon: "user",
    });
    const button = getByRole("button");
    button.focus();
    fireEvent.click(button);

    expect(counter).toEqual(1);
  });
});
