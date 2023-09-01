import { fireEvent, waitFor } from "@testing-library/react";
import { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import userEvent from "@testing-library/user-event";
import { Menu, SplitButton } from "./SplitButton";
import { renderCUI } from "@/utils/test-utils";

interface Props extends DropdownMenuProps {
  disabled?: boolean;
}

const menuItems: Array<Menu> = [
  {
    type: "group",
    items: [
      {
        label: "Content0",
      },
    ],
  },
  {
    icon: "code",
    iconDir: "left",
    label: "Content1",
  },
  {
    type: "sub-menu",
    icon: "code",
    label: "Hover over",
    items: [
      {
        type: "group",
        items: [
          {
            label: "SubContent0",
          },
        ],
      },
      {
        label: "SubContent1",
      },
    ],
  },
  {
    icon: "code",
    iconDir: "right",
    label: "Content2",
  },
  {
    label: "Content3",
  },
];

describe("SplitButton", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  const mainButtonClick = jest.fn();
  beforeEach(() => {
    mainButtonClick.mockReset();
  });
  const renderDropdown = ({ disabled, ...props }: Props) =>
    renderCUI(
      <SplitButton
        menu={menuItems}
        disabled={disabled}
        onClick={mainButtonClick}
        {...props}
      >
        <div>SplitButton Main Trigger</div>
      </SplitButton>
    );

  it("should not open dropdown on pointer on main btn", async () => {
    const { queryByText } = renderDropdown({});
    const dropdownTrigger = queryByText("SplitButton Main Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && (await userEvent.click(dropdownTrigger));
    expect(queryByText("Content0")).toBeNull();
    expect(mainButtonClick).toBeCalledTimes(1);
  });

  it("should not trigger onClick on pointer on disabled btn", async () => {
    const { queryByText } = renderDropdown({
      disabled: true,
    });
    const dropdownTrigger = queryByText("SplitButton Main Trigger");
    expect(dropdownTrigger).not.toBeNull();
    dropdownTrigger && (await userEvent.click(dropdownTrigger));
    expect(mainButtonClick).toBeCalledTimes(0);
  });

  it("should open dropdown on pointer on secondary btn", async () => {
    const { getByTestId, getByText } = renderDropdown({});
    const dropdownTrigger = getByTestId("split-button-dropdown");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(getByText("Content0")).not.toBeNull();
  });

  it("should not open disabled dropdown on pointer", async () => {
    const { getByTestId, queryByText } = renderDropdown({
      disabled: true,
    });
    const dropdownTrigger = getByTestId("split-button-dropdown");
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(queryByText("Content0")).toBeNull();
  });

  it("should close dropdown on pointering outside content", async () => {
    const { getByTestId, queryByText } = renderDropdown({});
    const dropdownTrigger = getByTestId("split-button-dropdown");
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
    const { getByTestId, getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByTestId("split-button-dropdown");
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
    const { getByTestId, getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByTestId("split-button-dropdown");
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
    const { getByTestId, queryByText } = renderDropdown({});
    const dropdownTrigger = getByTestId("split-button-dropdown");
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
    const { getByTestId, queryByText } = renderDropdown({});
    const dropdownTrigger = getByTestId("split-button-dropdown");
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
