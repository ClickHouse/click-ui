import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { renderCUI } from '@/utils/test-utils';
import { Collapsible } from '@/components/Collapsible';
import { fireEvent } from '@testing-library/react';
import styles from './Collapsible.module.css';

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

describe('Collapsible focus styles', () => {
  it('renders the trigger with the module class that carries the focus ring', () => {
    const { container } = renderCUI(
      <Collapsible>
        <Collapsible.Header>
          <Collapsible.Trigger data-testid="collapsible-trigger" />
        </Collapsible.Header>
      </Collapsible>
    );
    const trigger = container.querySelector('[data-testid="collapsible-trigger"]');
    expect(trigger).not.toBeNull();
    expect(trigger).toHaveClass(styles.collapsible__trigger);
  });

  it('shows a focus-visible outline on the trigger', () => {
    // Trigger is an EmptyButton, which sets `outline: none`; the module must restore a focus ring.
    // Vitest runs from the repo root; read the stylesheet source directly.
    const css = readFileSync(
      resolve(process.cwd(), 'src/components/Collapsible/Collapsible.module.css'),
      'utf8'
    );
    expect(css).toMatch(
      /\.collapsible__trigger:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--click-global-color-outline-default\)/
    );
  });
});
