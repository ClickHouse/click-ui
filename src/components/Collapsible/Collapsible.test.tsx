import { renderCUI } from '@/utils/test-utils';
import { Collapsible } from '@/components/Collapsible';
import { fireEvent, within } from '@testing-library/react';

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
    expect(onOpenChange).toHaveBeenCalledTimes(1);

    expect(queryByTestId('collapsible-content')).not.toBeNull();
    collapsibleTrigger && fireEvent.click(collapsibleTrigger);
    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(queryByTestId('collapsible-content')).toBeNull();
  });

  it('should expose the open state on the trigger with aria-expanded', () => {
    const { getByTestId } = renderCollapsible();
    const collapsibleTrigger = getByTestId('collapsible-trigger');
    expect(collapsibleTrigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(collapsibleTrigger);
    expect(collapsibleTrigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(collapsibleTrigger);
    expect(collapsibleTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should give an icon-only trigger a generic accessible name', () => {
    const { getByTestId } = renderCollapsible();
    expect(getByTestId('collapsible-trigger')).toHaveAccessibleName('Toggle section');
  });

  it('should name a trigger with visible text by that text', () => {
    const { container } = renderCUI(
      <Collapsible>
        <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>
      </Collapsible>
    );
    expect(
      within(container).getByRole('button', { name: 'Advanced settings' })
    ).toBeInTheDocument();
  });

  it('should let consumers override the trigger name with aria-label', () => {
    const { container } = renderCUI(
      <Collapsible>
        <Collapsible.Trigger aria-label="Show query details" />
      </Collapsible>
    );
    expect(
      within(container).getByRole('button', { name: 'Show query details' })
    ).toBeInTheDocument();
  });

  it('should not open collapsible on click header and not trigger', () => {
    const { queryByTestId } = renderCollapsible();
    const collapsibleHeader = queryByTestId('collapsible-header');
    expect(collapsibleHeader).not.toBeNull();
    expect(queryByTestId('collapsible-content')).toBeNull();
    collapsibleHeader && fireEvent.click(collapsibleHeader);
    expect(onOpenChange).toHaveBeenCalledTimes(0);
    expect(queryByTestId('collapsible-content')).toBeNull();
  });
});
