import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";
import { SidebarNavigationItem } from "./SidebarNavigationItem";

describe("SidebarNavigationItem", () => {
  it("should trigger click if not collapsible", () => {
    const onClick = jest.fn();

    const { queryByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <SidebarNavigationItem
          icon="user"
          component="button"
          onClick={onClick}
          data-testid="non-collapsible-side-nav-item"
        >
          Non-collapsible side-nav-item
        </SidebarNavigationItem>
      </ThemeProvider>
    );
    const collapsibleTrigger = queryByTestId("non-collapsible-side-nav-item");
    expect(collapsibleTrigger).not.toBeNull();
    expect(queryByTestId("collapsible-content")).toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onClick).toBeCalledTimes(1);
  });

  it("should trigger toggle on clicking collapsible trigger", () => {
    const onOpenChange = jest.fn();
    const { queryByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <SidebarNavigationItem
          icon="user"
          collapsible
          label="collapsible item"
          onOpenChange={onOpenChange}
          data-testid="collapsible-header"
        >
          <div data-testid="collapsible-content">Sidebar nav content</div>
        </SidebarNavigationItem>
      </ThemeProvider>
    );
    const collapsibleHeader = queryByTestId("collapsible-header");
    expect(collapsibleHeader).not.toBeNull();
    expect(queryByTestId("collapsible-content")).toBeNull();
    collapsibleHeader && fireEvent.click(collapsibleHeader);
    expect(queryByTestId("collapsible-content")).toBeNull();
    const trigger = collapsibleHeader?.querySelector("button") as HTMLButtonElement;
    fireEvent.click(trigger);
    expect(onOpenChange).toBeCalledTimes(1);
    expect(queryByTestId("collapsible-content")).not.toBeNull();
  });
});
