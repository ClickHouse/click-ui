import { fireEvent } from '@testing-library/react';
import { TextAreaField } from '@/components/TextAreaField';
import { renderCUI } from '@/utils/test-utils';

describe('TextAreaField', () => {
  it('calls onChange when the value changes', () => {
    const onChange = vi.fn();
    const { getByRole } = renderCUI(<TextAreaField onChange={onChange} />);

    fireEvent.change(getByRole('textbox'), {
      target: { value: 'updated value' },
    });

    expect(onChange).toHaveBeenCalledWith('updated value', expect.any(Object));
  });

  it('keeps native onInput separate from the value change callback', () => {
    const onChange = vi.fn();
    const onInput = vi.fn();
    const { getByRole } = renderCUI(
      <TextAreaField
        onChange={onChange}
        onInput={onInput}
      />
    );

    fireEvent.input(getByRole('textbox'), {
      target: { value: 'updated value' },
    });

    expect(onInput).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('updated value', expect.any(Object));
  });
});
