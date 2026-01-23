import { fireEvent } from "@testing-library/react";

import { FileTabs, FileTabStatusType } from "./FileTabs";
import { renderCUI } from "../../utils/test-utils";

const tabs = ["tab1", "tab2", "tab3"];
describe("FileTabs", () => {
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

  it("should show all tabs", () => {
    const { getAllByRole } = renderTabs({});
    const tabElements = getAllByRole("tab");
    expect(tabElements).toHaveLength(3);
  });

  it("should call onSelect on clicking tab", () => {
    const { getByTestId } = renderTabs({});
    const tabElement = getByTestId("tab-element-0");
    fireEvent.click(tabElement);
    expect(onSelect).toBeCalledTimes(1);
  });
});
