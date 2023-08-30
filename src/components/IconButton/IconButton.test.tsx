import { IconButton, IconButtonProps } from "./IconButton";
import { fireEvent } from "@testing-library/react";
import { renderCUI } from "@/utils/test-utils";

describe("Button", () => {
  const renderButton = (props: IconButtonProps) => renderCUI(<IconButton {...props} />);

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
