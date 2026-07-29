import { fireEvent } from '@testing-library/react';
import { ReactNode } from 'react';
import { Select } from '@/components/Select';
import { renderCUI } from '@/utils/test-utils';

/**
 * Search must match what the user actually sees. The text is read from the
 * rendered DOM, so it works regardless of how an item produces its text — a
 * child component, a number, or the `label` prop — none of which a static walk
 * of the React tree could recover.
 */

// A row whose visible text comes from a prop, not from string children.
const ServiceRow = ({ name }: { name: string }) => <span>{name}</span>;

const open = (getByTestId: (id: string) => HTMLElement) =>
  fireEvent.click(getByTestId('select-trigger'));

const type = (getByTestId: (id: string) => HTMLElement, query: string) =>
  fireEvent.change(getByTestId('select-search-input'), { target: { value: query } });

const renderChildren = (children: ReactNode) =>
  renderCUI(
    <Select
      label="s"
      showSearch
    >
      {children}
    </Select>
  );

describe('InternalSelect search', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  describe('children API', () => {
    it('matches plain string children', () => {
      const { getByTestId, queryByText } = renderChildren(
        <>
          <Select.Item value="a">Apple</Select.Item>
          <Select.Item value="b">Banana</Select.Item>
        </>
      );
      open(getByTestId);
      type(getByTestId, 'ban');
      expect(queryByText('Banana')).toBeVisible();
      expect(queryByText('Apple')).not.toBeVisible();
    });

    it('matches text supplied via the `label` prop', () => {
      const { getByTestId, queryByText } = renderChildren(
        <>
          <Select.Item
            value="a"
            label="Apple"
          />
          <Select.Item
            value="b"
            label="Banana"
          />
        </>
      );
      open(getByTestId);
      type(getByTestId, 'ban');
      expect(queryByText('Banana')).toBeVisible();
      expect(queryByText('Apple')).not.toBeVisible();
    });

    it('matches numeric children', () => {
      const { getByTestId, queryByText } = renderChildren(
        <>
          <Select.Item value="a">{2024}</Select.Item>
          <Select.Item value="b">{2025}</Select.Item>
        </>
      );
      open(getByTestId);
      type(getByTestId, '2025');
      expect(queryByText('2025')).toBeVisible();
      expect(queryByText('2024')).not.toBeVisible();
    });

    it('matches text rendered by a custom child component (the reported case)', () => {
      const { getByTestId, queryByText } = renderChildren(
        <>
          <Select.Item value="a">
            <ServiceRow name="Analytics" />
          </Select.Item>
          <Select.Item value="b">
            <ServiceRow name="Billing" />
          </Select.Item>
        </>
      );
      open(getByTestId);
      type(getByTestId, 'bill');
      expect(queryByText('Billing')).toBeVisible();
      expect(queryByText('Analytics')).not.toBeVisible();
    });

    it('restores every item when the search is cleared', () => {
      const { getByTestId, queryByText } = renderChildren(
        <>
          <Select.Item value="a">
            <ServiceRow name="Analytics" />
          </Select.Item>
          <Select.Item value="b">
            <ServiceRow name="Billing" />
          </Select.Item>
        </>
      );
      open(getByTestId);
      type(getByTestId, 'bill');
      expect(queryByText('Analytics')).not.toBeVisible();
      type(getByTestId, '');
      expect(queryByText('Analytics')).toBeVisible();
      expect(queryByText('Billing')).toBeVisible();
    });
  });

  describe('options API', () => {
    it('matches a label rendered by a custom component', () => {
      const { getByTestId, queryByText } = renderCUI(
        <Select
          label="s"
          showSearch
          options={[
            { value: 'a', label: <ServiceRow name="Analytics" /> },
            { value: 'b', label: <ServiceRow name="Billing" /> },
          ]}
        />
      );
      open(getByTestId);
      type(getByTestId, 'bill');
      expect(queryByText('Billing')).toBeVisible();
      expect(queryByText('Analytics')).not.toBeVisible();
    });

    it('makes options added while open searchable without reopening', () => {
      const { getByTestId, queryByText, rerender } = renderCUI(
        <Select
          label="s"
          showSearch
          options={[{ value: 'a', label: 'Apple' }]}
        />
      );
      open(getByTestId);
      rerender(
        <Select
          label="s"
          showSearch
          options={[
            { value: 'a', label: 'Apple' },
            { value: 'b', label: 'Banana' },
          ]}
        />
      );
      type(getByTestId, 'ban');
      expect(queryByText('Banana')).toBeVisible();
    });

    it('matches text in an option description', () => {
      const { getByTestId, queryByText } = renderCUI(
        <Select
          label="s"
          showSearch
          options={[
            { value: 'a', label: 'Apple', description: 'a red fruit' },
            { value: 'b', label: 'Banana', description: 'a yellow fruit' },
          ]}
        />
      );
      open(getByTestId);
      type(getByTestId, 'yellow');
      expect(queryByText('Banana')).toBeVisible();
      expect(queryByText('Apple')).not.toBeVisible();
    });
  });

  describe('group heading', () => {
    it('reveals a group’s items when the search matches its heading', () => {
      const { getByTestId, queryByText } = renderChildren(
        <>
          <Select.Group heading="Fruits">
            <Select.Item value="a">Apple</Select.Item>
            <Select.Item value="b">Banana</Select.Item>
          </Select.Group>
          <Select.Group heading="Vegetables">
            <Select.Item value="c">Carrot</Select.Item>
          </Select.Group>
        </>
      );
      open(getByTestId);
      type(getByTestId, 'fruit');
      expect(queryByText('Apple')).toBeVisible();
      expect(queryByText('Banana')).toBeVisible();
      expect(queryByText('Carrot')).not.toBeVisible();
    });
  });

  describe('keyboard navigation seed', () => {
    it('highlights the first item on open and selects it with Enter', () => {
      const onSelect = vi.fn();
      const { getByTestId } = renderCUI(
        <Select
          label="s"
          showSearch
          onSelect={onSelect}
        >
          <Select.Item value="a">Apple</Select.Item>
          <Select.Item value="b">Banana</Select.Item>
          <Select.Item value="c">Cherry</Select.Item>
        </Select>
      );
      open(getByTestId);
      const input = getByTestId('select-search-input');
      // seed highlights "a"; one ArrowDown moves to "b"
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onSelect).toHaveBeenCalledWith('b', undefined, expect.anything());
    });

    it('skips disabled options while navigating (options API)', () => {
      const onSelect = vi.fn();
      const { getByTestId } = renderCUI(
        <Select
          label="s"
          showSearch
          onSelect={onSelect}
          options={[
            { value: 'a', label: 'Apple' },
            { value: 'b', label: 'Banana', disabled: true },
            { value: 'c', label: 'Cherry' },
          ]}
        />
      );
      open(getByTestId);
      const input = getByTestId('select-search-input');
      // from the seeded "a", one ArrowDown must skip the disabled "b" to reach "c"
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onSelect).toHaveBeenCalledWith('c', undefined, expect.anything());
    });

    it('Enter selects a visible match after the prior highlight is filtered out', () => {
      const onSelect = vi.fn();
      const { getByTestId } = renderCUI(
        <Select
          label="s"
          showSearch
          onSelect={onSelect}
        >
          <Select.Item value="a">Apple</Select.Item>
          <Select.Item value="b">Banana</Select.Item>
          <Select.Item value="c">Cherry</Select.Item>
        </Select>
      );
      open(getByTestId);
      const input = getByTestId('select-search-input');
      fireEvent.keyDown(input, { key: 'ArrowDown' }); // highlight "b"
      fireEvent.change(input, { target: { value: 'cher' } }); // "b" no longer visible
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onSelect).toHaveBeenCalledWith('c', undefined, expect.anything());
    });
  });
});
