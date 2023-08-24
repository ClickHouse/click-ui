import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";
import { SidebarCollapsibleTitle } from "./SidebarCollapsibleTitle";

describe("SidebarCollapsibleTitle", () => {
  it("should trigger toggle on clicking trigger", () => {
    const onOpenChange = jest.fn();
    const { queryByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <SidebarCollapsibleTitle
          icon="user"
          label="collapsible item"
          onOpenChange={onOpenChange}
          data-testid="collapsible-header"
        >
          <div data-testid="collapsible-content">Sidebar nav content</div>
        </SidebarCollapsibleTitle>
      </ThemeProvider>
    );
    const collapsibleHeader = queryByTestId("collapsible-header");
    expect(collapsibleHeader).not.toBeNull();
    expect(queryByTestId("collapsible-content")).toBeNull();
    collapsibleHeader && fireEvent.click(collapsibleHeader);
    expect(onOpenChange).toBeCalledTimes(1);
    expect(queryByTestId("collapsible-content")).not.toBeNull();
  });
});
