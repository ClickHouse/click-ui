import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { SidebarNavigationItem } from '@/components/SidebarNavigationItem';

const harness: Decorator = Story => (
  <div
    data-testid="sidebar-navigationitem-harness"
    style={{
      width: '240px',
      padding: '8px',
      // Render the themed item colors against the intended backdrop; Storybook's
      // .docs-story container otherwise paints a white card regardless of theme.
      background: 'var(--click-storybook-global-background)',
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof SidebarNavigationItem> = {
  component: SidebarNavigationItem,
  title: 'Sidebar/NavigationItem',
  tags: ['sidebar', 'navigation-item', 'autodocs'],
  decorators: [harness],
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationItem>;

export const Playground: Story = {
  args: {
    icon: 'code-in-square',
    selected: false,
    disabled: false,
    label: <a href="https://clickhouse.com/">Untitled Query</a>,
  },
};

// type=main, level 0 (item)
export const MainItem: Story = {
  args: { type: 'main', level: 0, icon: 'table', label: <a href="#">Tables</a> },
};

export const MainItemSelected: Story = {
  args: {
    type: 'main',
    level: 0,
    icon: 'table',
    selected: true,
    label: <a href="#">Tables</a>,
  },
};

export const MainItemDisabled: Story = {
  args: {
    type: 'main',
    level: 0,
    icon: 'table',
    disabled: true,
    label: <a href="#">Tables</a>,
  },
};

// level 1 (subItem) — different padding/radii/typography tokens
export const MainSubItem: Story = {
  args: {
    type: 'main',
    level: 1,
    icon: 'code-in-square',
    label: <a href="#">Untitled Query</a>,
  },
};

// type=sqlSidebar (distinct color tokens)
export const SqlSidebarItem: Story = {
  args: {
    type: 'sqlSidebar',
    level: 0,
    icon: 'table',
    label: <a href="#">Tables</a>,
  },
};

export const SqlSidebarItemSelected: Story = {
  args: {
    type: 'sqlSidebar',
    level: 0,
    icon: 'table',
    selected: true,
    label: <a href="#">Tables</a>,
  },
};
