import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { SidebarNavigationTitle } from '@/components/SidebarNavigationTitle';

const harness: Decorator = Story => (
  <div
    data-testid="sidebar-navigationtitle-harness"
    style={{
      width: '240px',
      padding: '8px',
      // Render the themed title colors against the intended backdrop; Storybook's
      // .docs-story container otherwise paints a white card regardless of theme.
      background: 'var(--click-storybook-global-background)',
    }}
  >
    <Story />
  </div>
);

const meta: Meta<typeof SidebarNavigationTitle> = {
  component: SidebarNavigationTitle,
  title: 'Sidebar/NavigationTitle',
  tags: ['sidebar', 'navigation-title', 'autodocs'],
  decorators: [harness],
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationTitle>;

export const Playground: Story = {
  args: {
    icon: 'table',
    selected: false,
    label: <a href="/profile">Tables</a>,
  },
};

// type=main
export const MainTitle: Story = {
  args: { type: 'main', icon: 'table', label: <a href="#">Tables</a> },
};

export const MainTitleSelected: Story = {
  args: { type: 'main', icon: 'table', selected: true, label: <a href="#">Tables</a> },
};

// type=sqlSidebar (distinct color tokens)
export const SqlSidebarTitle: Story = {
  args: { type: 'sqlSidebar', icon: 'table', label: <a href="#">Tables</a> },
};
