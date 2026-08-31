import { screen, fireEvent } from '@testing-library/react';
import { Dialog } from '@/components/Dialog';
import { renderCUI } from '@/utils/test-utils';
import { useToast } from '@/hooks/useToast';

const ToastTrigger = () => {
  const { createToast } = useToast();
  return (
    <button onClick={() => createToast({ title: 'Toast title', duration: 100000 })}>
      Make toast
    </button>
  );
};

const isHiddenFromAccessibilityTree = (node: Element | null) => {
  expect(node).not.toBeNull();
  for (let el = node; el; el = el.parentElement) {
    if (el.getAttribute('aria-hidden') === 'true') {
      return true;
    }
  }
  return false;
};

const openToast = () => {
  fireEvent.click(screen.getByText('Make toast'));
  return screen.getByText('Toast title');
};

describe('Toast', () => {
  const renderWithModal = () =>
    renderCUI(
      <>
        <ToastTrigger />
        <Dialog>
          <Dialog.Trigger>
            <div>Open Dialog</div>
          </Dialog.Trigger>
          <Dialog.Content title="Modal">Modal body</Dialog.Content>
        </Dialog>
      </>
    );

  it('stays in the accessibility tree when a modal opens over it', () => {
    renderWithModal();
    const toast = openToast();
    fireEvent.click(screen.getByText('Open Dialog'));

    expect(screen.getByText('Modal body')).toBeTruthy();
    expect(isHiddenFromAccessibilityTree(toast)).toBe(false);
  });

  it('stays in the accessibility tree when raised while a modal is open', () => {
    renderWithModal();
    fireEvent.click(screen.getByText('Open Dialog'));
    const toast = openToast();

    expect(screen.getByText('Modal body')).toBeTruthy();
    expect(isHiddenFromAccessibilityTree(toast)).toBe(false);
  });
});
