import { act } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';
import { Toast } from '@/components/Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      // Don't fake `setImmediate` / `queueMicrotask`, otherwise React's
      // scheduler / styled-components batching can hang.
      toFake: ['setTimeout', 'clearTimeout', 'Date'],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('auto-closes after the configured duration', () => {
    const onClose = vi.fn();
    renderCUI(
      <Toast
        title="hello"
        duration={3000}
        onClose={onClose}
      />
    );

    expect(onClose).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it('clears the auto-close timer when the toast unmounts (regression for radix-ui/primitives#3703)', () => {
    const onClose = vi.fn();
    const { unmount } = renderCUI(
      <Toast
        title="hello"
        duration={5000}
        onClose={onClose}
      />
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onClose).not.toHaveBeenCalled();

    unmount();

    // No pending timers must remain after unmount. Radix v1.2.2 leaks its
    // internal `closeTimerRef` (the auto-close `setTimeout`) here because it
    // never `clearTimeout`s it on unmount. The leftover timer later fires
    // after vitest tears down jsdom and calls `handleClose`, which accesses
    // `document.activeElement` -- producing
    // `ReferenceError: document is not defined` and aborting the whole test
    // file. We side-step this by passing `duration={Infinity}` to Radix and
    // owning the timer in click-ui itself with a cleanup effect.
    expect(vi.getTimerCount()).toBe(0);

    // And nothing left behind should be able to invoke our `onClose` later.
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not auto-close when duration is Infinity', () => {
    const onClose = vi.fn();
    renderCUI(
      <Toast
        title="hello"
        duration={Infinity}
        onClose={onClose}
      />
    );

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});
