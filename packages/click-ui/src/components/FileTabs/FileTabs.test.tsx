import { fireEvent } from '@testing-library/react';
<<<<<<< HEAD
import userEvent from '@testing-library/user-event';
=======
>>>>>>> f2f4338a (chore: 🤖 move click-ui into packages/click-ui)

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

  it('should call onSelect on clicking tab', () => {
    const { getByTestId } = renderTabs({});
    const tabElement = getByTestId('tab-element-0');
    fireEvent.click(tabElement);
    expect(onSelect).toBeCalledTimes(1);
  });
<<<<<<< HEAD

  // TODO: Move to visual regression test instead, JSDOM (used by Vitest/Jest) does not evaluate CSS :hover pseudo-class rules — it fires the mouseenter/mouseover events but doesn't apply the associated stylesheet rules. This means toHaveStyle({ display: 'block' }) after userEvent.hover() will not reflect the CSS hover state and these two tests are likely to fail or give false results. To make hover tests meaningful, the component needs to manage visibility via JS state (e.g., onMouseEnter/onMouseLeave handlers toggling a state variable, then using inline styles or data-* attributes that get asserted).
  describe('On hover interactions', () => {
    describe('Close button', () => {
      it('should be hidden by default', () => {
        const { getByTestId } = renderTabs({});
        const closeButton = getByTestId('tab-element-0-close');

        expect(closeButton).toHaveAttribute('data-type', 'close');
        expect(closeButton).toHaveStyle({ display: 'none' });
      });

      it('should become visible when tab is hovered', async () => {
        const { getByTestId } = renderTabs({});
        const tabElement = getByTestId('tab-element-0');
        const closeButton = getByTestId('tab-element-0-close');

        await userEvent.hover(tabElement);

        expect(closeButton).toHaveStyle({ display: 'block' });
      });
    });

    describe('Status indicator', () => {
      it('should be visible by default', () => {
        const { getByTestId } = renderTabs({ status: 'warning' });
        const indicator = getByTestId('tab-element-0-status');

        expect(indicator).toHaveAttribute('data-indicator', 'warning');
        expect(indicator).toHaveStyle({ display: 'block' });
      });

      it('should be hidden when tab is hovered', async () => {
        const { getByTestId } = renderTabs({ status: 'warning' });
        const tabElement = getByTestId('tab-element-0');
        const indicator = getByTestId('tab-element-0-status');

        await userEvent.hover(tabElement);

        expect(indicator).toHaveStyle({ display: 'none' });
      });
    });
  });
=======
>>>>>>> f2f4338a (chore: 🤖 move click-ui into packages/click-ui)
});
