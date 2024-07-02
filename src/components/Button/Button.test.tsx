import { Button, ButtonProps } from "./Button";
import { fireEvent } from "@testing-library/react";
import { renderCUI } from "@/utils/test-utils";

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

  it("given a loading button, it should render the loading icon", async () => {
    const { getAllByTestId } = renderButton({
      label: "Button",
      loading: true,
    });

    const loadingButton = getAllByTestId("click-ui-loading-icon");
    expect(loadingButton.length).toEqual(1);
  });

  it("given a loading button and showLabelWithLoading, it should render the loading icon and the label", async () => {
    const { getAllByTestId, getByTestId } = renderButton({
      label: "Button",
      loading: true,
      showLabelWithLoading: true
    });

    const loadingButton = getAllByTestId("click-ui-loading-icon");
    expect(loadingButton.length).toEqual(1);
    expect(getByTestId("click-ui-loading-icon-wrapper")).toHaveTextContent("Button");
  });

  it("given a non-loading button, it should not render the loading icon", async () => {
    const { queryAllByTestId } = renderButton({
      label: "Button",
      loading: false,
    });

    const loadingButton = queryAllByTestId("click-ui-loading-icon");
    expect(loadingButton.length).toEqual(0);
  });
});
