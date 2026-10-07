import { ReactNode, createRef } from 'react';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextTruncate } from '@/components/TextTruncate';
import { renderCUI } from '@/utils/test-utils';

const CHAR_WIDTH = 10;
const LONG_TEXT = 'This text is far wider than its container';
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

describe('TextTruncate', () => {
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

  it('renders its children in a span by default', () => {
    const { getByText } = renderCUI(<TextTruncate>Hello</TextTruncate>);
    expect(getByText('Hello').tagName).toBe('SPAN');
  });

  it('renders as the given component and forwards ref, props and className', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = renderCUI(
      <TextTruncate
        component="div"
        ref={ref}
        data-testid="root"
        aria-label="Label"
        className="custom"
      >
        Hello
      </TextTruncate>
    );
    const root = getByTestId('root');
    expect(root.tagName).toBe('DIV');
    expect(root).toHaveAttribute('aria-label', 'Label');
    expect(root).toHaveClass('custom');
    expect(ref.current).toBe(root);
  });

  describe('when the text fits', () => {
    it('is not a tab stop and has no role', () => {
      const { getByText } = renderCUI(<TextTruncate>Short</TextTruncate>);
      expect(getByText('Short')).not.toHaveAttribute('tabindex');
      expect(getByText('Short')).not.toHaveAttribute('role');
    });

    it('shows no tooltip on hover', async () => {
      const user = userEvent.setup();
      const { getByText, queryByRole } = renderCUI(<TextTruncate>Short</TextTruncate>);
      await user.hover(getByText('Short'));
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('when the text is truncated', () => {
    it('becomes a focusable group named by its text', () => {
      const { getByRole } = renderCUI(<TextTruncate>{LONG_TEXT}</TextTruncate>);
      expect(getByRole('group', { name: LONG_TEXT })).toHaveAttribute('tabindex', '0');
    });

    it('keeps a consumer id, aria-label and aria-labelledby', () => {
      const { getByRole } = renderCUI(
        <>
          <TextTruncate id="own-id">{LONG_TEXT}</TextTruncate>
          <TextTruncate aria-label="Custom name">{LONG_TEXT}</TextTruncate>
          <span id="external">External name</span>
          <TextTruncate aria-labelledby="external">{LONG_TEXT}</TextTruncate>
        </>
      );
      expect(getByRole('group', { name: LONG_TEXT })).toHaveAttribute('id', 'own-id');
      expect(getByRole('group', { name: 'Custom name' })).not.toHaveAttribute(
        'aria-labelledby'
      );
      expect(getByRole('group', { name: 'External name' })).toBeInTheDocument();
    });

    it('is not described by the default tooltip, which repeats its name', async () => {
      const user = userEvent.setup();
      const { getByRole, findByRole } = renderCUI(
        <TextTruncate>{LONG_TEXT}</TextTruncate>
      );
      await user.tab();
      await findByRole('tooltip');
      expect(getByRole('group')).not.toHaveAttribute('aria-describedby');
    });

    it('shows a custom tooltipContent and is described by it', async () => {
      const user = userEvent.setup();
      const { getByRole, findByRole } = renderCUI(
        <TextTruncate tooltipContent="Custom tooltip">{LONG_TEXT}</TextTruncate>
      );
      await user.tab();
      expect(await findByRole('tooltip')).toHaveTextContent('Custom tooltip');
      expect(getByRole('group')).toHaveAccessibleDescription('Custom tooltip');
    });

    it('shows the full text in a tooltip on hover', async () => {
      const user = userEvent.setup();
      const { getByRole, findByRole } = renderCUI(
        <TextTruncate>{LONG_TEXT}</TextTruncate>
      );
      await user.hover(getByRole('group'));
      expect(await findByRole('tooltip')).toHaveTextContent(LONG_TEXT);
    });

    it('shows the tooltip on keyboard focus and closes it on Escape', async () => {
      const user = userEvent.setup();
      const { getByRole, findByRole, queryByRole } = renderCUI(
        <TextTruncate>{LONG_TEXT}</TextTruncate>
      );
      await user.tab();
      expect(getByRole('group')).toHaveFocus();
      expect(await findByRole('tooltip')).toHaveTextContent(LONG_TEXT);

      await user.keyboard('{Escape}');
      await waitFor(() => expect(queryByRole('tooltip')).not.toBeInTheDocument());
    });

    it('positions the tooltip with tooltipProps', async () => {
      const user = userEvent.setup();
      const { getByRole, findByRole } = renderCUI(
        <TextTruncate tooltipProps={{ side: 'right' }}>{LONG_TEXT}</TextTruncate>
      );
      await user.hover(getByRole('group'));
      expect(await findByRole('tooltip')).toHaveAttribute('data-side', 'right');
    });

    it('keeps the native role of a link or heading', () => {
      const { getByRole } = renderCUI(
        <>
          <TextTruncate
            component="a"
            href="#target"
          >
            {LONG_TEXT}
          </TextTruncate>
          <TextTruncate component="h3">{LONG_TEXT}</TextTruncate>
        </>
      );
      expect(getByRole('link', { name: LONG_TEXT })).not.toHaveAttribute('role');
      expect(getByRole('heading', { name: LONG_TEXT })).not.toHaveAttribute('role');
    });
  });

  describe('inside an interactive control', () => {
    it.each([
      ['a button', (text: ReactNode) => <button type="button">{text}</button>],
      ['a link', (text: ReactNode) => <a href="#target">{text}</a>],
      [
        'a tab',
        (text: ReactNode) => (
          <div
            role="tab"
            aria-selected={false}
            tabIndex={-1}
          >
            {text}
          </div>
        ),
      ],
      [
        'a menu item',
        (text: ReactNode) => (
          <div
            role="menuitem"
            tabIndex={-1}
          >
            {text}
          </div>
        ),
      ],
      [
        'an option',
        (text: ReactNode) => (
          <div
            role="option"
            aria-selected={false}
            tabIndex={-1}
          >
            {text}
          </div>
        ),
      ],
      [
        'a Select option',
        (text: ReactNode) => <div {...{ 'cui-select-item': '' }}>{text}</div>,
      ],
    ])('adds no tab stop or role inside %s', (_, renderControl) => {
      const { getByText } = renderCUI(
        renderControl(<TextTruncate>{LONG_TEXT}</TextTruncate>)
      );
      const text = getByText(LONG_TEXT);
      expect(text).not.toHaveAttribute('tabindex');
      expect(text).not.toHaveAttribute('role');
    });

    it('adds no tab stop inside a control in middle mode', () => {
      const { getByRole } = renderCUI(
        <button type="button">
          <TextTruncate ellipsisPosition="middle">
            console-export-2024-final.csv
          </TextTruncate>
        </button>
      );
      expect(getByRole('button').querySelector('[tabindex]')).toBeNull();
    });

    it('still shows the tooltip on hover', async () => {
      const user = userEvent.setup();
      const { getByText, findByRole } = renderCUI(
        <button type="button">
          <TextTruncate>{LONG_TEXT}</TextTruncate>
        </button>
      );
      await user.hover(getByText(LONG_TEXT));
      expect(await findByRole('tooltip')).toHaveTextContent(LONG_TEXT);
    });
  });

  describe('re-measuring', () => {
    it('toggles the tab stop on resize without remounting', () => {
      containerWidth = 1000;
      const { getByText } = renderCUI(<TextTruncate>{LONG_TEXT}</TextTruncate>);
      const root = getByText(LONG_TEXT);
      expect(root).not.toHaveAttribute('tabindex');

      resizeTo(100);
      expect(getByText(LONG_TEXT)).toBe(root);
      expect(root).toHaveAttribute('tabindex', '0');

      resizeTo(1000);
      expect(getByText(LONG_TEXT)).toBe(root);
      expect(root).not.toHaveAttribute('tabindex');
    });

    it('never opens the tooltip on a resize by itself', async () => {
      const user = userEvent.setup();
      containerWidth = 1000;
      const { getByText, queryByRole, findByRole } = renderCUI(
        <TextTruncate>{LONG_TEXT}</TextTruncate>
      );
      await user.hover(getByText(LONG_TEXT));
      await user.unhover(getByText(LONG_TEXT));
      resizeTo(100);
      expect(queryByRole('tooltip')).not.toBeInTheDocument();

      await user.tab();
      await findByRole('tooltip');
      resizeTo(1000);
      act(() => getByText(LONG_TEXT).blur());
      resizeTo(100);
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('with showTooltip={false}', () => {
    it('does not measure, add a tab stop or show a tooltip', async () => {
      const user = userEvent.setup();
      const { getByText, queryByRole } = renderCUI(
        <TextTruncate showTooltip={false}>{LONG_TEXT}</TextTruncate>
      );
      const root = getByText(LONG_TEXT);
      expect(FakeResizeObserver.instances).toHaveLength(0);
      expect(root).not.toHaveAttribute('tabindex');
      expect(root).not.toHaveAttribute('role');

      await user.hover(root);
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  describe('when children hold a link', () => {
    it('warns once to pass a tooltipContent', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const { rerender } = renderCUI(
        <TextTruncate>
          Owned by <a href="#team">the team</a>
        </TextTruncate>
      );
      rerender(
        <TextTruncate>
          Owned by <a href="#team">the platform team</a>
        </TextTruncate>
      );
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn.mock.calls[0][0]).toContain('tooltipContent');
      warn.mockRestore();
    });

    it.each([
      [
        'a tooltipContent',
        <TextTruncate tooltipContent="Owned by the team">
          Owned by <a href="#team">the team</a>
        </TextTruncate>,
      ],
      [
        'showTooltip={false}',
        <TextTruncate showTooltip={false}>
          Owned by <a href="#team">the team</a>
        </TextTruncate>,
      ],
    ])('does not warn with %s', (_, element) => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      renderCUI(element);
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });

    it('does not warn for plain text', () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      renderCUI(<TextTruncate>{LONG_TEXT}</TextTruncate>);
      expect(warn).not.toHaveBeenCalled();
      warn.mockRestore();
    });
  });

  describe('with ellipsisPosition="middle"', () => {
    const FILE_NAME = 'console-export-2024-final.csv';

    it('keeps the last trailingChars characters in their own part', () => {
      const { getByText } = renderCUI(
        <TextTruncate ellipsisPosition="middle">{FILE_NAME}</TextTruncate>
      );
      expect(getByText('inal.csv')).toBeInTheDocument();
      expect(getByText('console-export-2024-f')).toBeInTheDocument();
    });

    it('uses a custom trailingChars', () => {
      const { getByText } = renderCUI(
        <TextTruncate
          ellipsisPosition="middle"
          trailingChars={4}
        >
          {FILE_NAME}
        </TextTruncate>
      );
      expect(getByText('.csv')).toBeInTheDocument();
    });

    it('reads as one string to assistive technology', () => {
      const { getByRole, getAllByText } = renderCUI(
        <>
          <TextTruncate ellipsisPosition="middle">{FILE_NAME}</TextTruncate>
          <button type="button">
            <TextTruncate ellipsisPosition="middle">{FILE_NAME}</TextTruncate>
          </button>
        </>
      );
      expect(getByRole('group', { name: FILE_NAME })).toBeInTheDocument();
      expect(getByRole('button', { name: FILE_NAME })).toBeInTheDocument();
      [...getAllByText('console-export-2024-f'), ...getAllByText('inal.csv')].forEach(
        part => expect(part).toHaveAttribute('aria-hidden', 'true')
      );

      resizeTo(1000);
      expect(getByRole('button', { name: FILE_NAME })).toBeInTheDocument();
    });

    it('detects truncation when only the start part is cut', () => {
      containerWidth = 300;
      const { getByTestId } = renderCUI(
        <TextTruncate
          ellipsisPosition="middle"
          data-testid="root"
        >
          {FILE_NAME}
        </TextTruncate>
      );
      expect(getByTestId('root')).not.toHaveAttribute('tabindex');

      resizeTo(200);
      expect(getByTestId('root')).toHaveAttribute('tabindex', '0');
    });

    it.each([
      ['the end would be longer than the start', 'abcdefghij', 8],
      ['trailingChars is 0', FILE_NAME, 0],
    ])('does not split when %s', (_, text, trailingChars) => {
      const { getByTestId } = renderCUI(
        <TextTruncate
          ellipsisPosition="middle"
          trailingChars={trailingChars}
          data-testid="root"
        >
          {text}
        </TextTruncate>
      );
      const root = getByTestId('root');
      expect(root.children).toHaveLength(1);
      expect(root.children[0]).toHaveTextContent(text);
      expect(root.children[0]).not.toHaveAttribute('aria-hidden');
    });

    it('keeps the space at the split point', () => {
      const { getByText } = renderCUI(
        <TextTruncate ellipsisPosition="middle">
          Quarterly revenue report 2024 Q3
        </TextTruncate>
      );
      expect(getByText('Quarterly revenue report')).toBeInTheDocument();
      expect(getByText('2024 Q3').textContent).toBe('\u00a02024 Q3');
    });
  });

  describe('maxWidth', () => {
    it('sets the max-width custom property and keeps the consumer style', () => {
      const { getByText } = renderCUI(
        <TextTruncate
          maxWidth="20ch"
          style={{ color: 'red' }}
        >
          Hello
        </TextTruncate>
      );
      expect(getByText('Hello')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
      expect(getByText('Hello').style.getPropertyValue('--text-truncate-max-width')).toBe(
        '20ch'
      );
    });
  });
});
