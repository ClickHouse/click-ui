import { renderCUI } from '@/utils/test-utils';
import { Collapsible } from '@/components/Collapsible';
import { fireEvent } from '@testing-library/react';

describe('Collapsible', () => {
  const onOpenChange = vi.fn();
  beforeEach(() => {
    onOpenChange.mockReset();
  });
  const renderCollapsible = () =>
    renderCUI(
      <Collapsible onOpenChange={onOpenChange}>
        <Collapsible.Header data-testid="collapsible-header">
          <Collapsible.Trigger data-testid="collapsible-trigger" />
          <div>Collapsible Header Text</div>
        </Collapsible.Header>
        <Collapsible.Content data-testid="collapsible-content">
          <div>This is a sample data to experiment the collapsible</div>
        </Collapsible.Content>
      </Collapsible>
    );

  it('should open collapsible on click trigger', () => {
    const { queryByTestId } = renderCollapsible();
    const collapsibleTrigger = queryByTestId('collapsible-trigger');
    expect(collapsibleTrigger).not.toBeNull();
    expect(queryByTestId('collapsible-content')).toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onOpenChange).toBeCalledTimes(1);

    expect(queryByTestId('collapsible-content')).not.toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onOpenChange).toBeCalledTimes(2);
    expect(queryByTestId('collapsible-content')).toBeNull();
  });

  it('should not open collapsible on click header and not trigger', () => {
    const { queryByTestId } = renderCollapsible();
    const collapsibleHeader = queryByTestId('collapsible-header');
    expect(collapsibleHeader).not.toBeNull();
    expect(queryByTestId('collapsible-content')).toBeNull();
    collapsibleHeader && fireEvent.click(collapsibleHeader);
    expect(onOpenChange).toBeCalledTimes(0);
    expect(queryByTestId('collapsible-content')).toBeNull();
  });
});
