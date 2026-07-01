import { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import Loading from './Loading';
import LoadingAnimated from './Loading-Animated';
import HorizontalLoading from './Horizontal-Loading';

const meta: Meta = {
  title: 'Assets/Loaders',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

// Visible SVG loaders, so no backdrop — a plain inline-flex harness carries the
// test-id that the Playwright spec screenshots.
const loadersHarness: Decorator = Story => (
  <div
    data-testid="loaders-harness"
    style={{ display: 'inline-flex' }}
  >
    <Story />
  </div>
);

export const LoadingIcon: Story = {
  render: () => <Loading />,
  decorators: [loadersHarness],
};

export const LoadingAnimatedIcon: Story = {
  render: () => <LoadingAnimated />,
  decorators: [loadersHarness],
};

export const HorizontalLoadingIcon: Story = {
  render: () => <HorizontalLoading />,
  decorators: [loadersHarness],
};
