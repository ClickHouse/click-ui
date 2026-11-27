import { createRef, useState } from 'react';
import { fireEvent } from '@testing-library/react';
import { PasswordField } from '@/components/PasswordField';
import { renderCUI } from '@/utils/test-utils';

const ControlledPasswordField = ({ initialValue = '' }: { initialValue?: string }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <PasswordField
      label="Password"
      value={value}
      onChange={setValue}
    />
  );
};

describe('PasswordField', () => {
  it('renders a masked input associated with its label', () => {
    const { getByLabelText } = renderCUI(
      <PasswordField
        label="Password"
        onChange={vi.fn()}
      />
    );
    const input = getByLabelText('Password');

    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange with the typed value and the event', () => {
    const onChange = vi.fn();
    const { getByLabelText } = renderCUI(
      <PasswordField
        label="Password"
        onChange={onChange}
      />
    );

    fireEvent.change(getByLabelText('Password'), { target: { value: 'hunter2' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('hunter2', expect.anything());
  });

  it('does not show the visibility toggle while the field is empty', () => {
    const { queryByRole } = renderCUI(
      <PasswordField
        label="Password"
        onChange={vi.fn()}
      />
    );

    expect(queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows the visibility toggle once the field has a value', () => {
    const { getByRole } = renderCUI(<ControlledPasswordField initialValue="secret" />);

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('reveals and hides the password when the toggle is clicked', () => {
    const { getByRole, getByLabelText } = renderCUI(
      <ControlledPasswordField initialValue="secret" />
    );
    const input = getByLabelText('Password');
    const toggle = getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggle);
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveValue('secret');

    fireEvent.click(toggle);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('shows the toggle after typing into an empty field', () => {
    const { getByLabelText, queryByRole } = renderCUI(<ControlledPasswordField />);

    expect(queryByRole('button')).not.toBeInTheDocument();

    fireEvent.change(getByLabelText('Password'), { target: { value: 'a' } });

    expect(queryByRole('button')).toBeInTheDocument();
  });

  it('disables the input and the toggle when disabled', () => {
    const { getByRole, getByLabelText } = renderCUI(
      <PasswordField
        label="Password"
        value="secret"
        disabled
        onChange={vi.fn()}
      />
    );

    expect(getByLabelText('Password')).toBeDisabled();
    expect(getByRole('button')).toBeDisabled();
  });

  it('forwards the ref to the input', () => {
    const ref = createRef<HTMLInputElement>();
    const { getByLabelText } = renderCUI(
      <PasswordField
        label="Password"
        onChange={vi.fn()}
        ref={ref}
      />
    );

    expect(ref.current).toBe(getByLabelText('Password'));
  });

  it('passes native input attributes through to the input', () => {
    const { getByLabelText } = renderCUI(
      <PasswordField
        label="Password"
        onChange={vi.fn()}
        placeholder="Enter a password"
        autoComplete="new-password"
      />
    );
    const input = getByLabelText('Password');

    expect(input).toHaveAttribute('placeholder', 'Enter a password');
    expect(input).toHaveAttribute('autocomplete', 'new-password');
  });
});
