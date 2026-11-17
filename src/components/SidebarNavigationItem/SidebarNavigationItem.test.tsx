import { fireEvent } from '@testing-library/react';
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

    it('disables the link and cancels its navigation', () => {
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
      expect(link).toHaveAttribute('tabindex', '-1');
      expect(fireEvent.click(link)).toBe(false);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
