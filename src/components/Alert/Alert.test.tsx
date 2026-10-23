import { Alert, AlertProps, WarningAlert } from '@/components/Alert';
import { act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderCUI } from '@/utils/test-utils';
import styles from './Alert.module.css';

const TOGGLE_RESERVED = 20;
const TOGGLE_TEST_ID = 'click-alert-toggle';

let contentHeight = 0;
let availableHeight = 0;
let frameQueue: FrameRequestCallback[] = [];

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

const hasToggle = (element: Element) =>
  element.parentElement?.querySelector(`[data-testid="${TOGGLE_TEST_ID}"]`) != null;

const flushFrames = () => {
  act(() => {
    const callbacks = frameQueue;
    frameQueue = [];
    callbacks.forEach(callback => callback(0));
  });
};

const resizeTo = (height: number) => {
  availableHeight = height;
  act(() => FakeResizeObserver.instances.forEach(observer => observer.trigger()));
  flushFrames();
};

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

  it('does not apply pre-wrap to string text by default', () => {
    const { getByText } = renderAlert({
      text: 'line 1\nline 2',
    });

    const body = getByText(withExactText('line 1\nline 2'));

    expect(body).not.toHaveClass(styles['alert__text_pre-wrap']);
  });

  it('preserves line breaks in string text when preserveLineBreaks is true', () => {
    const { getByText } = renderAlert({
      text: 'line 1\nline 2',
      preserveLineBreaks: true,
    });

    const body = getByText(withExactText('line 1\nline 2'));

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

  it('does not apply pre-wrap to ReactNode text when preserveLineBreaks is true', () => {
    const { getByText } = renderAlert({
      text: <span>{'line 1\nline 2'}</span>,
      preserveLineBreaks: true,
    });

    const body = getByText(withExactText('line 1\nline 2'));

    expect(body.tagName).toBe('SPAN');
    expect(body.parentElement).not.toHaveClass(styles['alert__text_pre-wrap']);
  });

  describe('maxHeight', () => {
    beforeAll(() => {
      Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
        configurable: true,
        get: () => contentHeight,
      });
      Object.defineProperty(HTMLElement.prototype, 'clientHeight', {
        configurable: true,
        get(this: HTMLElement) {
          return hasToggle(this)
            ? availableHeight - TOGGLE_RESERVED
            : Math.min(contentHeight, availableHeight);
        },
      });
    });

    afterAll(() => {
      Reflect.deleteProperty(HTMLElement.prototype, 'scrollHeight');
      Reflect.deleteProperty(HTMLElement.prototype, 'clientHeight');
    });

    beforeEach(() => {
      contentHeight = 40;
      availableHeight = 100;
      frameQueue = [];
      FakeResizeObserver.instances = [];
      vi.stubGlobal('ResizeObserver', FakeResizeObserver);
      vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
        frameQueue.push(callback);
        return frameQueue.length;
      });
      vi.stubGlobal('cancelAnimationFrame', vi.fn());
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element
      ) {
        const bottom =
          this.getAttribute('data-testid') === TOGGLE_TEST_ID ? TOGGLE_RESERVED : 0;
        return {
          bottom,
          top: bottom,
          left: 0,
          right: 0,
          width: 0,
          height: 0,
          x: 0,
          y: bottom,
          toJSON: () => ({}),
        };
      });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    });

    it('adds no styling, toggle or observers when maxHeight is not set', () => {
      contentHeight = 500;
      const onExpandedChange = vi.fn();
      const { getByTestId, queryByTestId } = renderAlert({
        text: 'plain',
        onExpandedChange,
      });

      const root = getByTestId('click-alert');
      expect(root).not.toHaveAttribute('style');
      expect(root).not.toHaveClass(styles['alert_max-height']);
      expect(queryByTestId(TOGGLE_TEST_ID)).not.toBeInTheDocument();
      expect(FakeResizeObserver.instances).toHaveLength(0);
      expect(onExpandedChange).not.toHaveBeenCalled();
    });

    it('converts a number maxHeight to px', () => {
      const { getByTestId } = renderAlert({ text: 'body', maxHeight: 120 });

      const root = getByTestId('click-alert');
      expect(root.style.getPropertyValue('--alert-max-height')).toBe('120px');
      expect(root).toHaveClass(styles['alert_max-height']);
    });

    it('passes a string maxHeight through as a CSS length', () => {
      const { getByTestId } = renderAlert({ text: 'body', maxHeight: '12lh' });

      expect(
        getByTestId('click-alert').style.getPropertyValue('--alert-max-height')
      ).toBe('12lh');
    });

    it('shows no toggle when the text fits', () => {
      contentHeight = 80;
      const { queryByRole } = renderAlert({ text: 'short', maxHeight: 100 });

      expect(queryByRole('button')).not.toBeInTheDocument();
    });

    it('shows a collapsed Show more toggle controlling the text when the text overflows', () => {
      contentHeight = 300;
      const { getByRole, getByText } = renderAlert({ text: 'long text', maxHeight: 100 });

      const toggle = getByRole('button', { name: 'Show more' });
      expect(toggle).toHaveAttribute('type', 'button');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      expect(toggle).toHaveAttribute('data-testid', TOGGLE_TEST_ID);
      expect(toggle).toHaveAttribute('aria-controls', getByText('long text').id);
      expect(getByText('long text').id).not.toBe('');
    });

    it('expands on click and reports it', () => {
      contentHeight = 300;
      const onExpandedChange = vi.fn();
      const { getByRole } = renderAlert({
        text: 'long text',
        maxHeight: 100,
        onExpandedChange,
      });

      fireEvent.click(getByRole('button', { name: 'Show more' }));

      const toggle = getByRole('button', { name: 'Show less' });
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(onExpandedChange).toHaveBeenCalledTimes(1);
      expect(onExpandedChange).toHaveBeenLastCalledWith(true);
    });

    it('collapses on a second click, scrolling the text back to the top', () => {
      contentHeight = 300;
      const onExpandedChange = vi.fn();
      const { getByRole, getByText } = renderAlert({
        text: 'long text',
        maxHeight: 100,
        onExpandedChange,
      });

      fireEvent.click(getByRole('button', { name: 'Show more' }));
      getByText('long text').scrollTop = 60;
      fireEvent.click(getByRole('button', { name: 'Show less' }));

      expect(getByRole('button', { name: 'Show more' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );
      expect(getByText('long text').scrollTop).toBe(0);
      expect(onExpandedChange).toHaveBeenCalledTimes(2);
      expect(onExpandedChange).toHaveBeenLastCalledWith(false);
    });

    it('keeps focus on the toggle after expanding and collapsing', async () => {
      contentHeight = 300;
      const user = userEvent.setup();
      const { getByRole } = renderAlert({ text: 'long text', maxHeight: 100 });

      await user.tab();
      expect(getByRole('button', { name: 'Show more' })).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(getByRole('button', { name: 'Show less' })).toHaveFocus();

      await user.keyboard(' ');
      expect(getByRole('button', { name: 'Show more' })).toHaveFocus();
    });

    it('uses custom labels for the toggle', () => {
      contentHeight = 300;
      const { getByRole } = renderAlert({
        text: 'long text',
        maxHeight: 100,
        expandLabel: 'Read more',
        collapseLabel: 'Read less',
      });

      fireEvent.click(getByRole('button', { name: 'Read more' }));
      expect(getByRole('button', { name: 'Read less' })).toBeInTheDocument();
    });

    it('shows and hides the toggle as the available height changes', () => {
      contentHeight = 150;
      const { queryByRole } = renderAlert({ text: 'long text', maxHeight: '100%' });
      expect(queryByRole('button', { name: 'Show more' })).toBeInTheDocument();

      resizeTo(400);
      expect(queryByRole('button')).not.toBeInTheDocument();

      resizeTo(100);
      expect(queryByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('does not keep the toggle stuck when the text only overflows because the toggle takes space', () => {
      contentHeight = 100;
      availableHeight = 90;
      const { queryByRole } = renderAlert({ text: 'long text', maxHeight: '100%' });
      expect(queryByRole('button', { name: 'Show more' })).toBeInTheDocument();

      resizeTo(105);
      expect(queryByRole('button')).not.toBeInTheDocument();

      resizeTo(90);
      expect(queryByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('treats a 1px overflow as fitting', () => {
      contentHeight = 101;
      const { queryByRole } = renderAlert({ text: 'text', maxHeight: '100%' });
      expect(queryByRole('button')).not.toBeInTheDocument();

      resizeTo(99);
      expect(queryByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('keeps the expanded state without calling back when the text starts to fit', () => {
      contentHeight = 150;
      const onExpandedChange = vi.fn();
      const { getByRole, queryByRole } = renderAlert({
        text: 'long text',
        maxHeight: '100%',
        onExpandedChange,
      });
      fireEvent.click(getByRole('button', { name: 'Show more' }));
      onExpandedChange.mockClear();

      resizeTo(400);
      expect(queryByRole('button')).not.toBeInTheDocument();

      resizeTo(100);
      expect(getByRole('button', { name: 'Show less' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(onExpandedChange).not.toHaveBeenCalled();
    });

    it('re-measures when the text changes', async () => {
      contentHeight = 40;
      const { queryByRole, rerender } = renderAlert({ text: 'short', maxHeight: 100 });
      expect(queryByRole('button')).not.toBeInTheDocument();

      contentHeight = 300;
      rerender(
        <Alert
          text="a much longer text"
          maxHeight={100}
        />
      );
      await waitFor(() => expect(frameQueue.length).toBeGreaterThan(0));
      flushFrames();

      expect(queryByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('measures on mount even without ResizeObserver', () => {
      vi.stubGlobal('ResizeObserver', undefined);
      contentHeight = 300;
      const { getByRole } = renderAlert({ text: 'long text', maxHeight: 100 });

      expect(getByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('fades the text while it is clipped or has more below, and not once it fits', () => {
      contentHeight = 300;
      const { getByText, getByRole, rerender } = renderAlert({
        text: 'long text',
        maxHeight: 100,
      });
      expect(getByText('long text')).not.toHaveClass(styles['alert__text_no-fade']);

      fireEvent.click(getByRole('button', { name: 'Show more' }));
      expect(getByText('long text')).toHaveClass(styles.alert__text_expanded);
      expect(getByText('long text')).not.toHaveClass(styles['alert__text_no-fade']);

      const text = getByText('long text');
      text.scrollTop = 220;
      fireEvent.scroll(text);
      flushFrames();
      expect(text).toHaveClass(styles['alert__text_no-fade']);

      contentHeight = 40;
      rerender(
        <Alert
          text="long text"
          maxHeight={100}
        />
      );
      resizeTo(100);
      expect(text).toHaveClass(styles['alert__text_no-fade']);
    });

    it('makes the expanded text a focusable region named by the title when it scrolls', () => {
      contentHeight = 300;
      const { getByRole, getByText } = renderAlert({
        title: 'Query failed',
        text: 'long text',
        maxHeight: 100,
      });
      const text = getByText('long text');
      expect(text).not.toHaveAttribute('tabindex');
      expect(text).not.toHaveAttribute('role');

      fireEvent.click(getByRole('button', { name: 'Show more' }));

      const region = getByRole('region', { name: 'Query failed' });
      expect(region).toBe(text);
      expect(region).toHaveAttribute('tabindex', '0');

      fireEvent.click(getByRole('button', { name: 'Show less' }));
      expect(text).not.toHaveAttribute('tabindex');
      expect(text).not.toHaveAttribute('role');
    });

    it('makes the expanded text focusable without a role when there is no title', () => {
      contentHeight = 300;
      const { getByRole, getByText } = renderAlert({
        text: 'long text',
        maxHeight: 100,
      });

      fireEvent.click(getByRole('button', { name: 'Show more' }));

      expect(getByText('long text')).toHaveAttribute('tabindex', '0');
      expect(getByText('long text')).not.toHaveAttribute('role');
      expect(getByText('long text')).not.toHaveAttribute('aria-labelledby');
    });

    it('does not make the expanded text focusable when it no longer scrolls', () => {
      contentHeight = 150;
      const { getByRole, getByText } = renderAlert({
        text: 'long text',
        maxHeight: '100%',
      });
      fireEvent.click(getByRole('button', { name: 'Show more' }));

      resizeTo(400);

      expect(getByText('long text')).not.toHaveAttribute('tabindex');
    });

    it('expands when focus lands on a link inside the clipped text', async () => {
      contentHeight = 300;
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();
      const { getByRole } = renderAlert({
        text: <a href="https://clickhouse.com/docs">the docs</a>,
        maxHeight: 100,
        onExpandedChange,
      });

      await user.tab();
      expect(getByRole('link', { name: 'the docs' })).toHaveFocus();
      expect(getByRole('button', { name: 'Show less' })).toHaveAttribute(
        'aria-expanded',
        'true'
      );
      expect(onExpandedChange).toHaveBeenCalledTimes(1);
      expect(onExpandedChange).toHaveBeenCalledWith(true);

      await user.tab();
      expect(getByRole('button', { name: 'Show less' })).toHaveFocus();
      expect(onExpandedChange).toHaveBeenCalledTimes(1);
    });

    it('does not expand when focus lands on a link in text that fits', async () => {
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();
      renderAlert({
        text: <a href="https://clickhouse.com/docs">the docs</a>,
        maxHeight: 100,
        onExpandedChange,
      });

      await user.tab();

      expect(onExpandedChange).not.toHaveBeenCalled();
    });

    it('does not construct new observers when toggling', () => {
      contentHeight = 300;
      const { getByRole } = renderAlert({ text: 'long text', maxHeight: 100 });
      const created = FakeResizeObserver.instances.length;
      expect(created).toBe(1);

      fireEvent.click(getByRole('button', { name: 'Show more' }));
      fireEvent.click(getByRole('button', { name: 'Show less' }));

      expect(FakeResizeObserver.instances).toHaveLength(created);
      expect(FakeResizeObserver.instances[0].disconnect).not.toHaveBeenCalled();
    });

    it('disconnects its observers when maxHeight is removed and on unmount', () => {
      contentHeight = 300;
      const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect');
      const { getByTestId, queryByRole, rerender, unmount } = renderAlert({
        text: 'long text',
        maxHeight: 100,
      });
      const [observer] = FakeResizeObserver.instances;
      expect(observer.observe).toHaveBeenCalledTimes(2);

      rerender(<Alert text="long text" />);

      expect(observer.disconnect).toHaveBeenCalled();
      expect(disconnect).toHaveBeenCalled();
      expect(queryByRole('button')).not.toBeInTheDocument();
      expect(
        getByTestId('click-alert').style.getPropertyValue('--alert-max-height')
      ).toBe('');

      rerender(
        <Alert
          text="long text"
          maxHeight={100}
        />
      );
      expect(FakeResizeObserver.instances).toHaveLength(2);

      unmount();
      expect(FakeResizeObserver.instances[1].disconnect).toHaveBeenCalled();
    });

    it('disconnects its observers when the alert is dismissed', () => {
      contentHeight = 300;
      const { getByTestId } = renderAlert({
        text: 'long text',
        maxHeight: 100,
        dismissible: true,
      });
      const [observer] = FakeResizeObserver.instances;

      fireEvent.click(getByTestId('click-alert-dismiss-button'));

      expect(observer.disconnect).toHaveBeenCalled();
    });

    it('passes every maxHeight prop through WarningAlert', () => {
      contentHeight = 300;
      const onExpandedChange = vi.fn();
      const { getByRole, getByTestId } = renderCUI(
        <WarningAlert
          text="long text"
          maxHeight={100}
          expandLabel="More"
          collapseLabel="Less"
          onExpandedChange={onExpandedChange}
        />
      );
      expect(
        getByTestId('click-alert').style.getPropertyValue('--alert-max-height')
      ).toBe('100px');

      fireEvent.click(getByRole('button', { name: 'More' }));

      expect(getByRole('button', { name: 'Less' })).toBeInTheDocument();
      expect(onExpandedChange).toHaveBeenCalledWith(true);
    });

    it('supports ReactNode text', () => {
      contentHeight = 300;
      const { getByRole, getByText } = renderAlert({
        text: (
          <span>
            see <strong>details</strong>
          </span>
        ),
        maxHeight: 100,
      });

      expect(getByText('details')).toBeInTheDocument();
      expect(getByRole('button', { name: 'Show more' })).toBeInTheDocument();
    });

    it('keeps maxHeight independent from preserveLineBreaks', () => {
      contentHeight = 300;
      const { getByText } = renderAlert({ text: 'line 1\nline 2', maxHeight: 100 });

      expect(getByText(withExactText('line 1\nline 2'))).not.toHaveClass(
        styles['alert__text_pre-wrap']
      );
    });

    it('does not forward the maxHeight props onto the root element', () => {
      const { getByTestId } = renderAlert({
        text: 'body',
        maxHeight: 100,
        onExpandedChange: vi.fn(),
        expandLabel: 'More',
        collapseLabel: 'Less',
      });

      const root = getByTestId('click-alert');
      for (const name of [
        'maxheight',
        'onexpandedchange',
        'expandlabel',
        'collapselabel',
      ]) {
        expect(root).not.toHaveAttribute(name);
      }
    });
  });
});
