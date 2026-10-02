import { act, fireEvent, waitFor } from '@testing-library/react';
import { renderCUI } from '@/utils/test-utils';
import { useIsTruncated } from './useIsTruncated';

const CHAR_WIDTH = 10;
let containerWidth = 100;

class FakeResizeObserver {
  static instances: FakeResizeObserver[] = [];
  active = true;
  constructor(private callback: ResizeObserverCallback) {
    FakeResizeObserver.instances.push(this);
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn(() => {
    this.active = false;
  });
  trigger() {
    if (this.active) {
      this.callback([], this as unknown as ResizeObserver);
    }
  }
}

const resizeTo = (width: number) => {
  containerWidth = width;
  act(() => FakeResizeObserver.instances.forEach(observer => observer.trigger()));
};

const Probe = ({ text, enabled }: { text: string; enabled?: boolean }) => {
  const { ref, isTruncated } = useIsTruncated<HTMLSpanElement>({ enabled });
  return (
    <span
      ref={ref}
      data-testid="probe"
      data-truncated={isTruncated}
    >
      {text}
    </span>
  );
};

describe('useIsTruncated', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
      configurable: true,
      get(this: HTMLElement) {
        return (this.textContent ?? '').length * CHAR_WIDTH;
      },
    });
    Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
      configurable: true,
      get: () => containerWidth,
    });
  });

  afterAll(() => {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollWidth');
    Reflect.deleteProperty(HTMLElement.prototype, 'clientWidth');
  });

  beforeEach(() => {
    containerWidth = 100;
    FakeResizeObserver.instances = [];
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reports false when the text fits', () => {
    const { getByTestId } = renderCUI(<Probe text="short" />);
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'false');
  });

  it('reports true when the text is wider than the element', () => {
    const { getByTestId } = renderCUI(<Probe text="a text longer than ten chars" />);
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'true');
  });

  it('re-measures when the element resizes', () => {
    const { getByTestId } = renderCUI(<Probe text="fifteen chars.." />);
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'true');

    resizeTo(1000);
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'false');

    resizeTo(100);
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'true');
  });

  it('re-measures when the text changes without a resize', async () => {
    const { getByTestId, rerender } = renderCUI(<Probe text="short" />);
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'false');

    rerender(<Probe text="a text longer than ten chars" />);
    await waitFor(() =>
      expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'true')
    );
  });

  it('does not observe or measure when disabled', () => {
    let mutationObservers = 0;
    class CountingMutationObserver extends MutationObserver {
      constructor(callback: MutationCallback) {
        super(callback);
        mutationObservers += 1;
      }
    }
    vi.stubGlobal('MutationObserver', CountingMutationObserver);

    const { getByTestId } = renderCUI(
      <Probe
        text="a text longer than ten chars"
        enabled={false}
      />
    );

    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'false');
    expect(FakeResizeObserver.instances).toHaveLength(0);
    expect(mutationObservers).toBe(0);
  });

  it('disconnects its observer on unmount', () => {
    const { unmount } = renderCUI(<Probe text="short" />);
    const [observer] = FakeResizeObserver.instances;
    expect(observer.observe).toHaveBeenCalledTimes(1);

    unmount();
    expect(observer.disconnect).toHaveBeenCalled();
  });

  it('falls back to window resize without ResizeObserver', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    const { getByTestId } = renderCUI(<Probe text="fifteen chars.." />);
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'true');

    containerWidth = 1000;
    act(() => {
      fireEvent(window, new Event('resize'));
    });
    expect(getByTestId('probe')).toHaveAttribute('data-truncated', 'false');
  });
});
