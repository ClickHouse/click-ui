import { Button, ButtonProps } from "./Button";
import { fireEvent } from "@testing-library/react";
import { renderCUI } from "@/utils/test-utils";
import "@testing-library/jest-dom";

describe("Button", () => {
  const renderButton = (props: ButtonProps) => renderCUI(<Button {...props} />);

  it("should render the button", () => {
    const { getByText } = renderButton({ children: "Hello" });
    expect(getByText("Hello").textContent).toBe("Hello");
  });

  it("should execute action on click", () => {
    let counter = 0;
    const handleClick = () => (counter = 1);
    const { getByText } = renderButton({
      onClick: handleClick,
      label: "Button",
    });
    const button = getByText("Button");
    button.focus();
    fireEvent.click(button);

    expect(counter).toEqual(1);
  });

  it("given a loading button, it should redner the loading icon but not the children", () => {
    const { queryByText, getAllByTestId } = renderButton({
      children: [<>Button</>],
      loading: true,
    });
    const button = queryByText("Button");
    expect(button).not.toBeVisible();

    const loadingButton = getAllByTestId("click-ui-button");
    expect(loadingButton.length).toEqual(1);
  });
});
