import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '@/components/Icon';

const meta: Meta<typeof Icon> = {
  title: 'Assets/Loaders',
  component: Icon,
  tags: ['autodocs'],
  args: { size: 'lg' },
};

export default meta;

type Story = StoryObj<typeof meta>;

const loadersHarness: Decorator = Story => (
  <div
    data-testid="loaders-harness"
    style={{ display: 'inline-flex' }}
  >
    <Story />
  </div>
);

export const LoadingIcon: Story = {
  args: { name: 'loading' },
  decorators: [loadersHarness],
};

export const LoadingAnimatedIcon: Story = {
  args: { name: 'loading-animated' },
  decorators: [loadersHarness],
};

export const HorizontalLoadingIcon: Story = {
  args: { name: 'horizontal-loading' },
  decorators: [loadersHarness],
};
