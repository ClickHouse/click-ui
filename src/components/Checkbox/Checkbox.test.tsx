import { fireEvent } from '@testing-library/react';
import { Checkbox } from '@/components/Checkbox/Checkbox';
import { CheckboxProps } from '@/components/Checkbox/Checkbox';
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

    const computedStyle = window.getComputedStyle(checkbox);
    expect(computedStyle.cursor).toBe('not-allowed');

    fireEvent.click(checkbox);

    expect(counter).toEqual(0);
  });
});
