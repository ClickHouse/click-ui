import { fireEvent } from "@testing-library/react";
import { SidebarCollapsibleItem } from "@/components";
import { renderCUI } from "@/utils/test-utils";

describe("SidebarCollapsibleItem", () => {
  it("should trigger toggle on clicking trigger type main", () => {
    const onOpenChange = vi.fn();
    const { queryByTestId } = renderCUI(
      <SidebarCollapsibleItem
        icon="user"
        label="collapsible item"
        onOpenChange={onOpenChange}
        data-testid="collapsible-header"
      >
        <div data-testid="collapsible-content">Sidebar nav content</div>
      </SidebarCollapsibleItem>
    );
    const collapsibleHeader = queryByTestId("collapsible-header");
    expect(collapsibleHeader).not.toBeNull();
    expect(queryByTestId("collapsible-content")).toBeNull();
    collapsibleHeader && fireEvent.click(collapsibleHeader);
    expect(onOpenChange).toBeCalledTimes(1);
    expect(queryByTestId("collapsible-content")).not.toBeNull();
  });
  it("should trigger toggle on clicking trigger type sqlSidebar", () => {
    const onOpenChange = vi.fn();
    const { queryByTestId } = renderCUI(
      <SidebarCollapsibleItem
        icon="user"
        type="sqlSidebar"
        label="collapsible item"
        onOpenChange={onOpenChange}
        data-testid="collapsible-header"
      >
        <div data-testid="collapsible-content">Sidebar nav content</div>
      </SidebarCollapsibleItem>
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
