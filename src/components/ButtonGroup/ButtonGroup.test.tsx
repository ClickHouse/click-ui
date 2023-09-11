import { fireEvent } from "@testing-library/react";
import { ButtonGroup, ButtonGroupProps } from "./ButtonGroup";
import { renderCUI } from "@/utils/test-utils";

describe("ButtonGroup", () => {
  const renderButtonGroup = (props: ButtonGroupProps) =>
    renderCUI(<ButtonGroup {...props} />);
  const labels = ["Option 1", "Option 2", "Option 3"];

  it("renders buttons with labels correctly", () => {
    const { getByText } = renderButtonGroup({ labels: labels });

    labels.forEach(label => {
      expect(getByText(label).textContent).toBe(label);
    });
  });

  it("calls onClick handler when a button is clicked", () => {
    let counter = 0;
    const handleClick = () => (counter = 1);

    const { getByText } = renderButtonGroup({
      labels: labels,
      onClick: handleClick,
    });

    fireEvent.click(getByText("Option 2"));

    expect(counter).toEqual(1);
  });

  it("adds 'active' class to the active button", () => {
    const { getByText } = renderButtonGroup({
      labels: labels,
      activeIndex: 1,
    });

    const activeButton = getByText("Option 2");

    expect(activeButton).active == true;
  });
});
