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
});
