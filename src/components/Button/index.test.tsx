import { Button, ButtonProps } from '@/components/Button';
import { fireEvent } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';

describe('Button', () => {
  const renderButton = (props: ButtonProps) => renderCUI(<Button {...props} />);

  it('should render the button', () => {
    const { getByText } = renderButton({ children: 'Hello' });
    expect(getByText('Hello').textContent).toBe('Hello');
  });

  it('should execute action on click', () => {
    let counter = 0;
    const handleClick = () => (counter = 1);
    const { getByText } = renderButton({
      onClick: handleClick,
      label: 'Button',
    });
    const button = getByText('Button');
    button.focus();
    fireEvent.click(button);

    expect(counter).toEqual(1);
  });

  it('should not execute action when disabled', () => {
    let counter = 0;
    const handleClick = () => (counter = 1);
    const { getByRole } = renderButton({
      onClick: handleClick,
      label: 'Button',
      disabled: true,
    });
    const button = getByRole('button');
    fireEvent.click(button);

    expect(counter).toEqual(0);
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  describe('Loading state', () => {
    it('should have aria-disabled when loading', () => {
      const { getByRole } = renderButton({
        label: 'Button',
        loading: true,
      });
      const button = getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should not execute onClick when loading', () => {
      let counter = 0;
      const handleClick = () => (counter = 1);
      const { getByRole } = renderButton({
        onClick: handleClick,
        label: 'Button',
        loading: true,
      });
      const button = getByRole('button');
      fireEvent.click(button);

      expect(counter).toEqual(0);
    });

    it('should still render the label when loading', () => {
      const { getByText } = renderButton({
        label: 'Loading Button',
        loading: true,
      });

      expect(getByText('Loading Button')).toBeInTheDocument();
    });

    it('should render loading state for primary button type', () => {
      const { getByRole } = renderButton({
        label: 'Button',
        type: 'primary',
        loading: true,
      });
      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should render loading state for secondary button type', () => {
      const { getByRole } = renderButton({
        label: 'Button',
        type: 'secondary',
        loading: true,
      });
      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should render loading state for danger button type', () => {
      const { getByRole } = renderButton({
        label: 'Button',
        type: 'danger',
        loading: true,
      });
      const button = getByRole('button');

      expect(button).toBeDisabled();
    });

    it('should render loading state for empty button type', () => {
      const { getByRole } = renderButton({
        label: 'Button',
        type: 'empty',
        loading: true,
      });
      const button = getByRole('button');

      expect(button).toBeDisabled();
    });
  });
});
