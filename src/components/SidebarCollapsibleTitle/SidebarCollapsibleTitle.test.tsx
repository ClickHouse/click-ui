import { fireEvent } from '@testing-library/react';
import { SidebarCollapsibleTitle } from '@/components/SidebarCollapsibleTitle';
import { renderCUI } from '@/utils/test-utils';

describe('SidebarCollapsibleTitle', () => {
  it('should trigger toggle on clicking trigger', () => {
    const onOpenChange = vi.fn();
    const { queryByTestId } = renderCUI(
      <SidebarCollapsibleTitle
        icon="user"
        label="collapsible item"
        onOpenChange={onOpenChange}
        data-testid="collapsible-header"
      >
        <div data-testid="collapsible-content">Sidebar nav content</div>
      </SidebarCollapsibleTitle>
    );
    const collapsibleHeader = queryByTestId('collapsible-header');
    expect(collapsibleHeader).not.toBeNull();
    expect(queryByTestId('collapsible-content')).toBeNull();
    collapsibleHeader && fireEvent.click(collapsibleHeader);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
    expect(queryByTestId('collapsible-content')).not.toBeNull();
  });

  it('should name the trigger by its label and expose its open state', () => {
    const { getByTestId } = renderCUI(
      <SidebarCollapsibleTitle
        label="Services"
        data-testid="collapsible-header"
      >
        <div>Sidebar nav content</div>
      </SidebarCollapsibleTitle>
    );
    const trigger = getByTestId('collapsible-header');
    expect(trigger).toHaveAccessibleName('Services');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
