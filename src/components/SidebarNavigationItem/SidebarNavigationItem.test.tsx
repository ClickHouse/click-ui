import { createRef } from 'react';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SidebarNavigationItem } from '@/components/SidebarNavigationItem';
import { renderCUI } from '@/utils/test-utils';

describe('SidebarNavigationItem', () => {
  it('should trigger click', () => {
    const onClick = vi.fn();

    const { queryByTestId } = renderCUI(
      <SidebarNavigationItem
        icon="user"
        onClick={onClick}
        data-testid="non-collapsible-side-nav-item"
        label="Non-collapsible side-nav-item"
      />
    );
    const collapsibleTrigger = queryByTestId('non-collapsible-side-nav-item');
    expect(collapsibleTrigger).not.toBeNull();
    expect(queryByTestId('collapsible-content')).toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe('asChild', () => {
    it('marks the selected link as the current page', () => {
      const { getByRole } = renderCUI(
        <SidebarNavigationItem
          asChild
          selected
          icon="table"
        >
          <a href="/tables">Tables</a>
        </SidebarNavigationItem>
      );
      // The icon is decorative: the name stays "Tables", not "table Tables".
      expect(getByRole('link', { name: 'Tables' })).toHaveAttribute(
        'aria-current',
        'page'
      );
    });

    it('keeps a consumer aria-current', () => {
      const { getByRole } = renderCUI(
        <SidebarNavigationItem
          asChild
          selected
        >
          <a
            href="/tables"
            aria-current="location"
          >
            Tables
          </a>
        </SidebarNavigationItem>
      );
      expect(getByRole('link', { name: 'Tables' })).toHaveAttribute(
        'aria-current',
        'location'
      );
    });

    it('moves Tab focus to the link', async () => {
      const { getByRole } = renderCUI(
        <SidebarNavigationItem asChild>
          <a href="/tables">Tables</a>
        </SidebarNavigationItem>
      );
      await userEvent.tab();
      expect(getByRole('link', { name: 'Tables' })).toHaveFocus();
    });

    it('forwards the ref to the link', () => {
      const ref = createRef<HTMLDivElement>();
      renderCUI(
        <SidebarNavigationItem
          asChild
          ref={ref}
        >
          <a href="/tables">Tables</a>
        </SidebarNavigationItem>
      );
      expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
    });

    it('disables the link and cancels its navigation', async () => {
      const onClick = vi.fn();
      const { getByRole } = renderCUI(
        <SidebarNavigationItem
          asChild
          disabled
          onClick={onClick}
        >
          <a href="/tables">Tables</a>
        </SidebarNavigationItem>
      );
      const link = getByRole('link', { name: 'Tables' });
      expect(link).toHaveAttribute('aria-disabled', 'true');
      await userEvent.tab();
      expect(link).not.toHaveFocus();
      expect(fireEvent.click(link)).toBe(false);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
