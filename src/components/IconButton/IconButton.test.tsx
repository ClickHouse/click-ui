import { IconButton, IconButtonProps } from '@/components/IconButton';
import { fireEvent } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';

describe('Button', () => {
  const renderButton = (props: IconButtonProps) => renderCUI(<IconButton {...props} />);

  it('should render the button', () => {
    const { getAllByRole } = renderButton({ icon: 'user' });
    expect(getAllByRole('button').length).toEqual(1);
  });

  it('should execute action on click', () => {
    let counter = 0;
    const handleClick = () => (counter = 1);
    const { getByRole } = renderButton({
      onClick: handleClick,
      icon: 'user',
    });
    const button = getByRole('button');
    button.focus();
    fireEvent.click(button);

    expect(counter).toEqual(1);
  });

  it('should not execute action when disabled', () => {
    let counter = 0;
    const handleClick = () => (counter = 1);
    const { getByRole } = renderButton({
      onClick: handleClick,
      icon: 'user',
      disabled: true,
    });
    const button = getByRole('button');
    fireEvent.click(button);

    expect(counter).toEqual(0);
    expect(button).toBeDisabled();
  });

  describe('Button HTML types', () => {
    it('should default to type=button so it does not submit an enclosing form', () => {
      const handleSubmit = vi.fn();

      const { getByRole } = renderCUI(
        <form onSubmit={handleSubmit}>
          <IconButton icon="user" />
        </form>
      );

      const button = getByRole('button');

      expect(button).toHaveAttribute('type', 'button');
      fireEvent.click(button);
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should submit an enclosing form when htmlType="submit" is set explicitly', () => {
      const handleSubmit = vi.fn(e => e.preventDefault());

      const { getByRole } = renderCUI(
        <form onSubmit={handleSubmit}>
          <IconButton icon="user" htmlType="submit" />
        </form>
      );

      const button = getByRole('button');
      fireEvent.click(button);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it.each(['submit', 'button', 'reset'] as const)(
      'should use htmlType to set type=%s',
      type => {
        const { getByRole } = renderButton({ icon: 'user', htmlType: type });
        const button = getByRole('button');
        expect(button).toHaveAttribute('type', type);
      }
    );
  });
});
