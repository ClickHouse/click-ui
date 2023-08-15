import { ThemeProvider } from "styled-components";
import { render, fireEvent, waitFor, screen, createEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { themes } from "../../theme";
import { FileTabs, StatusType } from "./FileTabs";

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
  beforeEach(function () {
    onReorderTab.mockClear();
    onClose.mockClear();
    onSelect.mockClear();
  });

  const renderTabs = ({ selected, status }: { selected?: string; status?: StatusType }) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <FileTabs
          onReorderTab={onReorderTab}
          onClose={onClose}
          onSelect={onSelect}
          selected={selected}
          data-testid="tab-container"
        >
          {tabs.map((option, index) => (
            <FileTabs.Tab
              value={option}
              key={`${option}-${index}`}
              icon="code-in-square"
              status={index === 0 ? status : undefined}
              text={`Tab ${index} value-${option}`}
              testId="tab-element"
            />
          ))}
        </FileTabs>
      </ThemeProvider>
    );

  it("should show all tabs", () => {
    const { getAllByRole } = renderTabs({});
    const tabElements = getAllByRole("tab");
    expect(tabElements).toHaveLength(3);
  });

  it("should call onSelect on clicking tab", () => {
    const { getByTestId } = renderTabs({});
    const tabElement = getByTestId("tab-element-tab1");
    fireEvent.mouseDown(tabElement);
    expect(onSelect).toBeCalledTimes(1);
  });

  it("should call onReorderTab on drag and drop", () => {
    const { getByTestId } = renderTabs({});
    const tabElement = getByTestId("tab-element-tab1");
    expect(onReorderTab).toBeCalledTimes(0);
    const mockDropEvent = createEvent.dragStart(tabElement);

    const data: Record<string, string> = {};
    Object.assign(mockDropEvent, {
      dataTransfer: {
        setData: (key: string, value: string) => (data[key] = value),
        setDragImage: jest.fn(),
        effectAllowed: "none",
        getData: (key: string) => data[key],
      },
    });
    fireEvent(tabElement, mockDropEvent);
    fireEvent.dragOver(getByTestId("tab-element-tab2"));
    fireEvent.drop(getByTestId("tab-container"));
    screen.debug(getByTestId("tab-container"));
    expect(onReorderTab).toBeCalledTimes(1);
  });

  it("should not call onReorderTab on drag and drop outside the container", () => {
    const { getByTestId } = renderTabs({});
    const tabElement = getByTestId("tab-element-tab1");
    expect(onReorderTab).toBeCalledTimes(0);
    const mockDropEvent = createEvent.dragStart(tabElement);

    const data: Record<string, string> = {};
    Object.assign(mockDropEvent, {
      dataTransfer: {
        setData: (key: string, value: string) => (data[key] = value),
        setDragImage: jest.fn(),
        effectAllowed: "none",
        getData: (key: string) => data[key],
      },
    });
    fireEvent(tabElement, mockDropEvent);
    fireEvent.dragOver(getByTestId("tab-element-tab2"));
    fireEvent.drop(document.body);
    expect(onReorderTab).toBeCalledTimes(0);
  });
});
