import { fireEvent } from "@testing-library/react";
import { MultiAccordion, MultiAccordionProps } from "./MultiAccordion";
import { renderCUI } from "@/utils/test-utils";
const children = (
  <>
    <MultiAccordion.Item
      value="content0"
      icon="user"
      title="Option 1"
      isCompleted
    >
      Content0
    </MultiAccordion.Item>
    <MultiAccordion.Item
      value="content1"
      title="Option 2"
    >
      Content1 long text content
    </MultiAccordion.Item>
  </>
);
describe("MultiAccordion", () => {
  const renderAccordion = (props: MultiAccordionProps) =>
    renderCUI(<MultiAccordion {...props} />);

  it("should render the multi accordion type single", () => {
    const { getByText, queryByText } = renderAccordion({ type: "single", children });
    const trigger1 = getByText("Option 1");
    const trigger2 = getByText("Option 2");
    expect(trigger1).toBeTruthy();
    fireEvent.click(trigger1);
    expect(getByText("Content0")).toBeTruthy();
    expect(queryByText("Content1 long text content")).toBeNull();
    fireEvent.click(trigger2);
    expect(getByText("Content1 long text content")).toBeTruthy();
    expect(queryByText("Content0")).toBeNull();
    fireEvent.click(trigger2);
    expect(getByText("Content1 long text content")).toBeTruthy();
  });

  it("should render the multi accordion type single collapsible", () => {
    const { getByText, queryAllByTestId, queryByText } = renderAccordion({
      type: "single",
      collapsible: true,
      children,
    });
    const trigger1 = getByText("Option 1");
    const trigger2 = getByText("Option 2");
    expect(trigger1).toBeTruthy();
    fireEvent.click(trigger1);
    expect(getByText("Content0")).toBeTruthy();
    expect(queryByText("Content1 long text content")).toBeNull();
    fireEvent.click(trigger2);
    expect(getByText("Content1 long text content")).toBeTruthy();
    expect(queryByText("Content0")).toBeNull();
    fireEvent.click(trigger2);
    expect(queryByText("Content1 long text content")).toBeNull();
    expect(queryAllByTestId("accordion-status-icon")).toHaveLength(0);
  });

  it("should render the multi accordion type multiple", () => {
    const { getByText, queryByText } = renderAccordion({ type: "multiple", children });
    const trigger1 = getByText("Option 1");
    const trigger2 = getByText("Option 2");
    expect(trigger1).toBeTruthy();
    fireEvent.click(trigger1);
    expect(getByText("Content0")).toBeTruthy();
    expect(queryByText("Content1 long text content")).toBeNull();
    fireEvent.click(trigger2);
    expect(getByText("Content1 long text content")).toBeTruthy();
    expect(getByText("Content0")).toBeTruthy();
    fireEvent.click(trigger2);
    expect(queryByText("Content1 long text content")).toBeNull();
  });

  it("should show check", () => {
    const { getAllByTestId, getByText } = renderAccordion({
      type: "single",
      showCheck: true,
      children,
    });
    expect(getByText("Option 1")).toBeTruthy();
    expect(getByText("Option 2")).toBeTruthy();
    expect(getAllByTestId("accordion-status-icon")).toHaveLength(2);
  });

  it("should trigger markAsCompleted onClicking check", () => {
    const markAsCompleted = vi.fn();
    const { getAllByTestId, getByText } = renderAccordion({
      type: "single",
      showCheck: true,
      markAsCompleted,
      children,
    });
    expect(getByText("Option 1")).toBeTruthy();
    expect(getByText("Option 2")).toBeTruthy();
    const statusIcons = getAllByTestId("accordion-status-icon");
    expect(statusIcons).toHaveLength(2);
    fireEvent.click(statusIcons[0]);
    expect(markAsCompleted).toHaveBeenCalledOnce();
  });
});
