import { act, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AutoComplete, AutoCompleteProps } from "./AutoComplete";
import { renderCUI } from "@/utils/test-utils";
import { selectOptions } from "../Select/selectOptions";
describe("AutoComplete", () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });
  const renderSelect = (props: Omit<AutoCompleteProps, "label" | "children">) => {
    if (props.options) {
      return renderCUI(
        <AutoComplete
          label="Test Select Label"
          {...props}
          children={undefined}
        />
      );
    }

    return renderCUI(
      <AutoComplete
        label="Test Select Label"
        {...props}
        options={undefined}
      >
        <AutoComplete.Group heading="Group label">
          <AutoComplete.Item value="content0">Content0</AutoComplete.Item>
        </AutoComplete.Group>
        <AutoComplete.Item value="content1">Content1 long text content</AutoComplete.Item>
        <AutoComplete.Item
          value="content2"
          disabled
        >
          Content2
        </AutoComplete.Item>
        <AutoComplete.Item value="content3">Content3</AutoComplete.Item>
        <AutoComplete.Item
          value="content4"
          label="Content4"
        />
      </AutoComplete>
    );
  };

  it("should open select on click", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Search");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeNull();
  });

  it("should show error", () => {
    const { queryByText } = renderSelect({
      error: "Select Error",
    });
    expect(queryByText("Search")).not.toBeNull();
    expect(queryByText("Select Error")).not.toBeNull();
  });

  it("should not open disabled select on click", () => {
    const { queryByText } = renderSelect({
      disabled: true,
    });
    const selectTrigger = queryByText("Search");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).toBeNull();
  });

  it("should close select on clicking outside content", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Search");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content0")).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);
    expect(queryByText("Content0")).toBeNull();
  });

  it("should always respect given value in select", () => {
    const onSelect = jest.fn();
    const { queryByText, getByTestId, getByText } = renderSelect({
      value: "content0",
      onSelect,
    });
    const selectTrigger = getByTestId("autocomplete-trigger");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    expect(queryByText("Content3")).not.toBeNull();
    act(() => {
      getByText("Content3").click();
    });
    expect(onSelect).toBeCalledTimes(1);
  });

  it("should render options", () => {
    const { queryByText } = renderSelect({
      options: selectOptions,
    });
    const selectTrigger = queryByText("Search");
    expect(selectTrigger).not.toBeNull();
    selectTrigger && fireEvent.click(selectTrigger);

    const item = queryByText("Content0");
    expect(item).not.toBeNull();
  });

  it("should close select on selecting item", () => {
    const { queryByText } = renderSelect({});
    const selectTrigger = queryByText("Search");
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
    const selectTrigger = queryByText("Search");
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
      const { queryByText } = renderSelect({});
      const selectTrigger = queryByText("Search");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
    });

    it("filter by text", () => {
      const { queryByText, getByRole } = renderSelect({});
      const selectTrigger = queryByText("Search");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      fireEvent.change(getByRole("textbox"), {
        target: { value: "content3" },
      });
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
    });

    it("filter by text in options", () => {
      const { queryByText, getByRole } = renderSelect({
        options: selectOptions,
      });
      const selectTrigger = queryByText("Search");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      fireEvent.change(getByRole("textbox"), {
        target: { value: "content3" },
      });
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
    });

    it("on clear show all data", () => {
      const { queryByText, getByTestId, getByRole } = renderSelect({});
      const selectTrigger = queryByText("Search");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      const selectInput = getByRole("textbox");
      fireEvent.change(selectInput, {
        target: { value: "content3" },
      });
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content1 long text content")).toBeNull();
      expect(queryByText("Group label")).not.toBeVisible();
      fireEvent.click(getByTestId("search-close"));
      expect(queryByText("Group label")).toBeVisible();
      expect(queryByText("Content0")).not.toBeNull();
      expect(queryByText("Content1 long text content")).not.toBeNull();
      expect(queryByText("Content2")).not.toBeNull();
      expect(queryByText("Content3")).not.toBeNull();
      expect(queryByText("Content4")).not.toBeNull();
      expect(document.activeElement).toBe(selectInput);
    });

    it("on no options available show no data", () => {
      const { queryByText, getByRole } = renderSelect({});
      const selectTrigger = queryByText("Search");
      expect(selectTrigger).not.toBeNull();
      selectTrigger && fireEvent.click(selectTrigger);

      fireEvent.change(getByRole("textbox"), {
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
  });
});
