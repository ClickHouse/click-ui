import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { SidebarCollapsibleTitle } from '@/components/SidebarCollapsibleTitle';
import { SidebarNavigationItem } from '@/components/SidebarNavigationItem';

const harness: Decorator = Story => (
  <div
    data-testid="sidebar-collapsibletitle-harness"
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

const meta: Meta<typeof SidebarCollapsibleTitle> = {
  component: SidebarCollapsibleTitle,
  title: 'Sidebar/CollapsibleTitle',
  tags: ['sidebar', 'collapsible-title', 'autodocs'],
  decorators: [harness],
};

export default meta;

type Story = StoryObj<typeof SidebarCollapsibleTitle>;

const sampleChildren = (
  <>
    <SidebarNavigationItem
      level={1}
      icon="code-in-square"
      label="Untitled Query 1"
    />
    <SidebarNavigationItem
      level={2}
      icon="code-in-square"
      label="Untitled Query 2"
    />
  </>
);

export const Playground: Story = {
  args: {
    icon: 'code',
    label: 'Queries',
    selected: false,
    children: sampleChildren,
  },
};

// Collapsed — exercises the $collapsible trigger (padding-left:0 branch) closed.
export const ClosedMain: Story = {
  args: {
    type: 'main',
    open: false,
    icon: 'code',
    label: 'Queries',
    children: sampleChildren,
  },
};

// Expanded — trigger plus revealed child items.
export const OpenMain: Story = {
  args: {
    type: 'main',
    open: true,
    icon: 'code',
    label: 'Queries',
    children: sampleChildren,
  },
};
