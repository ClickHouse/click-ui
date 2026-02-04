import { act, fireEvent } from '@testing-library/react';
import { AutoComplete } from '@/components/AutoComplete/AutoComplete';
import type { AutoCompleteProps } from '@/components/AutoComplete/AutoComplete';
import { renderCUI } from '@/utils/test-utils';
import { selectOptions } from '../Select/selectOptions';
describe('AutoComplete', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });
  const renderAutocomplete = (props: Omit<AutoCompleteProps, 'label' | 'children'>) => {
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

  it('should open select on click', () => {
    const { queryByText, getByPlaceholderText } = renderAutocomplete({});
    const trigger = getByPlaceholderText('Search');
    expect(trigger).not.toBeNull();
    trigger && fireEvent.click(trigger);

    expect(queryByText('Content0')).not.toBeNull();
  });

  it('should show error', () => {
    const { queryByText, getByPlaceholderText } = renderAutocomplete({
      error: 'Select Error',
    });
    expect(getByPlaceholderText('Search')).not.toBeNull();
    expect(queryByText('Select Error')).not.toBeNull();
  });

  it('should not open disabled select on click', () => {
    const { queryByText, getByPlaceholderText } = renderAutocomplete({
      disabled: true,
    });
    const trigger = getByPlaceholderText('Search');
    expect(trigger).not.toBeNull();
    trigger && fireEvent.click(trigger);

    expect(queryByText('Content0')).toBeNull();
  });

  it('should close autocomplete when focus is on outside content', () => {
    const onOpenChange = vi.fn();
    const { queryByText, getByPlaceholderText } = renderAutocomplete({
      onOpenChange,
    });
    const trigger = getByPlaceholderText('Search');
    expect(trigger).not.toBeNull();
    trigger && fireEvent.click(trigger);

    expect(queryByText('Content0')).not.toBeNull();
    fireEvent.focus(document.body);
    expect(onOpenChange).toBeCalledTimes(2);
    expect(queryByText('Content0')).toBeNull();
  });

  it('should always respect given value in select', () => {
    const onSelect = vi.fn();
    const { queryByText, getByTestId, getByText } = renderAutocomplete({
      value: 'content0',
      onSelect,
    });
    const trigger = getByTestId('autocomplete-trigger');
    expect(trigger).not.toBeNull();
    trigger && fireEvent.click(trigger);

    expect(queryByText('Content3')).not.toBeNull();
    act(() => {
      getByText('Content3').click();
    });
    expect(onSelect).toBeCalledTimes(1);
  });

  it('should render options', () => {
    const { queryByText, getByPlaceholderText } = renderAutocomplete({
      options: selectOptions,
    });
    const trigger = getByPlaceholderText('Search');
    expect(trigger).not.toBeNull();
    trigger && fireEvent.click(trigger);

    const item = queryByText('Content0');
    expect(item).not.toBeNull();
  });

  it('should close select on selecting item', () => {
    const { queryByText, getByPlaceholderText } = renderAutocomplete({});
    const trigger = getByPlaceholderText('Search');
    expect(trigger).not.toBeNull();
    trigger && fireEvent.click(trigger);

    const item = queryByText('Content0');
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText('Content1 long text content')).toBeNull();
  });

  it('should not close select on selecting diabled item', () => {
    const { queryByText, getByPlaceholderText } = renderAutocomplete({});
    const trigger = getByPlaceholderText('Search');
    expect(trigger).not.toBeNull();
    trigger && fireEvent.click(trigger);

    const item = queryByText('Content2');
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText('Content1 long text content')).not.toBeNull();
  });

  describe('onSearch enabled', () => {
    it('on open show all options', () => {
      const { queryByText, getByPlaceholderText } = renderAutocomplete({});
      const trigger = getByPlaceholderText('Search');
      expect(trigger).not.toBeNull();
      trigger && fireEvent.click(trigger);

      expect(queryByText('Content0')).not.toBeNull();
      expect(queryByText('Content1 long text content')).not.toBeNull();
      expect(queryByText('Content2')).not.toBeNull();
      expect(queryByText('Content3')).not.toBeNull();
      expect(queryByText('Content4')).not.toBeNull();
    });

    it('filter by text', () => {
      const { queryByText, getByRole, getByPlaceholderText } = renderAutocomplete({});
      const trigger = getByPlaceholderText('Search');
      expect(trigger).not.toBeNull();
      trigger && fireEvent.click(trigger);

      expect(queryByText('Group label')).toBeVisible();
      expect(queryByText('Content0')).not.toBeNull();
      expect(queryByText('Content1 long text content')).not.toBeNull();
      expect(queryByText('Content2')).not.toBeNull();
      expect(queryByText('Content3')).not.toBeNull();
      expect(queryByText('Content4')).not.toBeNull();
      fireEvent.change(getByRole('textbox'), {
        target: { value: 'content3' },
      });
      expect(queryByText('Content3')).not.toBeNull();
      expect(queryByText('Content1 long text content')).toBeNull();
      expect(queryByText('Group label')).not.toBeVisible();
    });

    it('filter by text in options', () => {
      const { queryByText, getByRole, getByPlaceholderText } = renderAutocomplete({
        options: selectOptions,
      });
      const trigger = getByPlaceholderText('Search');
      expect(trigger).not.toBeNull();
      trigger && fireEvent.click(trigger);

      expect(queryByText('Group label')).toBeVisible();
      expect(queryByText('Content0')).not.toBeNull();
      expect(queryByText('Content1 long text content')).not.toBeNull();
      expect(queryByText('Content2')).not.toBeNull();
      expect(queryByText('Content3')).not.toBeNull();
      expect(queryByText('Content4')).not.toBeNull();
      fireEvent.change(getByRole('textbox'), {
        target: { value: 'content3' },
      });
      expect(queryByText('Content3')).not.toBeNull();
      expect(queryByText('Content1 long text content')).toBeNull();
      expect(queryByText('Group label')).not.toBeVisible();
    });

    it('on clear show all data', () => {
      const { queryByText, getByTestId, getByPlaceholderText } = renderAutocomplete({});
      const trigger = getByPlaceholderText('Search');
      expect(trigger).not.toBeNull();
      trigger && fireEvent.click(trigger);

      fireEvent.change(trigger, {
        target: { value: 'content3' },
      });
      expect(queryByText('Content3')).not.toBeNull();
      expect(queryByText('Content1 long text content')).toBeNull();
      expect(queryByText('Group label')).not.toBeVisible();
      fireEvent.click(getByTestId('textfield-clear'));
      expect(queryByText('Group label')).toBeVisible();
      expect(queryByText('Content0')).not.toBeNull();
      expect(queryByText('Content1 long text content')).not.toBeNull();
      expect(queryByText('Content2')).not.toBeNull();
      expect(queryByText('Content3')).not.toBeNull();
      expect(queryByText('Content4')).not.toBeNull();
      expect(document.activeElement).toBe(trigger);
    });

    it('on no options available show no data', () => {
      const { queryByText, getByRole, getByPlaceholderText } = renderAutocomplete({});
      const trigger = getByPlaceholderText('Search');
      expect(trigger).not.toBeNull();
      trigger && fireEvent.click(trigger);

      fireEvent.change(getByRole('textbox'), {
        target: { value: 'nodata' },
      });
      expect(queryByText('Content2')).toBeNull();
      expect(queryByText('Content1 long text content')).toBeNull();
      expect(queryByText('Group label')).not.toBeVisible();
      const btn = queryByText(/No Options found/i);
      expect(btn).not.toBeNull();
      btn && fireEvent.click(btn);
      expect(btn).not.toBeNull();
    });
  });
});
