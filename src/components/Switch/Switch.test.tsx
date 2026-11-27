import { createRef } from 'react';
import { fireEvent } from '@testing-library/react';
import { Switch } from '@/components/Switch';
import { renderCUI } from '@/utils/test-utils';

describe('Switch', () => {
  it('renders a switch named by its label', () => {
    const { getByRole } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
      />
    );

    expect(getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('reflects the checked prop in aria-checked', () => {
    const { getByRole, rerender } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
      />
    );
    expect(getByRole('switch')).toHaveAttribute('aria-checked', 'false');

    rerender(
      <Switch
        label="Notifications"
        checked
      />
    );
    expect(getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onCheckedChange with the next value when clicked', () => {
    const onCheckedChange = vi.fn();
    const { getByRole } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
        onCheckedChange={onCheckedChange}
      />
    );

    fireEvent.click(getByRole('switch'));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('toggles when the visible label is clicked', () => {
    const onCheckedChange = vi.fn();
    const { getByText } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
        onCheckedChange={onCheckedChange}
      />
    );

    fireEvent.click(getByText('Notifications'));

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    const { getByRole } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
        disabled
        onCheckedChange={onCheckedChange}
      />
    );
    const toggle = getByRole('switch');

    expect(toggle).toBeDisabled();
    fireEvent.click(toggle);

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it('uses a consumer-provided id for the control and its label', () => {
    const { getByRole, getByText } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
        id="notifications-switch"
      />
    );

    expect(getByRole('switch')).toHaveAttribute('id', 'notifications-switch');
    expect(getByText('Notifications')).toHaveAttribute('for', 'notifications-switch');
  });

  it('forwards the ref to the switch button', () => {
    const ref = createRef<HTMLButtonElement>();
    const { getByRole } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
        ref={ref}
      />
    );

    expect(ref.current).toBe(getByRole('switch'));
  });

  it('forwards data attributes and a custom class name to the switch', () => {
    const { getByRole } = renderCUI(
      <Switch
        label="Notifications"
        checked={false}
        className="custom"
        data-testid="my-switch"
      />
    );
    const toggle = getByRole('switch');

    expect(toggle).toHaveAttribute('data-testid', 'my-switch');
    expect(toggle).toHaveClass('custom');
  });
});
