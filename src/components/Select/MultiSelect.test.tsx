import {act, fireEvent, queryByText as queryByTestingText,} from "@testing-library/react";
import {MultiSelect, MultiSelectProps} from "@/components";
import {ReactNode} from "react";
import {renderCUI} from "@/utils/test-utils";
import {selectOptions} from "./selectOptions";

interface Props extends Omit<MultiSelectProps, "children" | "label"> {
  nodata?: ReactNode;
  showSearch?: boolean;
}
describe("MultiSelect", () => {
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
        <MultiSelect
          label="Test MultiSelect Label"
          {...props}
        />
      );
    }

    return renderCUI(
      <MultiSelect
        label="Test MultiSelect Label"
        {...props}
      >
        <MultiSelect.Group heading="Group label">
          <MultiSelect.Item value="content0">Content0</MultiSelect.Item>
        </MultiSelect.Group>
        <MultiSelect.Item value="content1">Content1 long text content</MultiSelect.Item>
        <MultiSelect.Item
          value="content2"
          disabled
        >
          Content2
        </MultiSelect.Item>
        <MultiSelect.Item value="content3">Content3</MultiSelect.Item>
        <MultiSelect.Item
          value="content4"
          label="Content4"
        />
      </MultiSelect>
    );
  };

  it("should open select on click", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeNull();
  });

  it("should always respect given value in select", () => {
    const onSelect = vi.fn();
    const { queryByText, getByTestId, getByText } = renderSelect({
      value: ["content0", "content1"],
      onSelect,
    });
    const selectTrigger = getByTestId("select-trigger");
    expect(selectTrigger).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "Content0")).not.toBeNull();
    expect(
      queryByTestingText(selectTrigger, "Content1 long text content")
    ).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "Content3")).toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content3")).not.toBeNull();
    act(() => {
      getByText("Content3").click();
    });
    expect(onSelect).toBeCalledTimes(1);
    expect(queryByTestingText(selectTrigger, "Content3")).toBeNull();
  });

  it("should respect given defaultValue in select", () => {
    const { getByTestId } = renderSelect({
      defaultValue: ["content0", "content2"],
    });
    const selectTrigger = getByTestId("select-trigger");
    expect(selectTrigger).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "Content0")).not.toBeNull();
    expect(queryByTestingText(selectTrigger, "Content2")).not.toBeNull();
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

  it("should close select on selecting item", () => {
    const { queryByText, getByTestId } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content0");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(getByTestId("select-trigger")).toHaveTextContent("Content0");
  });

  it("should not close select on selecting diabled item", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Select an option");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content4");
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText("Content1 long text content")).not.toBeNull();
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
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).not.toBeNull();
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
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).not.toBeNull();
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
        target: { value: "content2" },
      });
      expect(queryByText("Content2")).not.toBeNull();
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
      expect(getByTestId("select-trigger")).toHaveTextContent("nodata");
    });
  });
});
