import { fireEvent } from '@testing-library/react';

import { FileTabs, FileTabStatusType } from '@/components/FileTabs';
import { renderCUI } from '@/utils/test-utils';

const tabs = ['tab1', 'tab2', 'tab3'];
describe('FileTabs', () => {
  const onReorderTab = vi.fn();
  const onClose = vi.fn();
  const onSelect = vi.fn();
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });
  beforeEach(() => {
    onReorderTab.mockClear();
    onClose.mockClear();
    onSelect.mockClear();
  });

  const renderTabs = ({
    selectedIndex,
    status,
  }: {
    selectedIndex?: number;
    status?: FileTabStatusType;
  }) =>
    renderCUI(
      <FileTabs
        onReorderTab={onReorderTab}
        onClose={onClose}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
        data-testid="tab-container"
      >
        {tabs.map((option, index) => (
          <FileTabs.Tab
            index={index}
            key={`${option}-${index}`}
            icon="code-in-square"
            status={index === 0 ? status : undefined}
            text={`Tab ${index} value-${option}`}
            testId="tab-element"
          />
        ))}
      </FileTabs>
    );

  it('should show all tabs', () => {
    const { getAllByRole } = renderTabs({});
    const tabElements = getAllByRole('tab');
    expect(tabElements).toHaveLength(3);
  });

  it('renders close buttons with type="button" so they do not submit a form', () => {
    const { getByTestId } = renderTabs({});
    expect(getByTestId('tab-element-0-close')).toHaveAttribute('type', 'button');
  });

  it('should call onSelect on clicking tab', () => {
    const { getByTestId } = renderTabs({});
    const tabElement = getByTestId('tab-element-0');
    fireEvent.click(tabElement);
    expect(onSelect).toBeCalledTimes(1);
  });

  // The hover-driven show/hide of the close button and status indicator is
  // expressed entirely in CSS (`[data-type='close']` / `[data-indicator]`
  // toggled under `:hover`). JSDOM does not evaluate those stylesheet rules,
  // so the visual behavior is asserted in the Playwright visual-regression
  // spec (tests/display/filetabs.spec.ts) instead. The unit tests here cover
  // only the data-attribute contract that JS controls.
  describe('On hover interactions', () => {
    describe('Close button', () => {
      it('renders with the close data attribute', () => {
        const { getByTestId } = renderTabs({});
        const closeButton = getByTestId('tab-element-0-close');

        expect(closeButton).toHaveAttribute('data-type', 'close');
      });
    });

    describe('Status indicator', () => {
      it('reflects the status via the data-indicator attribute', () => {
        const { getByTestId } = renderTabs({ status: 'warning' });
        const indicator = getByTestId('tab-element-0-status');

        expect(indicator).toHaveAttribute('data-indicator', 'warning');
      });
    });
  });
});
