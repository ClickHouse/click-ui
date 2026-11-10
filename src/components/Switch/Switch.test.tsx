import { fireEvent } from '@testing-library/react';
import { Switch, SwitchProps } from '@/components/Switch';
import { renderCUI } from '@/utils/test-utils';

describe('Switch', () => {
  const renderSwitch = (props: Partial<SwitchProps>) =>
    renderCUI(
      <Switch
        checked={false}
        {...props}
      />
    );

  it('calls onCheckedChange with the new state on click', () => {
    const handleCheckedChange = vi.fn();
    const { getByRole } = renderSwitch({
      label: 'Dark mode',
      onCheckedChange: handleCheckedChange,
    });

    fireEvent.click(getByRole('switch', { name: 'Dark mode' }));

    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  describe('accessible name', () => {
    it('is the string label', () => {
      const { getByRole } = renderSwitch({ label: 'Dark mode' });
      expect(getByRole('switch', { name: 'Dark mode' })).toBeInTheDocument();
    });

    it('is the text of a JSX label', () => {
      const { getByRole } = renderSwitch({
        label: (
          <span>
            Dark <strong>mode</strong>
          </span>
        ),
      });
      expect(getByRole('switch', { name: 'Dark mode' })).toBeInTheDocument();
    });

    it('is the consumer aria-label when one is passed', () => {
      const { getByRole } = renderSwitch({
        label: 'Dark mode',
        'aria-label': 'Use the dark theme',
      });
      expect(getByRole('switch', { name: 'Use the dark theme' })).toBeInTheDocument();
    });

    it('is the consumer aria-labelledby target when one is passed', () => {
      const { getByRole } = renderCUI(
        <>
          <span id="external-label">Theme</span>
          <Switch
            checked={false}
            label="Dark mode"
            aria-labelledby="external-label"
          />
        </>
      );
      expect(getByRole('switch', { name: 'Theme' })).toBeInTheDocument();
    });

    it('is not set from a missing label', () => {
      const { getByRole } = renderSwitch({});
      const toggle = getByRole('switch');
      expect(toggle).not.toHaveAttribute('aria-label');
      expect(toggle).toHaveAccessibleName('');
    });
  });
});
