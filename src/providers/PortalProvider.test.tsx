import { fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from '@/components/Dropdown';
import { Popover } from '@/components/Popover';
import { Select } from '@/components/Select';
import { Tooltip } from '@/components/Tooltip';
import { PortalProvider } from '@/providers';
import { renderCUI } from '@/utils/test-utils';

describe('PortalProvider', () => {
  let portalRoot: HTMLDivElement;

  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  beforeEach(() => {
    portalRoot = document.createElement('div');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    portalRoot.remove();
  });

  it('renders select content into the configured portal container', () => {
    const { getByTestId } = renderCUI(
      <PortalProvider container={portalRoot}>
        <Select
          options={[{ value: 'content0', label: 'Content0' }]}
          value={undefined}
        />
      </PortalProvider>
    );

    fireEvent.click(getByTestId('select-trigger'));

    expect(within(portalRoot).getByText('Content0')).not.toBeNull();
  });

  it('renders popover content into the configured portal container', () => {
    const { getByText } = renderCUI(
      <PortalProvider container={portalRoot}>
        <Popover>
          <Popover.Trigger>Open popover</Popover.Trigger>
          <Popover.Content>Portal popover</Popover.Content>
        </Popover>
      </PortalProvider>
    );

    fireEvent.click(getByText('Open popover'));

    expect(within(portalRoot).getByText('Portal popover')).not.toBeNull();
  });

  it('renders tooltip content into the configured portal container', () => {
    renderCUI(
      <PortalProvider container={portalRoot}>
        <Tooltip open>
          <Tooltip.Trigger>Tooltip trigger</Tooltip.Trigger>
          <Tooltip.Content>Portal tooltip</Tooltip.Content>
        </Tooltip>
      </PortalProvider>
    );

    expect(portalRoot).toHaveTextContent('Portal tooltip');
  });

  it('renders dropdown content into the configured portal container', async () => {
    const { getByText } = renderCUI(
      <PortalProvider container={portalRoot}>
        <Dropdown>
          <Dropdown.Trigger>Open dropdown</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Portal dropdown</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </PortalProvider>
    );

    await userEvent.click(getByText('Open dropdown'));

    expect(within(portalRoot).getByText('Portal dropdown')).not.toBeNull();
  });

  it('lets an explicit component container override the provider container', () => {
    const explicitRoot = document.createElement('div');
    document.body.appendChild(explicitRoot);

    const { getByText } = renderCUI(
      <PortalProvider container={portalRoot}>
        <Popover>
          <Popover.Trigger>Open explicit popover</Popover.Trigger>
          <Popover.Content container={explicitRoot}>Explicit popover</Popover.Content>
        </Popover>
      </PortalProvider>
    );

    fireEvent.click(getByText('Open explicit popover'));

    expect(within(explicitRoot).getByText('Explicit popover')).not.toBeNull();
    expect(portalRoot).not.toHaveTextContent('Explicit popover');

    explicitRoot.remove();
  });
});
