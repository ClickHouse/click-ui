import { fireEvent } from "@testing-library/dom";
import VerticalStepper from "./VerticalStepper";
import { renderCUI } from "@/utils/test-utils";
interface Props {
  activeIndex?: number;
  completed?: Array<number>;
  showItems?: Array<number>;
}
const label1Click = jest.fn();
const label2Click = jest.fn();
const label3Click = jest.fn();
const label4Click = jest.fn();
describe("VerticalStepper", () => {
  const renderVerticalStepper = ({
    activeIndex = 1,
    completed = [],
    showItems = [],
  }: Props) =>
    renderCUI(
      <VerticalStepper
        type="numbered"
        data-testid="stepper"
      >
        <VerticalStepper.Step
          onClick={label1Click}
          label="Label 1"
          data-testid="stepper-1"
          status={
            activeIndex === 1
              ? "active"
              : completed.includes(1)
              ? "complete"
              : "incomplete"
          }
          collapsed={!showItems.includes(1)}
        >
          <div data-testid="stepper-value-1">Text Value 1</div>
        </VerticalStepper.Step>
        <VerticalStepper.Step
          onClick={label2Click}
          label="Label 2"
          data-testid="stepper-2"
          status={
            activeIndex === 2
              ? "active"
              : completed.includes(2)
              ? "complete"
              : "incomplete"
          }
          collapsed={!showItems.includes(2)}
        >
          <div data-testid="stepper-value-2">Text Value 2</div>
        </VerticalStepper.Step>
        <VerticalStepper.Step
          onClick={label3Click}
          label="Label 3"
          data-testid="stepper-3"
          status={
            activeIndex === 3
              ? "active"
              : completed.includes(3)
              ? "complete"
              : "incomplete"
          }
          collapsed={!showItems.includes(3)}
        >
          <div data-testid="stepper-value-3">Text Value 3</div>
        </VerticalStepper.Step>
        <VerticalStepper.Step
          onClick={label4Click}
          label="Label 4"
          data-testid="stepper-4"
          status={
            activeIndex === 4
              ? "active"
              : completed.includes(4)
              ? "complete"
              : "incomplete"
          }
          collapsed={!showItems.includes(4)}
        >
          <div data-testid="stepper-value-4">Text Value 4</div>
        </VerticalStepper.Step>
      </VerticalStepper>
    );

  test("renders Stepper", () => {
    const { queryByTestId } = renderVerticalStepper({});
    expect(queryByTestId("stepper")).not.toBeNull();
    expect(queryByTestId("stepper-1")).not.toBeNull();
    expect(queryByTestId("stepper-2")).not.toBeNull();
    expect(queryByTestId("stepper-3")).not.toBeNull();
    expect(queryByTestId("stepper-4")).not.toBeNull();
    expect(queryByTestId("stepper-value-1")).not.toBeNull();
    expect(queryByTestId("stepper-value-2")).toBeNull();
    expect(queryByTestId("stepper-value-3")).toBeNull();
    expect(queryByTestId("stepper-value-4")).toBeNull();
  });

  test("inactive step is disabled", () => {
    const { queryByTestId, getByTestId } = renderVerticalStepper({});

    expect(queryByTestId("stepper-4")).not.toBeNull();
    fireEvent.click(getByTestId("stepper-4"));
    expect(label4Click).not.toBeCalled();
  });

  test("complete step is clickable", () => {
    const { queryByTestId, getByTestId } = renderVerticalStepper({
      activeIndex: 2,
      completed: [1],
    });

    expect(queryByTestId("stepper-1")).not.toBeNull();
    fireEvent.click(getByTestId("stepper-1"));
    expect(label1Click).toBeCalled();
  });

  test("show items with collapsible false ", () => {
    const { queryByTestId } = renderVerticalStepper({
      activeIndex: 2,
      completed: [1],
      showItems: [1],
    });

    expect(queryByTestId("stepper-value-1")).not.toBeNull();
    expect(queryByTestId("stepper-value-2")).not.toBeNull();
    expect(queryByTestId("stepper-value-3")).toBeNull();
  });
});
