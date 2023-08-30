import { fireEvent, waitFor } from "@testing-library/react";
import { ContextMenuProps } from "@radix-ui/react-context-menu";
import userEvent from "@testing-library/user-event";
import { ContextMenu } from "./ContextMenu";
import { renderCUI } from "@/utils/test-utils";

interface Props extends ContextMenuProps {
  disabled?: boolean;
}

describe("ContextMenu", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
    global.DOMRect = class DOMRect {
      bottom = 0;
      left = 0;
      right = 0;
      top = 0;
      constructor(public x = 0, public y = 0, public width = 0, public height = 0) {}
      static fromRect(other?: DOMRectInit): DOMRect {
        return new DOMRect(other?.x, other?.y, other?.width, other?.height);
      }
      toJSON() {
        return JSON.stringify(this);
      }
    };
  });
  const renderContextMenu = ({ disabled, ...props }: Props) =>
    renderCUI(
      <ContextMenu {...props}>
        <ContextMenu.Trigger disabled={disabled}>
          <div>ContextMenu Trigger</div>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Group>
            <ContextMenu.Item>Content0</ContextMenu.Item>
          </ContextMenu.Group>
          <ContextMenu.Item>Content1 long text content</ContextMenu.Item>
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Hover over</ContextMenu.SubTrigger>
            <ContextMenu.Content sub>
              <ContextMenu.Item>SubContent0</ContextMenu.Item>
              <ContextMenu.Item>SubContent1</ContextMenu.Item>
            </ContextMenu.Content>
          </ContextMenu.Sub>
          <ContextMenu.Item>Content2</ContextMenu.Item>
          <ContextMenu.Item disabled>Content3</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu>
    );

  it("should open menu on rightclick", () => {
    const { getByText } = renderContextMenu({});
    const contextMenuTrigger = getByText("ContextMenu Trigger");
    expect(contextMenuTrigger).not.toBeNull();
    fireEvent.contextMenu(contextMenuTrigger);
    expect(getByText("Content0")).not.toBeNull();
  });

  it("should not open disabled contextMenu on pointer", () => {
    const { getByText, queryByText } = renderContextMenu({
      disabled: true,
    });
    const contextMenuTrigger = getByText("ContextMenu Trigger");
    fireEvent.contextMenu(contextMenuTrigger);
    expect(queryByText("Content0")).toBeNull();
  });

  it("should close contextMenu on clicking outside content", async () => {
    const { getByText, queryByText } = renderContextMenu({});
    const contextMenuTrigger = getByText("ContextMenu Trigger");
    fireEvent.contextMenu(contextMenuTrigger);
    expect(queryByText("Content0")).not.toBeNull();
    fireEvent.click(document, {
      ctrlKey: false,
      button: 0,
    });
    await waitFor(() => {
      expect(queryByText("Content1")).toBeNull();
    });
  });

  it("should close contextMenu on selecting item", () => {
    const { getByText, queryByText } = renderContextMenu({});
    const contextMenuTrigger = getByText("ContextMenu Trigger");
    expect(contextMenuTrigger).not.toBeNull();
    fireEvent.contextMenu(contextMenuTrigger);
    expect(getByText("Content0")).not.toBeNull();
    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1")).toBeNull();
  });

  it("should open submenu contextMenu on selecting item with subcontent", async () => {
    const { getByText, queryByText } = renderContextMenu({});
    const contextMenuTrigger = getByText("ContextMenu Trigger");
    expect(contextMenuTrigger).not.toBeNull();
    fireEvent.contextMenu(contextMenuTrigger);

    expect(queryByText("Content0")).not.toBeNull();
    const item = getByText("Hover over");
    expect(item).not.toBeNull();
    await userEvent.hover(item);
    await waitFor(() => {
      expect(queryByText("SubContent0")).not.toBeNull();
    });
    expect(item).not.toBeNull();
  });

  it("should close contextMenu on selecting sub item", async () => {
    const { getByText, queryByText } = renderContextMenu({});
    const contextMenuTrigger = getByText("ContextMenu Trigger");
    fireEvent.contextMenu(contextMenuTrigger);

    expect(queryByText("Content0")).not.toBeNull();
    const item = queryByText("Hover over");
    item && (await userEvent.hover(item));
    await waitFor(() => {
      expect(queryByText("SubContent0")).not.toBeNull();
    });
    expect(item).not.toBeNull();
    const subItem = queryByText("SubContent0");
    subItem && fireEvent.click(subItem);
    await waitFor(() => {
      expect(queryByText("SubContent1")).toBeNull();
    });
    expect(queryByText("Content0")).toBeNull();
  });

  it("should not close contextMenu on selecting disabled item", () => {
    const { getByText, queryByText } = renderContextMenu({});
    const contextMenuTrigger = getByText("ContextMenu Trigger");
    fireEvent.contextMenu(contextMenuTrigger);

    expect(queryByText("Content3")).not.toBeNull();
    const item = queryByText("Content3");
    expect(item).not.toBeNull();
    item && fireEvent.pointerDown(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content2")).not.toBeNull();
  });
});
