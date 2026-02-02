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
    expect(onClick).toBeCalledTimes(1);
  });
});
