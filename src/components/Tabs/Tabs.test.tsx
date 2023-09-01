import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";
import { TabsProps } from "@/components/Tabs/Tabs";
import { renderCUI } from "@/utils/test-utils";

describe("Tabs", () => {
  const renderTabs = (props: TabsProps) => renderCUI(<Tabs {...props} />);

  it("should render the Tabs", () => {
    const { getByText } = renderTabs({
      children: <p>Common text</p>,
      defaultValue: "1",
    });
    expect(getByText("Common text").textContent).toBe("Common text");
  });

  it("should switch between tabs", () => {
    const { getByText } = renderTabs({
      defaultValue: "tab1",
      ariaLabel: "Tabs",
      children: (
        <>
          <Tabs.TriggersList>
            <Tabs.Trigger
              value="tab1"
              key="tab1"
            >
              tab1
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              key="tab2"
            >
              tab2
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab3"
              key="tab3"
            >
              tab3
            </Tabs.Trigger>
          </Tabs.TriggersList>
          <Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
          <Tabs.Content value="tab2">Tab 2 content</Tabs.Content>
          <Tabs.Content value="tab3">Tab 3 content</Tabs.Content>
        </>
      ),
    });
    [1, 2, 3].forEach(async n => {
      const tab = getByText(`tab${n}`);
      userEvent.click(tab);
      await waitFor(() => {
        const content = getByText(`Tab ${n} content`);
        expect(content.textContent).toEqual(`Tab ${n} content`);
      });
    });
  });

  it("should execute callback on value change", async () => {
    let counter = 0;
    const { getByText } = renderTabs({
      onValueChange: () => counter++,
      children: (
        <>
          <Tabs.TriggersList>
            <Tabs.Trigger
              value="tab1"
              key="tab1"
            >
              tab1
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab2"
              key="tab2"
            >
              tab2
            </Tabs.Trigger>
            <Tabs.Trigger
              value="tab3"
              key="tab3"
            >
              tab3
            </Tabs.Trigger>
          </Tabs.TriggersList>
          <Tabs.Content value="tab1">Tab 1 content</Tabs.Content>
          <Tabs.Content value="tab2">Tab 2 content</Tabs.Content>
          <Tabs.Content value="tab3">Tab 3 content</Tabs.Content>
        </>
      ),
      defaultValue: "tab1",
    });
    const tab = getByText("tab2");
    userEvent.click(tab);
    await waitFor(() => {
      expect(counter).toEqual(1);
    });
  });
});
