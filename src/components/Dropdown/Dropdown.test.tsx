import { ThemeProvider } from "styled-components";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import "@testing-library/jest-dom";
import { themes } from "../../theme";
import { Dropdown } from "./Dropdown";

interface Props extends DropdownMenuProps {
  disabled?: boolean;
}

describe("Dropdown", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  const renderDropdown = ({ disabled, ...props }: Props) =>
    render(
      <ThemeProvider theme={themes.dark}>
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
                <Dropdown.Item>SubContent0</Dropdown.Item>
                <Dropdown.Item>SubContent1</Dropdown.Item>
                <Dropdown.Item>SubContent0</Dropdown.Item>
                <Dropdown.Item>SubContent1</Dropdown.Item>
                <Dropdown.Item>SubContent0</Dropdown.Item>
                <Dropdown.Item>SubContent1</Dropdown.Item>
                <Dropdown.Item>SubContent0</Dropdown.Item>
                <Dropdown.Item>SubContent1</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Sub>
            <Dropdown.Item>Content2</Dropdown.Item>
            <Dropdown.Item disabled>Content3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </ThemeProvider>
    );

  it("should open dropdown on click", () => {
    const { queryByText } = renderDropdown({});
    const dropdownTrigger = queryByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && fireEvent.click(dropdownTrigger);
    waitFor(() => {
      expect(queryByText("Content0")).not.toBeNull();
    });
  });

  it("should not open disabled dropdown on click", () => {
    const { queryByText } = renderDropdown({
      disabled: true,
    });
    const dropdownTrigger = queryByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && fireEvent.click(dropdownTrigger);

    waitFor(() => {
      expect(queryByText("Content0")).toBeNull();
    });
  });

  it("should close dropdown on clicking outside content", () => {
    const { queryByText } = renderDropdown({});
    const dropdownTrigger = queryByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && fireEvent.click(dropdownTrigger);

    waitFor(() => {
      expect(queryByText("Content0")).not.toBeNull();
    });
    dropdownTrigger && fireEvent.click(dropdownTrigger);
    waitFor(() => {
      expect(queryByText("Content0")).toBeNull();
    });
  });

  it("should close dropdown on selecting item", () => {
    const { queryByText } = renderDropdown({});
    const dropdownTrigger = queryByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && fireEvent.click(dropdownTrigger);

    waitFor(() => {
      expect(queryByText("Content0")).not.toBeNull();
    });
    screen.debug();
    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    waitFor(() => {
      expect(item).not.toBeNull();
    });
    expect(item).not.toBeNull();
    expect(queryByText("Content1")).toBeNull();
  });

  it("should open submenu dropdown on selecting item with subcontent", () => {
    const { queryByText } = renderDropdown({});
    const dropdownTrigger = queryByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && fireEvent.click(dropdownTrigger);

    waitFor(() => {
      expect(queryByText("Content0")).not.toBeNull();
    });
    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.mouseOver(item);
    waitFor(() => {
      expect(queryByText("SubContent0")).not.toBeNull();
    });
    expect(item).not.toBeNull();
  });

  it("should close dropdown on selecting sub item", () => {
    const { queryByText } = renderDropdown({});
    const dropdownTrigger = queryByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && fireEvent.click(dropdownTrigger);

    waitFor(() => {
      expect(queryByText("Content0")).not.toBeNull();
    });
    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.mouseOver(item);
    expect(item).not.toBeNull();
    waitFor(() => {
      expect(queryByText("SubContent0")).not.toBeNull();
    });
    const subItem = queryByText("SubContent0");
    expect(subItem).not.toBeNull();
    subItem && fireEvent.click(subItem);
    waitFor(() => {
      expect(subItem).not.toBeNull();
    });
    expect(subItem).toBeNull();
    expect(item).toBeNull();
  });

  it("should not close dropdown on selecting disabled item", () => {
    const { queryByText } = renderDropdown({});
    const dropdownTrigger = queryByText("Dropdown Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && fireEvent.click(dropdownTrigger);

    waitFor(() => {
      expect(queryByText("Content3")).not.toBeNull();
    });
    const item = queryByText("Content3");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1")).not.toBeNull();
  });
});
