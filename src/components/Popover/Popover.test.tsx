import { PopoverProps } from '@radix-ui/react-popover';
import { Checkbox } from '@/components/Checkbox';
import { Popover } from '@/components/Popover';
import { fireEvent } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';

describe('Popover', () => {
  const renderPopover = (props: PopoverProps, showClose = false) =>
    renderCUI(
      <Popover {...props}>
        <Popover.Trigger>Click Here</Popover.Trigger>
        <Popover.Content showClose={showClose}>
          <div>
            Click on the input element below
            <Checkbox />
            <div>This is a sample data to experiment the popover</div>
          </div>
        </Popover.Content>
      </Popover>
    );

  it('should open popover on click', () => {
    const { getByText } = renderPopover({});
    const popoverTrigger = getByText('Click Here');
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(getByText('Click on the input element below')).not.toBeNull();
  });

  it('should not close popover on clicking the checkbox', () => {
    const { getByText, getByTestId } = renderPopover({});
    const popoverTrigger = getByText('Click Here');
    expect(popoverTrigger).not.toBeNull();
    fireEvent.click(popoverTrigger);

    expect(getByText('Click on the input element below')).not.toBeNull();
    const checkbox = getByTestId('checkbox');
    fireEvent.click(checkbox);
    expect(getByText('Click on the input element below')).not.toBeNull();
  });

  it('should render the close control as a button named "Close"', () => {
    const { getByText, getByRole } = renderPopover({}, true);
    fireEvent.click(getByText('Click Here'));

    expect(getByRole('button', { name: 'Close' })).not.toBeNull();
  });

  it('should close popover on clicking the close control', () => {
    const { getByText, getByRole, queryByText } = renderPopover({}, true);
    fireEvent.click(getByText('Click Here'));
    expect(getByText('Click on the input element below')).not.toBeNull();

    fireEvent.click(getByRole('button', { name: 'Close' }));
    expect(queryByText('Click on the input element below')).toBeNull();
  });
});
