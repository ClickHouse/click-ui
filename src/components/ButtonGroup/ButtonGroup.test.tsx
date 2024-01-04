import { fireEvent } from "@testing-library/react";
import { ButtonGroup, ButtonGroupProps } from "./ButtonGroup";
import { renderCUI } from "@/utils/test-utils";
import "@testing-library/jest-dom";

describe("ButtonGroup", () => {
  const renderButtonGroup = (props: ButtonGroupProps) =>
    renderCUI(<ButtonGroup {...props} />);
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  it("renders buttons with labels correctly", () => {
    const { getByText } = renderButtonGroup({ options });

    options.forEach(option => {
      expect(getByText(option.label).textContent).toBe(option.label);
    });
  });

  it("calls onClick handler when a button is clicked", () => {
    let counter = 0;
    const handleClick = () => (counter = 1);

    const { getByText } = renderButtonGroup({
      options,
      onClick: handleClick,
    });

    fireEvent.click(getByText("Option 2"));

    expect(counter).toEqual(1);
  });

  it("adds 'aria-pressed' attr to the active/pressed button", () => {
    const { getByText } = renderButtonGroup({
      options,
      selected: "option2",
    });

    const activeButton = getByText("Option 2");
    expect(activeButton).toHaveAttribute("aria-pressed", "true");
    const inactiveButton = getByText("Option 1");
    expect(inactiveButton).toHaveAttribute("aria-pressed", "false");
  });
});
