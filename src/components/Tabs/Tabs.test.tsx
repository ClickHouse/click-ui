import { ThemeProvider } from "../../theme";
import { render, screen } from "@testing-library/react";
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
    renderTabs({
      defaultValue: "tab",
      ariaLabel: "Tabs",
      children: (
        <Tab label="tab" key="tab" value="tab">
          <p>content</p>
        </Tab>
      ),
    });
    const content = screen.getByText("content");
    expect(content.textContent).toEqual("content");
  });
});
