import { fireEvent } from '@testing-library/react';
import { SidebarNavigationTitle } from '@/components/SidebarNavigationTitle';
import { renderCUI } from '@/utils/test-utils';
describe('SidebarNavigationTitle', () => {
  it('should trigger click', () => {
    const onClick = vi.fn();

    const { queryByTestId } = renderCUI(
      <SidebarNavigationTitle
        icon="user"
        onClick={onClick}
        data-testid="non-collapsible-side-nav-title"
        label="Non-collapsible side-nav-title"
      />
    );
    const collapsibleTrigger = queryByTestId('non-collapsible-side-nav-title');
    expect(collapsibleTrigger).not.toBeNull();
    expect(queryByTestId('collapsible-content')).toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onClick).toBeCalledTimes(1);
  });
});
