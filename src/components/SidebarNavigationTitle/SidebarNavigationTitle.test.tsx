import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";
import { render, fireEvent } from "@testing-library/react";
import { SidebarNavigationTitle } from "./SidebarNavigationTitle";

describe("SidebarNavigationTitle", () => {
  it("should trigger click", () => {
    const onClick = jest.fn();

    const { queryByTestId } = render(
      <ThemeProvider theme={themes.dark}>
        <SidebarNavigationTitle
          icon="user"
          onClick={onClick}
          data-testid="non-collapsible-side-nav-item"
        >
          Non-collapsible side-nav-item
        </SidebarNavigationTitle>
      </ThemeProvider>
    );
    const collapsibleTrigger = queryByTestId("non-collapsible-side-nav-item");
    expect(collapsibleTrigger).not.toBeNull();
    expect(queryByTestId("collapsible-content")).toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onClick).toBeCalledTimes(1);
  });
});
