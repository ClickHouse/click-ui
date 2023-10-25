import { fireEvent, createEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FileTabs, FileTabStatusType } from "./FileTabs";
import { renderCUI } from "@/utils/test-utils";

const tabs = ["tab1", "tab2", "tab3"];
describe("FileTabs", () => {
  const onReorderTab = jest.fn();
  const onClose = jest.fn();
  const onSelect = jest.fn();
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
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
    fireEvent.mouseDown(tabElement);
    expect(onSelect).toBeCalledTimes(1);
  });
});
