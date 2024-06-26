import { fireEvent, waitFor } from "@testing-library/react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown";
import { renderCUI } from "@/utils/test-utils";

interface Props extends DropdownMenuProps {
  disabled?: boolean;
}

describe("Dropdown", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });
  const renderDropdown = ({ disabled, ...props }: Props) =>
    renderCUI(
      <Dropdown {...props}>
        <Dropdown.Trigger disabled={disabled}>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Group>
            <Dropdown.Item>Content0</Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Item>Content1 long text content</Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.Trigger sub>Hover over</Dropdown.Trigger>
            <Dropdown.Content sub>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Sub>
          <Dropdown.Item>Content2</Dropdown.Item>
          <Dropdown.Item disabled>Content3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

  it("should open dropdown on pointer", async () => {
    const { getByText } = renderDropdown({});
    const dropdownTrigger = getByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(getByText("Content0")).not.toBeNull();
  });

  it("should not open disabled dropdown on pointer", async () => {
    const { getByText, queryByText } = renderDropdown({
      disabled: true,
    });
    const dropdownTrigger = getByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(queryByText("Content0")).toBeNull();
  });

  it("should close dropdown on pointering outside content", async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(queryByText("Content0")).not.toBeNull();
    fireEvent.pointerDown(dropdownTrigger, {
      ctrlKey: false,
      button: 0,
    });
    expect(queryByText("Content0")).toBeNull();
  });

  it("should close dropdown on selecting item", async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(getByText("Content0")).not.toBeNull();
    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1")).toBeNull();
  });

  it("should open submenu dropdown on selecting item with subcontent", async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);

    expect(queryByText("Content0")).not.toBeNull();
    const item = getByText("Hover over");
    expect(item).not.toBeNull();
    await userEvent.hover(item);
    await waitFor(() => {
      expect(queryByText("SubContent0")).not.toBeNull();
    });
    expect(item).not.toBeNull();
  });

  it("should close dropdown on selecting sub item", async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);

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

  it("should not close dropdown on selecting disabled item", async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);

    expect(queryByText("Content3")).not.toBeNull();
    const item = queryByText("Content3");
    expect(item).not.toBeNull();
    item && fireEvent.pointerDown(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content2")).not.toBeNull();
  });
});
