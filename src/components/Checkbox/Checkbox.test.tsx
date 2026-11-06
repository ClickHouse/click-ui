import { fireEvent } from '@testing-library/react';
import { Checkbox } from '@/components/Checkbox';
import { CheckboxProps } from '@/components/Checkbox';
import { renderCUI } from '@/utils/test-utils';

describe('Checkbox', () => {
  const renderCheckbox = (props: CheckboxProps) => renderCUI(<Checkbox {...props} />);

  it('should execute action on click', () => {
    let counter = 0;
    const handleClick = () => counter++;
    const { getByTestId } = renderCheckbox({
      onCheckedChange: handleClick,
      label: 'Accept terms and conditions',
    });
    const checkbox = getByTestId('checkbox');
    fireEvent.click(checkbox);

    expect(counter).toEqual(1);
  });

  it('should not execute action on click if the checkbox is disabled', () => {
    let counter = 0;
    const handleClick = () => counter++;
    const { getByTestId } = renderCheckbox({
      onCheckedChange: handleClick,
      label: 'Accept terms and conditions',
      disabled: true,
    });

    const checkbox = getByTestId('checkbox');

    // The disabled cursor is asserted via the visual-regression spec in
    // tests/forms/checkbox.spec.ts. jsdom does not compute styles from
    // imported CSS Modules, so we check the semantic disabled state here
    // and rely on Playwright snapshots for the rendered `cursor: not-allowed`.
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute('data-disabled');

    fireEvent.click(checkbox);

    expect(counter).toEqual(0);
  });

  describe('accessible name', () => {
    it('is the string label', () => {
      const { getByRole } = renderCheckbox({ label: 'Accept terms' });
      expect(getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
    });

    it('is the text of a JSX label', () => {
      const { getByRole } = renderCheckbox({
        label: (
          <span>
            Accept <strong>terms</strong>
          </span>
        ),
      });
      expect(getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
    });

    it('is the consumer aria-label when one is passed', () => {
      const { getByRole } = renderCheckbox({
        label: 'Accept terms',
        'aria-label': 'Accept the terms of service',
      });
      expect(
        getByRole('checkbox', { name: 'Accept the terms of service' })
      ).toBeInTheDocument();
    });

    it('is the consumer aria-labelledby target when one is passed', () => {
      const { getByRole } = renderCUI(
        <>
          <span id="external-label">Terms of service</span>
          <Checkbox
            label="Accept terms"
            aria-labelledby="external-label"
          />
        </>
      );
      expect(getByRole('checkbox', { name: 'Terms of service' })).toBeInTheDocument();
    });

    it('is not set from a missing label', () => {
      const { getByRole } = renderCheckbox({});
      const checkbox = getByRole('checkbox');
      expect(checkbox).not.toHaveAttribute('aria-label');
      expect(checkbox).toHaveAccessibleName('');
    });

    it.each([true, 'indeterminate'] as const)(
      'does not take the check icon name when checked is %s and there is no label',
      checked => {
        const { getByRole } = renderCheckbox({ checked });
        expect(getByRole('checkbox')).toHaveAccessibleName('');
      }
    );

    it('keeps the label as the name when checked', () => {
      const { getByRole } = renderCheckbox({ label: 'Accept terms', checked: true });
      expect(getByRole('checkbox')).toHaveAccessibleName('Accept terms');
    });
  });
});
