import { ThemeProvider } from "../../theme";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tab, Tabs } from "./Tabs";
import { TabsProps } from "@/components/Tabs/Tabs";

describe("Tabs", () => {
  const renderTabs = (props: TabsProps) =>
    render(
      <ThemeProvider theme="dark">
        <Tabs {...props} />
      </ThemeProvider>
    );

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
      children: [
        <Tab label="tab1" key="tab1" value="tab1">
          <p>Tab 1 content</p>
        </Tab>,
        <Tab label="tab2" key="tab2" value="tab2">
          <p>Tab 2 content</p>
        </Tab>,
        <Tab label="tab3" key="tab3" value="tab3">
          <p>Tab 3 content</p>
        </Tab>,
      ],
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
      children: [
        <Tab label="tab1" key="tab1" value="tab1">
          <p>Tab 1 content</p>
        </Tab>,
        <Tab label="tab2" key="tab2" value="tab2">
          <p>Tab 2 content</p>
        </Tab>,
      ],
      defaultValue: "tab1",
    });
    const tab = getByText("tab2");
    userEvent.click(tab);
    await waitFor(() => {
      expect(counter).toEqual(1);
    });
  });
});
