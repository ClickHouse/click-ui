import { Alert, AlertProps, WarningAlert } from '@/components/Alert';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderCUI } from '@/utils/test-utils';
import styles from './Alert.module.css';

describe('Alert', () => {
  const renderAlert = (props: AlertProps) => renderCUI(<Alert {...props} />);

  const withExactText = (value: string) => (_content: string, node: Element | null) =>
    Boolean(
      node &&
      node.textContent === value &&
      Array.from(node.children).every(child => child.textContent !== value)
    );

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

  it('does not forward preserveLineBreaks onto the root element', () => {
    const { getByTestId } = renderAlert({
      text: 'body',
      preserveLineBreaks: true,
    });

    const root = getByTestId('click-alert');
    expect(root).not.toHaveAttribute('preserveLineBreaks');
    expect(root).not.toHaveAttribute('preservelinebreaks');
  });

  it('does not apply pre-wrap to string text or title by default', () => {
    const { getByText } = renderAlert({
      title: 'Title line 1\nTitle line 2',
      text: 'line 1\nline 2',
    });

    const title = getByText(withExactText('Title line 1\nTitle line 2'));
    const body = getByText(withExactText('line 1\nline 2'));

    expect(title.tagName).toBe('H6');
    expect(title.className).not.toContain('pre-wrap');
    expect(body).not.toHaveClass(styles['alert__text_pre-wrap']);
  });

  it('preserves line breaks in string text and keeps the title on one line', () => {
    const { getByText } = renderAlert({
      title: 'Title line 1\nTitle line 2',
      text: 'line 1\nline 2',
      preserveLineBreaks: true,
    });

    const title = getByText(withExactText('Title line 1\nTitle line 2'));
    const body = getByText(withExactText('line 1\nline 2'));

    expect(title.tagName).toBe('H6');
    expect(title.className).not.toContain('pre-wrap');
    expect(body).toHaveClass(styles['alert__text_pre-wrap']);
  });

  it('preserves line breaks on WarningAlert when preserveLineBreaks is true', () => {
    const { getByText } = renderCUI(
      <WarningAlert
        text={'line 1\nline 2'}
        preserveLineBreaks
      />
    );
    const body = getByText(withExactText('line 1\nline 2'));

    expect(body).toHaveClass(styles['alert__text_pre-wrap']);
  });

  it('does not apply pre-wrap to ReactNode text or title when preserveLineBreaks is true', () => {
    const { getByText } = renderAlert({
      title: <span>Title node</span>,
      text: <span>{'line 1\nline 2'}</span>,
      preserveLineBreaks: true,
    });

    const title = getByText('Title node');
    const body = getByText(withExactText('line 1\nline 2'));

    expect(title.tagName).toBe('SPAN');
    expect(title.parentElement?.className ?? '').not.toContain('pre-wrap');
    expect(body.tagName).toBe('SPAN');
    expect(body.parentElement).not.toHaveClass(styles['alert__text_pre-wrap']);
  });
});
