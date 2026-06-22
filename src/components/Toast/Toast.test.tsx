import { useEffect } from 'react';
import { act, render } from '@testing-library/react';
import { useToast } from '@/hooks/useToast';
import { ClickUIProvider } from '@/providers';
import { renderCUI } from '@/utils/test-utils';
import { Toast } from '@/components/Toast';
import type { ToastProviderProps } from '@/components/Toast';

// `ClickUIProvider` already nests `ToastProvider` and forwards `config.toast`,
// so we render directly into that to exercise the full
// `ToastProvider` -> `Toast` integration path (including provider-level
// defaults like `duration`).
const renderInToastProvider = (
  ui: React.ReactNode,
  providerProps: Omit<ToastProviderProps, 'children'> = {}
) =>
  render(
    <ClickUIProvider
      theme="dark"
      config={{ toast: providerProps, tooltip: { delayDuration: 0 } }}
      persistTheme={false}
    >
      {ui}
    </ClickUIProvider>
  );

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

  it('does not leak the auto-close timer past unmount (regression for radix-ui/primitives#3703)', () => {
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

    // Simulate the post-unmount + post-jsdom-teardown environment: any
    // subsequent access to `document.activeElement` would normally throw
    // `ReferenceError: document is not defined`. Here we stub the getter so
    // that an access flips a boolean we can assert against. If Radix's
    // internal close timer leaks past unmount (radix-ui/primitives#3703,
    // still present in 1.2.17), `handleClose` will fire after unmount and
    // dereference `document.activeElement`, tripping the stub. With this
    // PR's fix, we own the timer ourselves and clear it from the unmount
    // cleanup, so no Radix `handleClose` ever runs post-unmount.
    const originalDescriptor = Object.getOwnPropertyDescriptor(
      Document.prototype,
      'activeElement'
    );
    if (!originalDescriptor) {
      throw new Error('Expected Document.prototype.activeElement descriptor');
    }
    let leakedDocumentAccess = false;
    Object.defineProperty(Document.prototype, 'activeElement', {
      configurable: true,
      get: () => {
        leakedDocumentAccess = true;
        return null;
      },
    });
    try {
      act(() => {
        vi.advanceTimersByTime(60_000);
      });
    } finally {
      Object.defineProperty(Document.prototype, 'activeElement', originalDescriptor);
    }
    expect(leakedDocumentAccess).toBe(false);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not reset the auto-close timer when the parent re-renders with a new onClose identity', () => {
    // Regression for: in ToastProvider, `onClose={onClose(id)}` produces a
    // fresh function on every provider render. Without a stable callback ref
    // inside Toast, every provider update (e.g. another toast appearing)
    // would restart the countdown from the full duration, so a toast could
    // be kept alive indefinitely by a frequently-rerendering parent.
    const onClose1 = vi.fn();
    const onClose2 = vi.fn();
    const { rerender } = renderCUI(
      <Toast
        title="hello"
        duration={1000}
        onClose={onClose1}
      />
    );

    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(onClose1).not.toHaveBeenCalled();

    rerender(
      <Toast
        title="hello"
        duration={1000}
        onClose={onClose2}
      />
    );

    // Total elapsed since mount = 1100ms > original duration of 1000ms.
    // If the timer was reset on re-render, no onClose would have fired yet
    // (only 500ms of a fresh 1000ms countdown would have elapsed).
    act(() => {
      vi.advanceTimersByTime(500);
    });
    // The latest onClose must have been invoked exactly once.
    expect(onClose2).toHaveBeenCalledTimes(1);
    expect(onClose2).toHaveBeenCalledWith(false);
    // And the original onClose -- which is no longer the prop -- must not
    // have been invoked.
    expect(onClose1).not.toHaveBeenCalled();
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

  it('falls back to the provider-level duration when a toast does not set its own', () => {
    // Regression: before this PR, an unset `ToastProps.duration` let Radix's
    // `ToastProvider duration` (the default for every toast) take effect.
    // After moving the timer into click-ui's wrapper, we must keep the same
    // resolution order: prop > provider > built-in default.
    const onCreated = vi.fn();
    const TriggerWithSpy = () => {
      const { createToast } = useToast();
      useEffect(() => {
        createToast({ title: 'hello' });
        onCreated();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      return null;
    };

    renderInToastProvider(<TriggerWithSpy />, { duration: 2000 });
    expect(onCreated).toHaveBeenCalledTimes(1);

    // The toast was created with no explicit `duration`, so it should pick
    // up the provider's 2000 ms and not the built-in 5000 ms default.
    act(() => {
      vi.advanceTimersByTime(1999);
    });
    // The DOM should still have the toast.
    expect(document.querySelector('[role="status"]')).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(2);
    });
    // After 2001 ms total the provider-level deadline has elapsed and the
    // toast should have been removed from the provider's state, which
    // unmounts it from the DOM.
    expect(document.querySelector('[role="status"]')).toBeNull();
  });

  it('closes immediately on resume when the auto-close deadline elapsed during a pause', () => {
    // Regression for: if `handlePause` runs after the auto-close deadline
    // has already passed (event-loop delay / throttling beat Radix's
    // close-timer to the punch), remaining time clamps to 0 and a naive
    // `handleResume` -> `startCloseTimer(0)` would short-circuit, leaving
    // the toast open forever.
    const onClose = vi.fn();
    // Use renderCUI so we get a real `Viewport` (which is what Radix's
    // window-blur listener dispatches `toast.viewportPause` against).
    renderCUI(
      <Toast
        title="hello"
        duration={100}
        onClose={onClose}
      />
    );

    // Advance the wall clock past the deadline WITHOUT draining the fake
    // timer queue, so the close-timer hasn't run yet but `Date.now()`
    // reports an elapsed time greater than `duration`.
    act(() => {
      vi.setSystemTime(Date.now() + 500);
    });
    expect(onClose).not.toHaveBeenCalled();

    // Simulate Radix's viewport-level pause/resume. Radix's outer
    // `<div role="region">` wraps the actual viewport `<ol>`; the
    // `VIEWPORT_PAUSE`/`VIEWPORT_RESUME` custom events are dispatched on the
    // inner `<ol>` (that's what `ToastImpl` listens on), not the wrapper.
    const viewport = document.querySelector('[role="region"] > ol');
    if (!viewport) {
      throw new Error('Expected Radix Toast viewport <ol> to be in the DOM');
    }
    act(() => {
      viewport.dispatchEvent(new CustomEvent('toast.viewportPause'));
    });
    // Pause cleared the timer, but the deadline already elapsed -> remaining = 0.
    act(() => {
      viewport.dispatchEvent(new CustomEvent('toast.viewportResume'));
    });

    // Without the fix, onClose would never be invoked. With the fix, resume
    // detects `remaining <= 0` after a real pause and closes immediately.
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledWith(false);
  });
});
