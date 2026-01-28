import { TooltipProps } from './Tooltip';
import { Tooltip } from '..';
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
    const { getAllByText } = renderTooltip({});
    const TooltipTrigger = getAllByText('Hover Here');
    expect(TooltipTrigger.length).toEqual(1);
    await userEvent.hover(TooltipTrigger[0]);
    expect(getAllByText('Tooltip content')).not.toBeNull();
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
    const { getByText, getAllByText, getByTestId } = renderTooltip({});
    const TooltipTrigger = getByText('Hover Here');
    expect(TooltipTrigger).not.toBeNull();
    await userEvent.hover(TooltipTrigger);
    expect(getAllByText('Tooltip content')).not.toBeNull();
    await userEvent.unhover(TooltipTrigger);
    waitFor(() => {
      expect(getByTestId('tooltip-content')).toBeNull();
    });
  });
});
