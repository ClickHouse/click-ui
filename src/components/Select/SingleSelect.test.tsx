import {
  act,
  fireEvent,
  queryByText as queryByTestingText,
} from "@testing-library/react";
import { Select, SelectProps } from "..";
import { ReactNode } from "react";
import { renderCUI } from "../../utils/test-utils";
import { selectOptions } from "./selectOptions";
interface Props extends Omit<SelectProps, "children" | "label"> {
  nodata?: ReactNode;
  showSearch?: boolean;
}
describe("Select", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });
  const renderSelect = (props: Props) => {
    if (props.options) {
      return renderCUI(
        <Select
          label="Test Select Label"
          {...props}
        />
      );
    }

    return renderCUI(
      <Select
        label="Test Select Label"
        {...props}
      >
        <Select.Group heading="Group label">
          <Select.Item value="content0">Content0</Select.Item>
        </Select.Group>
        <Select.Item value="content1">Content1 long text content</Select.Item>
        <Select.Item
          value="content2"
          disabled
        >
          Content2
        </Select.Item>
        <Select.Item value="content3">Content3</Select.Item>
        <Select.Item
          value="content4"
          label="Content4"
        />
      </Select>
    );
  };

  it("should open select on click", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeNull();
  });

  it("should show error", () => {
    const { queryByText } = renderSelect({
      error: "Select Error",
    });
    expect(queryByText("Select an option")).not.toBeNull();
    expect(queryByText("Select Error")).not.toBeNull();
  });

  it("should not open disabled select on click", () => {
    const { queryByText } = renderSelect({
      disabled: true,
    });
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).toBeNull();
  });

  it("should close select on clicking outside content", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);
    expect(queryByText("Content0")).toBeNull();
  });

  it("should prioritize external value over internal state", () => {
    const onSelect = vi.fn();
    const { queryByText, getByTestId, getByText } = renderSelect({
      value: "content0",
      onSelect,
    });
    const selectTrigger = getByTestId("select-trigger");
    expect(selectTrigger).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "Content0")).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "Content3")).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content3")).not.toBeNull();
    act(() => {
      getByText("Content3").click();
    });
    expect(onSelect).toBeCalledTimes(1);
    expect(queryByText("Content4")).toBeNull();
    expect(queryByTestingText(selectTrigger, "Content3")).toBeNull();
    expect(queryByTestingText(selectTrigger, "Content0")).not.toBeNull();
  });

  it("should react to external value change", () => {
    const { getByTestId, rerender } = renderCUI(
      <Select
        value="content0"
        options={selectOptions}
      />
    );
    const selectTrigger = getByTestId("select-trigger");
    expect(selectTrigger).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "Content0")).not.toBeNull();
    rerender(
      <Select
        value="content3"
        options={selectOptions}
      />
    );
    expect(queryByTestingText(selectTrigger, "Content3")).not.toBeNull();
  });

  it("shuold fall back to placeholder if value changes to undefined", () => {
    const { getByTestId, rerender } = renderCUI(
      <Select
        value="content0"
        placeholder="noop"
        options={selectOptions}
      />
    );
    const selectTrigger = getByTestId("select-trigger");
    expect(selectTrigger).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "noop")).toBeNull();
    rerender(
      <Select
        value={undefined}
        placeholder="noop"
        options={selectOptions}
      />
    );
    expect(queryByTestingText(selectTrigger, "noop")).not.toBeNull();
  });

  it("should respect given defaultValue in select", () => {
    const { getByTestId } = renderSelect({
      defaultValue: "content0",
    });
    const selectedValue = getByTestId("select-trigger");
    expect(selectedValue.textContent).toBe("Content0");
  });

  it("should render options", () => {
    const { queryByText, getByTestId } = renderSelect({
      options: selectOptions,
    });
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(getByTestId("select-trigger")).toHaveTextContent("Content0");
  });

  it("should render initially selected option with empty value", () => {
    const OPTION_TEXT = "Empty option";

    const { getByTestId } = renderSelect({
      value: "",
      options: [
        {
          value: "",
          label: OPTION_TEXT,
        },
      ],
    });

    const selectedValue = getByTestId("select-trigger");
    expect(selectedValue.textContent).toBe(OPTION_TEXT);
  });

  it("should render manually selected option with empty value", () => {
    const OPTION_TEXT = "Empty option";

    const { queryByText, getByTestId } = renderSelect({
      options: [
        {
          value: "",
          label: OPTION_TEXT,
        },
      ],
    });

    const selectTrigger = getByTestId("select-trigger");
    expect(selectTrigger).not.toBeNull();
    expect(selectTrigger.textContent).toBe("Select an option");
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText(OPTION_TEXT);
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(selectTrigger.textContent).toBe(OPTION_TEXT);
  });

  it("should close select on selecting item", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1 long text content")).toBeNull();
  });

  it("should not close select on selecting diabled item", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content2");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1 long text content")).not.toBeNull();
  });

  describe("onSearch enabled", () => {
    it("on open show all options", () => {
      const { queryByText } = renderSelect({
        showSearch: true,
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
    });

    it("filter by text", () => {
      const { queryByText, getByTestId } = renderSelect({
        showSearch: true,
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "content3" },
      });
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
    });

    it("filter by text in options", () => {
      const { queryByText, getByTestId } = renderSelect({
        options: selectOptions,
        showSearch: true,
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "content3" },
      });
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
    });

    it("on clear show all data", () => {
      const { queryByText, getByTestId } = renderSelect({
        showSearch: true,
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      const selectInput = getByTestId("select-search-input");
      fireEvent.change(selectInput, {
        target: { value: "content3" },
      });
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
      fireEvent.click(getByTestId("select-search-close"));
      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      expect(document.activeElement).toBe(selectInput);
    });
    it("on no options available show no data", () => {
      const { queryByText, getByTestId } = renderSelect({
        showSearch: true,
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "nodata" },
      });
      expect(queryByText("Content2")).toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
      const btn = queryByText(/No Options found/i);
      expect(btn).not.toBeNull();
      btn && fireEvent.click(btn);
      expect(btn).not.toBeNull();
    });
    it("on no options available show no custom data", () => {
      const onClick = vi.fn();
      const { queryByText, getByTestId } = renderSelect({
        showSearch: true,
        allowCreateOption: true,
        onSelect: onClick,
        customText: "No Field found {search}",
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "nodata" },
      });
      expect(queryByText("Content2")).toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
      const btn = queryByText(/No Field found/i);
      expect(btn).not.toBeNull();
      btn && fireEvent.click(btn);
      expect(onClick).toBeCalledTimes(1);
      expect(btn).not.toBeVisible();
    });

    it("replaces {search} token in customText", () => {
      const { queryByText, getByTestId } = renderSelect({
        showSearch: true,
        customText: "No results for {search}",
      });
      const selectTrigger = queryByText("Select an option");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      fireEvent.change(getByTestId("select-search-input"), {
        target: { value: "xyz" },
      });
      const emptyState = queryByText("No results for xyz");
      expect(emptyState).not.toBeNull();
    });
  });

  it("shows customText when options list is empty", () => {
    const { queryByText } = renderSelect({
      options: [],
      customText: "Nothing here",
    });
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Nothing here")).not.toBeNull();
  });

  it("renders a custom no options element", () => {
    const customNoOptionsComponent = ({ close }: { close: () => void }) => {
      return (
        <div>
          <span>No Options Custom</span>
          <button onClick={close}>Close</button>
        </div>
      );
    };
    const { queryByText } = renderSelect({
      options: [],
      noAvailableOptions: customNoOptionsComponent,
    });

    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("No Options Custom")).not.toBeNull();
    const closeBtn = queryByText("Close");
    expect(closeBtn).not.toBeNull();
    act(() => {
      closeBtn && closeBtn.click();
    });
    expect(queryByText("No Options Custom")).toBeNull();
  });
});
