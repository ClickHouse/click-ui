import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { SidebarCollapsibleItem } from '@/components/SidebarCollapsibleItem';

const harness: Decorator = Story => (
  <div
    data-testid="sidebar-collapsibleitem-harness"
    style={{
      width: '240px',
      padding: '8px',
      // Render the themed colors against the intended backdrop; Storybook's
      // .docs-story container otherwise paints a white card regardless of theme.
      background: 'var(--click-storybook-global-background)',
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof SidebarCollapsibleItem> = {
  component: SidebarCollapsibleItem,
  title: 'Sidebar/CollapsibleItem',
  tags: ['sidebar', 'collapsible-item', 'autodocs'],
  decorators: [harness],
};

export default meta;

type Story = StoryObj<typeof SidebarCollapsibleItem>;

const sampleChildren = (
  <>
    <h2>Content</h2>
    <p>SomeText</p>
  </>
);

export const Playground: Story = {
  args: {
    icon: 'table',
    selected: false,
    label: <span>system-table</span>,
    children: sampleChildren,
  },
};

// Collapsed — exercises the $collapsible header (padding-left:0 branch) closed.
export const ClosedMain: Story = {
  args: {
    type: 'main',
    open: false,
    icon: 'table',
    label: <span>system-table</span>,
    children: sampleChildren,
  },
};

// Expanded — header plus revealed content.
export const OpenMain: Story = {
  args: {
    type: 'main',
    open: true,
    icon: 'table',
    label: <span>system-table</span>,
    children: sampleChildren,
  },
};

export const ClosedSqlSidebar: Story = {
  args: {
    type: 'sqlSidebar',
    open: false,
    icon: 'table',
    label: <span>system-table</span>,
    children: sampleChildren,
  },
};
