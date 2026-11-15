import { PopoverProps } from '@radix-ui/react-popover';
import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { IconButton } from '@/components/IconButton';
import { Popover } from '@/components/Popover';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  describe('Trigger', () => {
    const renderWithButton = () =>
      renderCUI(
        <Popover>
          <Popover.Trigger asChild>
            <button>Details</button>
          </Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      );

    it('makes the child the popover button with asChild', () => {
      const { getByRole } = renderWithButton();
      const trigger = getByRole('button', { name: 'Details' });

      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger.parentElement).not.toHaveAttribute('aria-haspopup');
    });

    it('opens from the keyboard and returns focus to the child on Escape with asChild', async () => {
      const user = userEvent.setup();
      const { getByRole, queryByText } = renderWithButton();
      const trigger = getByRole('button', { name: 'Details' });

      await user.tab();
      expect(trigger).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(queryByText('Popover content')).not.toBeNull();
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Escape}');
      expect(queryByText('Popover content')).toBeNull();
      expect(trigger).toHaveFocus();
    });

    it("passes its props to the child and keeps the child's onClick with asChild", async () => {
      const onChildClick = vi.fn();
      const { getByRole, queryByText } = renderCUI(
        <Popover>
          <Popover.Trigger
            asChild
            data-testid="details-trigger"
          >
            <button
              type="button"
              onClick={onChildClick}
            >
              Details
            </button>
          </Popover.Trigger>
          <Popover.Content>Popover content</Popover.Content>
        </Popover>
      );
      const trigger = getByRole('button', { name: 'Details' });
      expect(trigger).toHaveAttribute('data-testid', 'details-trigger');

      await userEvent.click(trigger);
      expect(onChildClick).toHaveBeenCalledTimes(1);
      expect(queryByText('Popover content')).not.toBeNull();
    });

    it('gives a native button child type="button" and no htmlType with asChild', () => {
      const { getByRole } = renderWithButton();
      const trigger = getByRole('button', { name: 'Details' });

      expect(trigger).toHaveAttribute('type', 'button');
      expect(trigger).not.toHaveAttribute('htmltype');
    });

    it.each([
      ['a Button', <Button label="Details" />, <Button label="Standalone" />],
      [
        'an IconButton',
        <IconButton
          icon="user"
          aria-label="Details"
        />,
        <IconButton
          icon="user"
          aria-label="Standalone"
        />,
      ],
    ])(
      'leaves the variant of %s child alone with asChild',
      (_name, child, standalone) => {
        const { getByRole } = renderCUI(
          <>
            {standalone}
            <Popover>
              <Popover.Trigger asChild>{child}</Popover.Trigger>
            </Popover>
          </>
        );
        const trigger = getByRole('button', { name: 'Details' });

        expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
        expect(trigger.className).toBe(
          getByRole('button', { name: 'Standalone' }).className
        );
      }
    );

    it('keeps a Button child from submitting its form with asChild', async () => {
      const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
      const { getByRole, queryByText } = renderCUI(
        <form onSubmit={onSubmit}>
          <Popover>
            <Popover.Trigger asChild>
              <Button label="Details" />
            </Popover.Trigger>
            <Popover.Content>Popover content</Popover.Content>
          </Popover>
        </form>
      );

      await userEvent.click(getByRole('button', { name: 'Details' }));

      expect(queryByText('Popover content')).not.toBeNull();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('keeps the htmlType of a Button child with asChild', () => {
      const { getByRole } = renderCUI(
        <Popover>
          <Popover.Trigger asChild>
            <Button
              label="Save"
              htmlType="submit"
            />
          </Popover.Trigger>
        </Popover>
      );
      expect(getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'submit');
    });

    it.each([
      ['a native button', <button>Save</button>],
      ['a Button', <Button label="Save" />],
    ])("passes the trigger's type to %s child with asChild", (_name, child) => {
      const { getByRole } = renderCUI(
        <Popover>
          <Popover.Trigger
            asChild
            type="submit"
          >
            {child}
          </Popover.Trigger>
        </Popover>
      );
      expect(getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'submit');
    });

    it('keeps the wrapper element as the trigger without asChild', () => {
      const { getByText } = renderCUI(
        <Popover>
          <Popover.Trigger data-testid="wrapper-trigger">Click Here</Popover.Trigger>
        </Popover>
      );
      const wrapper = getByText('Click Here');

      expect(wrapper.tagName).toBe('DIV');
      expect(wrapper).toHaveAttribute('aria-haspopup', 'dialog');
      expect(wrapper).toHaveAttribute('data-testid', 'wrapper-trigger');
    });

    it('keeps the button around the wrapper element with asChild={false}', () => {
      const { getByRole, getByText } = renderCUI(
        <Popover>
          <Popover.Trigger asChild={false}>Click Here</Popover.Trigger>
        </Popover>
      );
      const trigger = getByRole('button', { name: 'Click Here' });

      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(getByText('Click Here').parentElement).toBe(trigger);
    });
  });
});
