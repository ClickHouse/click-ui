import { Meta, StoryObj } from '@storybook/react-vite';
import { GridCenter } from '@/components/GridCenter';

const meta: Meta<typeof GridCenter> = {
  component: GridCenter,
  title: 'Display/GridCenter',
  tags: ['gridcenter', 'autodocs'],
  // GridCenter fills its parent (width/height: 100%) and centers its child via
  // `place-items: center`. The decorator gives it a fixed-size, contrasting
  // parent so the centering is measurable in the snapshot.
  decorators: [
    Story => (
      <div
        data-testid="gridcenter-harness"
        style={{
          width: '240px',
          height: '160px',
          background: '#888',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GridCenter>;

export const Playground: Story = {
  render: () => (
    <GridCenter>
      <div style={{ width: '64px', height: '48px', background: '#222' }} />
    </GridCenter>
  ),
};

export const CenteredContent: Story = {
  render: () => (
    <GridCenter>
      <div style={{ width: '64px', height: '48px', background: '#222' }} />
    </GridCenter>
  ),
};
