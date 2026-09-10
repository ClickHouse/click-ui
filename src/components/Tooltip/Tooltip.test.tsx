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

  it('renders a button trigger by default', () => {
    const { getByRole } = renderTooltip({});
    expect(getByRole('button', { name: 'Hover Here' })).toHaveAttribute('type', 'button');
  });

  it('should open tooltip on hover', async () => {
    const { getAllByText, findAllByText } = renderTooltip({});
    const TooltipTrigger = getAllByText('Hover Here');
    expect(TooltipTrigger.length).toEqual(1);
    await userEvent.hover(TooltipTrigger[0]);
    expect(await findAllByText('Tooltip content')).not.toBeNull();
  });

  it('should open tooltip on keyboard focus', async () => {
    const { getByRole, findByTestId } = renderTooltip({});
    await userEvent.tab();
    expect(getByRole('button', { name: 'Hover Here' })).toHaveFocus();
    expect(await findByTestId('tooltip-content')).not.toBeNull();
  });

  it('uses the child as the trigger when asChild is set', () => {
    const { getByRole, queryByRole } = renderCUI(
      <Tooltip>
        <Tooltip.Trigger asChild>
          <a href="#section">Link trigger</a>
        </Tooltip.Trigger>
        <Tooltip.Content>Tooltip content</Tooltip.Content>
      </Tooltip>
    );
    expect(getByRole('link', { name: 'Link trigger' })).not.toBeNull();
    expect(queryByRole('button')).toBeNull();
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
});
