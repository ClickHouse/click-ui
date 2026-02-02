import { fireEvent } from '@testing-library/dom';
import VerticalStepper from './VerticalStepper';
import { renderCUI } from '@/utils/test-utils';
interface Props {
  activeIndex?: number;
  completed?: Array<number>;
  showItems?: Array<number>;
}
const label1Click = vi.fn();
const label2Click = vi.fn();
const label3Click = vi.fn();
const label4Click = vi.fn();
describe('VerticalStepper', () => {
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
              ? 'active'
              : completed.includes(1)
                ? 'complete'
                : 'incomplete'
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
              ? 'active'
              : completed.includes(2)
                ? 'complete'
                : 'incomplete'
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
              ? 'active'
              : completed.includes(3)
                ? 'complete'
                : 'incomplete'
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
              ? 'active'
              : completed.includes(4)
                ? 'complete'
                : 'incomplete'
          }
          collapsed={!showItems.includes(4)}
        >
          <div data-testid="stepper-value-4">Text Value 4</div>
        </VerticalStepper.Step>
      </VerticalStepper>
    );

  test('renders Stepper', () => {
    const { queryAllByTestId } = renderVerticalStepper({});
    expect(queryAllByTestId('stepper')).toHaveLength(1);
    expect(queryAllByTestId('stepper-1')).toHaveLength(1);
    expect(queryAllByTestId('stepper-2')).toHaveLength(1);
    expect(queryAllByTestId('stepper-3')).toHaveLength(1);
    expect(queryAllByTestId('stepper-4')).toHaveLength(1);
    expect(queryAllByTestId('stepper-value-1')).toHaveLength(1);
    expect(queryAllByTestId('stepper-value-2')).toHaveLength(0);
    expect(queryAllByTestId('stepper-value-3')).toHaveLength(0);
    expect(queryAllByTestId('stepper-value-4')).toHaveLength(0);
  });

  test('inactive step is disabled', () => {
    const { queryAllByTestId, getByTestId } = renderVerticalStepper({});

    expect(queryAllByTestId('stepper-4')).toHaveLength(1);
    fireEvent.click(getByTestId('stepper-4'));
    expect(label4Click).not.toBeCalled();
  });

  test('complete step is clickable', () => {
    const { queryAllByTestId, getByTestId } = renderVerticalStepper({
      activeIndex: 2,
      completed: [1],
    });

    expect(queryAllByTestId('stepper-1')).toHaveLength(1);
    fireEvent.click(getByTestId('stepper-1'));
    expect(label1Click).toBeCalled();
  });

  test('show items with collapsible false ', () => {
    const { queryAllByTestId } = renderVerticalStepper({
      activeIndex: 2,
      completed: [1],
      showItems: [1],
    });

    expect(queryAllByTestId('stepper-value-1')).toHaveLength(1);
    expect(queryAllByTestId('stepper-value-2')).toHaveLength(1);
    expect(queryAllByTestId('stepper-value-3')).toHaveLength(0);
  });
});
