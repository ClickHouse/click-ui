import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";
import { SidebarNavigationItem } from "./SidebarNavigationItem";

describe("SidebarNavigationItem", () => {
  it("should trigger click", () => {
    const onClick = jest.fn();

    const { queryByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <SidebarNavigationItem
          icon="user"
          onClick={onClick}
          data-testid="non-collapsible-side-nav-item"
          label="Non-collapsible side-nav-item"
        />
      </ThemeProvider>
    );
    const collapsibleTrigger = queryByTestId("non-collapsible-side-nav-item");
    expect(collapsibleTrigger).not.toBeNull();
    expect(queryByTestId("collapsible-content")).toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onClick).toBeCalledTimes(1);
  });
});
