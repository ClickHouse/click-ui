import { fireEvent } from '@testing-library/react';
import { RadioGroup } from '@/components/RadioGroup/RadioGroup';
import { RadioGroupProps } from './RadioGroup';
import { renderCUI } from '@/utils/test-utils';

describe('RadioGroup', () => {
  const renderRadioGroup = (props: RadioGroupProps) =>
    renderCUI(
      <RadioGroup
        inline
        {...props}
      >
        <RadioGroup.Item
          id="RadioButton1"
          label="Radio Button1"
          value="RadioButton1"
        />
        <RadioGroup.Item
          label="Radio Button2"
          value="RadioButton2"
          id="RadioButton2"
        />
        <RadioGroup.Item
          label="Radio Button3"
          value="RadioButton3"
          id="RadioButton3"
        />
      </RadioGroup>
    );

  it('should execute action on click', () => {
    const handleClick = vi.fn();
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
    });
    const radio = getByLabelText('Radio Button1');
    expect(radio.dataset.state).toBe('unchecked');
    fireEvent.click(radio);
    expect(radio.dataset.state).toBe('checked');
    expect(handleClick).toBeCalledTimes(1);
  });

  it('should not execute action on click if the radio is disabled', () => {
    const handleClick = vi.fn();
    const { getByLabelText } = renderRadioGroup({
      onValueChange: handleClick,
      disabled: true,
    });
    const radio = getByLabelText('Radio Button2');
    expect(radio.dataset.state).toBe('unchecked');
    expect(radio).not.toBeNull();
    fireEvent.click(radio);
    expect(radio.dataset.state).toBe('unchecked');
    expect(handleClick).toBeCalledTimes(0);
  });
});
