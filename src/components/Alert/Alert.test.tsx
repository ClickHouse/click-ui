import { Alert, AlertProps } from '@/components/Alert';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderCUI } from '@/utils/test-utils';

describe('Alert', () => {
  const renderAlert = (props: AlertProps) => renderCUI(<Alert {...props} />);

  it('renders the dismiss button with type="button" so it does not submit a form', () => {
    const handleSubmit = vi.fn(e => e.preventDefault());
    const { getByTestId } = renderCUI(
      <form onSubmit={handleSubmit}>
        <Alert
          text="In a form"
          dismissible
        />
      </form>
    );

    const dismissButton = getByTestId('click-alert-dismiss-button');
    expect(dismissButton).toHaveAttribute('type', 'button');

    fireEvent.click(dismissButton);
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('renders a dismissible banner with a single, named dismiss button', () => {
    const { getAllByRole } = renderAlert({
      text: 'Banner alert',
      type: 'banner',
      dismissible: true,
    });

    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveAccessibleName('close');
  });

  it('forwards a consumer className onto the root element (does not overwrite it)', () => {
    const { getByTestId } = renderAlert({
      text: 'With custom class',
      className: 'custom-class',
    });

    const root = getByTestId('click-alert');
    expect(root).toHaveClass('custom-class');
    // the component's own base class must still be present alongside it
    expect(root.className).not.toBe('custom-class');
  });

  it('given a dismissible alert, should not be visible after dismissing it', async () => {
    const text = 'Test alert component';
    const { queryAllByText, getByTestId } = renderAlert({
      text,
      dismissible: true,
    });

    expect(queryAllByText(text).length).toEqual(1);

    const dismissButton = getByTestId('click-alert-dismiss-button');
    userEvent.click(dismissButton);
    await waitFor(() => expect(queryAllByText(text).length).toEqual(0));
  });
});
