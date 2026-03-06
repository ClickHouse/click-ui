import { screen } from '@testing-library/react';
import { DialogProps } from '@radix-ui/react-dialog';
import { Dialog } from '@/components/Dialog';
import { fireEvent } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';

describe('Dialog Component', () => {
  const renderDialog = (props: DialogProps) =>
    renderCUI(
      <Dialog {...props}>
        <Dialog.Trigger>
          <div>Open Dialog</div>
        </Dialog.Trigger>
        <Dialog.Close label="Close" />
        <Dialog.Content title="Test Dialog">Test Content</Dialog.Content>
      </Dialog>
    );

  it('renders the dialog content with title', () => {
    const { getByText } = renderDialog({});
    const dialogTrigger = getByText('Open Dialog');
    expect(dialogTrigger).not.toBeNull();
    fireEvent.click(dialogTrigger);

    const dialogTitle = screen.getByText('Test Dialog');
    const dialogContent = screen.getByText('Test Content');

    expect(dialogTitle).toBeTruthy();
    expect(dialogContent).toBeTruthy();
  });

  it('closes the dialog when close button is clicked', () => {
    const { getByText } = renderDialog({});
    const dialogTrigger = getByText('Open Dialog');
    expect(dialogTrigger).not.toBeNull();
    fireEvent.click(dialogTrigger);

    const DialogClose = screen.getByText('Close');
    fireEvent.click(DialogClose);

    const dialogTitle = screen.queryByText('Test Dialog');
    const dialogContent = screen.queryByText('Test Content');

    expect(dialogTitle).toBeFalsy();
    expect(dialogContent).toBeFalsy();
  });

  it('renders the dialog with no title', () => {
    renderCUI(
      <Dialog>
        <Dialog.Trigger>
          <div>Open Dialog</div>
        </Dialog.Trigger>
        <Dialog.Content>Test Content</Dialog.Content>
      </Dialog>
    );
    const dialogTrigger = screen.getByText('Open Dialog');
    fireEvent.click(dialogTrigger);
    expect(screen.queryByText('Test Dialog')).toBeFalsy();
    expect(screen.getByText('Test Content')).toBeTruthy();
  });

  it('renders the dialog with no title and showClose false', () => {
    renderCUI(
      <Dialog>
        <Dialog.Trigger>
          <div>Open Dialog</div>
        </Dialog.Trigger>
        <Dialog.Content showClose={false}>Test Content</Dialog.Content>
      </Dialog>
    );
    const dialogTrigger = screen.getByText('Open Dialog');
    fireEvent.click(dialogTrigger);
    expect(screen.queryByText('Test Dialog')).toBeFalsy();
    expect(screen.getByText('Test Content')).toBeTruthy();
    // Should not render close button
    expect(screen.queryByRole('button', { name: /close/i })).toBeFalsy();
  });

  it('renders the dialog with reducePadding set to true', () => {
    renderCUI(
      <Dialog>
        <Dialog.Trigger>
          <div>Open Dialog</div>
        </Dialog.Trigger>
        <Dialog.Content
          reducePadding={true}
          title="Test Dialog"
        >
          Test Content
        </Dialog.Content>
      </Dialog>
    );
    const dialogTrigger = screen.getByText('Open Dialog');
    fireEvent.click(dialogTrigger);
    expect(screen.getByText('Test Dialog')).toBeTruthy();
    expect(screen.getByText('Test Content')).toBeTruthy();
    // Padding is not directly testable, but component should render as normal
  });
});
