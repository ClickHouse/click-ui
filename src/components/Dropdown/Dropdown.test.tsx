import { fireEvent, waitFor, within } from '@testing-library/react';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Button } from '@/components/Button';
import { Dropdown } from '@/components/Dropdown';
import { IconButton } from '@/components/IconButton';
import { renderCUI } from '@/utils/test-utils';

interface Props extends DropdownMenuProps {
  disabled?: boolean;
}

describe('Dropdown', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    global.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
  });
  const renderDropdown = ({ disabled, ...props }: Props) =>
    renderCUI(
      <Dropdown {...props}>
        <Dropdown.Trigger disabled={disabled}>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Group>
            <Dropdown.Item>Content0</Dropdown.Item>
          </Dropdown.Group>
          <Dropdown.Item>Content1 long text content</Dropdown.Item>
          <Dropdown.Sub>
            <Dropdown.Trigger sub>Hover over</Dropdown.Trigger>
            <Dropdown.Content sub>
              <Dropdown.Item>SubContent0</Dropdown.Item>
              <Dropdown.Item>SubContent1</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Sub>
          <Dropdown.Item>Content2</Dropdown.Item>
          <Dropdown.Item disabled>Content3</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

  it('should open dropdown on pointer', async () => {
    const { getByText } = renderDropdown({});
    const dropdownTrigger = getByText('Dropdown Trigger');
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(getByText('Content0')).not.toBeNull();
  });

  it('should not open disabled dropdown on pointer', async () => {
    const { getByText, queryByText } = renderDropdown({
      disabled: true,
    });
    const dropdownTrigger = getByText('Dropdown Trigger');
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(queryByText('Content0')).toBeNull();
  });

  it('should close dropdown on pointering outside content', async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText('Dropdown Trigger');
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(queryByText('Content0')).not.toBeNull();
    fireEvent.pointerDown(dropdownTrigger, {
      ctrlKey: false,
      button: 0,
    });
    expect(queryByText('Content0')).toBeNull();
  });

  it('should close dropdown on selecting item', async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText('Dropdown Trigger');
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);
    expect(getByText('Content0')).not.toBeNull();
    const item = queryByText('Content0');
    expect(item).not.toBeNull();
    item && fireEvent.click(item);
    expect(item).not.toBeNull();
    expect(queryByText('Content1')).toBeNull();
  });

  it('should open submenu dropdown on selecting item with subcontent', async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText('Dropdown Trigger');
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);

    expect(queryByText('Content0')).not.toBeNull();
    const item = getByText('Hover over');
    expect(item).not.toBeNull();
    await userEvent.hover(item);
    await waitFor(() => {
      expect(queryByText('SubContent0')).not.toBeNull();
    });
    expect(item).not.toBeNull();
  });

  it('should close dropdown on selecting sub item', async () => {
    const { getByText, queryByText } = renderDropdown({});
    const dropdownTrigger = getByText('Dropdown Trigger');
    expect(dropdownTrigger).not.toBeNull();
    await userEvent.click(dropdownTrigger);

    expect(queryByText('Content0')).not.toBeNull();
    const item = queryByText('Hover over');
    item && (await userEvent.hover(item));
    await waitFor(() => {
      expect(queryByText('SubContent0')).not.toBeNull();
    });
    expect(item).not.toBeNull();
    const subItem = queryByText('SubContent0');
    subItem && fireEvent.click(subItem);
    await waitFor(() => {
      expect(queryByText('SubContent1')).toBeNull();
    });
    expect(queryByText('Content0')).toBeNull();
  });

  it('should not close dropdown on selecting disabled item', async () => {
    const { getByText, queryByText } = renderDropdown({});
    await userEvent.click(getByText('Dropdown Trigger'));

    await userEvent.click(getByText('Content3'));

    expect(queryByText('Content2')).not.toBeNull();
  });

  it('should render item with danger type', async () => {
    const { getByText, queryByText } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item type="default">Default Item</Dropdown.Item>
          <Dropdown.Item type="danger">Danger Item</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    const dropdownTrigger = getByText('Dropdown Trigger');
    await userEvent.click(dropdownTrigger);

    const defaultItem = queryByText('Default Item');
    const dangerItem = queryByText('Danger Item');

    expect(defaultItem).not.toBeNull();
    expect(dangerItem).not.toBeNull();
  });

  it('should keep a submenu open when Dropdown.Sub is controlled with open', async () => {
    const { getByText, queryByText } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Sub
            open
            onOpenChange={vi.fn()}
          >
            <Dropdown.Trigger sub>More</Dropdown.Trigger>
            <Dropdown.Content sub>
              <Dropdown.Item>Nested item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Sub>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));

    // Nothing hovers "More": the submenu is open only because `open` reached Radix.
    await waitFor(() => {
      expect(queryByText('Nested item')).not.toBeNull();
    });
  });

  it('should call onOpenChange when a Dropdown.Sub opens', async () => {
    const onOpenChange = vi.fn();
    const { getByText } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Sub onOpenChange={onOpenChange}>
            <Dropdown.Trigger sub>More</Dropdown.Trigger>
            <Dropdown.Content sub>
              <Dropdown.Item>Nested item</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Sub>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));
    await userEvent.hover(getByText('More'));

    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  it('should render the child element as the menu item when asChild is set', async () => {
    const { getByText, getByRole } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item asChild>
            <a href="https://docs.example/">Docs</a>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));

    const item = getByRole('menuitem', { name: 'Docs' });
    expect(item.tagName).toBe('A');
    expect(item).toHaveAttribute('href', 'https://docs.example/');
  });

  it('should render the item icon inside the asChild element', async () => {
    const { getByText, getByRole } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item
            asChild
            icon="user"
          >
            <a href="https://docs.example/">Docs</a>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));

    const item = getByRole('menuitem', { name: /Docs/ });
    expect(item.tagName).toBe('A');
    expect(within(item).getByRole('img', { name: 'user' })).toBeInTheDocument();
  });

  it('should reject more than one child when asChild is set', () => {
    const twoChildren = (
      // @ts-expect-error asChild takes exactly one element child
      <Dropdown.Item asChild>
        <a href="https://a.example/">A</a>
        <a href="https://b.example/">B</a>
      </Dropdown.Item>
    );
    expect(twoChildren).toBeDefined();
  });

  it('should activate an asChild link from the keyboard', async () => {
    const onLinkClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
    const { getByText } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item asChild>
            <a
              href="https://docs.example/"
              onClick={onLinkClick}
            >
              Docs
            </a>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));
    await userEvent.keyboard('{ArrowDown}{Enter}');

    expect(onLinkClick).toHaveBeenCalledTimes(1);
  });

  it('should mark a disabled asChild link as disabled', async () => {
    const { getByText, getByRole } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item
            asChild
            disabled
          >
            <a href="https://docs.example/">Docs</a>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));

    const item = getByRole('menuitem', { name: 'Docs' });
    expect(item.tagName).toBe('A');
    expect(item).toHaveAttribute('aria-disabled', 'true');
    expect(item).toHaveAttribute('data-disabled');
  });

  describe('trigger', () => {
    const renderButtonTrigger = (props: DropdownMenuProps) =>
      renderCUI(
        <Dropdown {...props}>
          <Dropdown.Trigger>
            <Button data-testid="consumer-button">Actions</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

    it('puts the menu-button attributes on the consumer button that takes focus', async () => {
      const { getByTestId } = renderButtonTrigger({});
      const trigger = getByTestId('consumer-button');

      await userEvent.tab();

      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await userEvent.keyboard('{Enter}');
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders text children as a focusable menu button', async () => {
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      await userEvent.tab();

      const trigger = getByRole('button', { name: 'Dropdown Trigger' });
      expect(trigger).toHaveFocus();
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('marks a disabled text trigger with aria-disabled', () => {
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger disabled>Dropdown Trigger</Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      const trigger = getByRole('button', { name: 'Dropdown Trigger' });
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
    });

    it('marks a disabled native button child with aria-disabled', () => {
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger disabled>
            <button>Actions</button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      const trigger = getByRole('button', { name: 'Actions' });
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
    });

    it('keeps a Button child from submitting its form', async () => {
      const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
      const { getByRole, findByRole } = renderCUI(
        <form onSubmit={onSubmit}>
          <Dropdown>
            <Dropdown.Trigger>
              <Button>Actions</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Rename</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </form>
      );

      await userEvent.click(getByRole('button', { name: 'Actions' }));

      expect(await findByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('does not pass htmlType to a native button child', () => {
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger>
            <button>Actions</button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      const trigger = getByRole('button', { name: 'Actions' });
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).not.toHaveAttribute('htmltype');
    });

    it("passes the trigger's type to a native button child", () => {
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger type="submit">
            <button>Save</button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Save as</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      expect(getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'submit');
    });

    it("passes the trigger's type to a Button child as its native type", () => {
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger type="submit">
            <Button>Save</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Save as</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      expect(getByRole('button', { name: 'Save' })).toHaveAttribute('type', 'submit');
    });

    it("passes the trigger's type to an IconButton child as its native type", () => {
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger type="submit">
            <IconButton
              icon="dots-vertical"
              aria-label="More"
            />
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Save as</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      expect(getByRole('button', { name: 'More' })).toHaveAttribute('type', 'submit');
    });

    it('keeps a native button child from submitting its form', async () => {
      const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
      const { getByRole, findByRole } = renderCUI(
        <form onSubmit={onSubmit}>
          <Dropdown>
            <Dropdown.Trigger>
              <button>Actions</button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>Rename</Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </form>
      );

      await userEvent.click(getByRole('button', { name: 'Actions' }));

      expect(await findByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('should point a ref passed to Dropdown.Item at the menu item', async () => {
    const ref = createRef<HTMLElement>();
    const { getByText, getByRole } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item ref={ref}>Settings</Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));

    expect(ref.current).toBe(getByRole('menuitem', { name: 'Settings' }));
  });

  it('should point a ref passed to an asChild Dropdown.Item at the child element', async () => {
    const ref = createRef<HTMLAnchorElement>();
    const { getByText, getByRole } = renderCUI(
      <Dropdown>
        <Dropdown.Trigger>Dropdown Trigger</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Item
            asChild
            ref={ref}
          >
            <a href="https://docs.example/">Docs</a>
          </Dropdown.Item>
        </Dropdown.Content>
      </Dropdown>
    );

    await userEvent.click(getByText('Dropdown Trigger'));

    const item = getByRole('menuitem', { name: 'Docs' });
    expect(item.tagName).toBe('A');
    expect(ref.current).toBe(item);
  });

  describe('non-pointer click workaround (radix-ui/primitives#1963)', () => {
    // VoiceOver in Safari and Firefox: the VO keys, then mousedown, mouseup and click, with no pointer events.
    const activateWithVoiceOver = async (element: HTMLElement) => {
      const user = userEvent.setup();
      await user.keyboard('{Control>}{Alt>}');
      fireEvent.mouseDown(element);
      fireEvent.mouseUp(element);
      fireEvent.click(element);
      await user.keyboard('{/Alt}{/Control}');
    };

    const renderButtonTrigger = (props: DropdownMenuProps) =>
      renderCUI(
        <Dropdown {...props}>
          <Dropdown.Trigger>
            <Button>Actions</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

    it('opens the menu on a VoiceOver activation', async () => {
      const { getByRole, findByRole } = renderButtonTrigger({});

      await activateWithVoiceOver(getByRole('button', { name: 'Actions' }));

      expect(await findByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();
    });

    it('keeps a non-modal menu closed after a mouse click on the trigger closes it', async () => {
      const { getByRole, findByRole } = renderButtonTrigger({ modal: false });
      const trigger = getByRole('button', { name: 'Actions' });
      await userEvent.click(trigger);
      expect(await findByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();

      await userEvent.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('does not ask a disabled trigger to open on a VoiceOver activation', async () => {
      const onClick = vi.fn();
      const onOpenChange = vi.fn();
      const { getByRole } = renderCUI(
        <Dropdown
          open={false}
          onOpenChange={onOpenChange}
        >
          <Dropdown.Trigger
            disabled
            onClick={onClick}
          >
            <a href="#actions">Actions</a>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      await activateWithVoiceOver(getByRole('link', { name: 'Actions' }));

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onOpenChange).not.toHaveBeenCalled();
    });

    it('calls the onClick and onPointerDown given to the trigger', async () => {
      const onClick = vi.fn();
      const onPointerDown = vi.fn();
      const { getByRole } = renderCUI(
        <Dropdown>
          <Dropdown.Trigger
            onClick={onClick}
            onPointerDown={onPointerDown}
          >
            <button>Actions</button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Rename</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      );

      await userEvent.click(getByRole('button', { name: 'Actions' }));

      expect(onPointerDown).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('asks a controlled Dropdown to open without opening it itself', async () => {
      const onOpenChange = vi.fn();
      const { getByRole, queryByRole } = renderButtonTrigger({
        open: false,
        onOpenChange,
      });

      await activateWithVoiceOver(getByRole('button', { name: 'Actions' }));

      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(queryByRole('menu')).not.toBeInTheDocument();
    });

    it('opens the menu on first render with defaultOpen', async () => {
      const { findByRole } = renderButtonTrigger({ defaultOpen: true });

      expect(await findByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();
    });

    it('reports opening and closing to onOpenChange', async () => {
      const onOpenChange = vi.fn();
      const { findByRole, queryByRole } = renderButtonTrigger({ onOpenChange });
      await userEvent.tab();
      await userEvent.keyboard('{Enter}');
      expect(await findByRole('menuitem', { name: 'Rename' })).toBeInTheDocument();

      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(queryByRole('menu')).not.toBeInTheDocument();
      });
      expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    });
  });
});
