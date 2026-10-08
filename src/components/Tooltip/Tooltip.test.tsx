import { createRef } from 'react';
import { TooltipProps } from '@/components/Tooltip';
import { Tooltip } from './Tooltip';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderCUI } from '@/utils/test-utils';

describe('Tooltip', () => {
  const renderTooltip = (props: TooltipProps) =>
    renderCUI(
      <Tooltip {...props}>
        <Tooltip.Trigger>Hover Here</Tooltip.Trigger>
        <Tooltip.Content data-testid="tooltip-content">Tooltip content</Tooltip.Content>
      </Tooltip>
    );

  it('should open tooltip on hover', async () => {
    const { getAllByText, findAllByText } = renderTooltip({});
    const TooltipTrigger = getAllByText('Hover Here');
    expect(TooltipTrigger.length).toEqual(1);
    await userEvent.hover(TooltipTrigger[0]);
    expect(await findAllByText('Tooltip content')).not.toBeNull();
  });

  it('should show the tooltip if the open prop is true', async () => {
    const { getAllByText } = renderTooltip({ open: true });
    expect(getAllByText('Tooltip content')).not.toBeNull();
  });

  it('should not open tooltip on hover if it is disabled', async () => {
    const { queryAllByText } = renderTooltip({ disabled: true });
    const TooltipTrigger = queryAllByText('Hover Here');
    expect(TooltipTrigger.length).toEqual(1);
    await userEvent.hover(TooltipTrigger[0]);
    expect(queryAllByText('Tooltip content').length).toEqual(0);
  });

  it('should close hover card on pointerLeave', async () => {
    const { getByText, findAllByText, getByTestId } = renderTooltip({});
    const TooltipTrigger = getByText('Hover Here');
    expect(TooltipTrigger).not.toBeNull();
    await userEvent.hover(TooltipTrigger);
    expect(await findAllByText('Tooltip content')).not.toBeNull();
    await userEvent.unhover(TooltipTrigger);
    waitFor(() => {
      expect(getByTestId('tooltip-content')).toBeNull();
    });
  });

  describe('Trigger', () => {
    it('passes its props to the child with asChild', () => {
      const { getByRole } = renderCUI(
        <Tooltip>
          <Tooltip.Trigger
            asChild
            aria-label="Copy query"
          >
            <button type="button">Copy</button>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      );
      expect(getByRole('button', { name: 'Copy query' })).toBeInTheDocument();
    });

    it("calls its onClick together with the child's onClick with asChild", async () => {
      const onTriggerClick = vi.fn();
      const onChildClick = vi.fn();
      const { getByRole } = renderCUI(
        <Tooltip>
          <Tooltip.Trigger
            asChild
            onClick={onTriggerClick}
          >
            <button
              type="button"
              onClick={onChildClick}
            >
              Copy
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      );
      await userEvent.click(getByRole('button', { name: 'Copy' }));
      expect(onChildClick).toHaveBeenCalledTimes(1);
      expect(onTriggerClick).toHaveBeenCalledTimes(1);
    });

    it('points its ref at the child with asChild', () => {
      const ref = createRef<HTMLButtonElement>();
      const { getByRole } = renderCUI(
        <Tooltip>
          <Tooltip.Trigger
            asChild
            ref={ref}
          >
            <button type="button">Copy</button>
          </Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      );
      expect(ref.current).toBe(getByRole('button', { name: 'Copy' }));
    });

    it('passes its props to the wrapper element without asChild', () => {
      const { getByText } = renderCUI(
        <Tooltip>
          <Tooltip.Trigger id="trigger-id">Hover Here</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      );
      expect(getByText('Hover Here')).toHaveAttribute('id', 'trigger-id');
    });

    it('points its ref at the wrapper element without asChild', () => {
      const ref = createRef<HTMLDivElement>();
      const { getByText } = renderCUI(
        <Tooltip>
          <Tooltip.Trigger ref={ref}>Hover Here</Tooltip.Trigger>
          <Tooltip.Content>Tooltip content</Tooltip.Content>
        </Tooltip>
      );
      expect(ref.current).toBe(getByText('Hover Here'));
    });
  });
});
