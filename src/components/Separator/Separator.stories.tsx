import { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from '@/components/Separator';

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: 'Display/Separator',
  tags: ['separator', 'autodocs'],
  // Separator is a thin line, so the decorator wraps it in a contrasting block
  // with bars on either side to make it measurable in the snapshot. The layout
  // follows the story's orientation arg (vertical → row, otherwise → column).
  decorators: [
    (Story, { args }) => {
      const vertical = args.orientation === 'vertical';
      const bar = vertical
        ? { width: '24px', background: '#222' }
        : { height: '24px', background: '#222' };
      return (
        <div
          data-testid="separator-harness"
          style={{
            display: 'inline-flex',
            flexDirection: vertical ? 'row' : 'column',
            alignItems: 'stretch',
            ...(vertical ? { height: '80px' } : { width: '160px' }),
            background: '#888',
          }}
        >
          <div style={bar} />
          <Story />
          <div style={bar} />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof Separator>;

export const Playground: Story = {
  args: {
    size: 'xs',
    orientation: 'horizontal',
  },
};

export const HorizontalXs: Story = {
  args: { size: 'xs', orientation: 'horizontal' },
};

export const HorizontalSm: Story = {
  args: { size: 'sm', orientation: 'horizontal' },
};

export const HorizontalMd: Story = {
  args: { size: 'md', orientation: 'horizontal' },
};

export const HorizontalLg: Story = {
  args: { size: 'lg', orientation: 'horizontal' },
};

export const HorizontalXl: Story = {
  args: { size: 'xl', orientation: 'horizontal' },
};

export const HorizontalXxl: Story = {
  args: { size: 'xxl', orientation: 'horizontal' },
};

export const VerticalXs: Story = {
  args: { size: 'xs', orientation: 'vertical' },
};

export const VerticalSm: Story = {
  args: { size: 'sm', orientation: 'vertical' },
};

export const VerticalMd: Story = {
  args: { size: 'md', orientation: 'vertical' },
};

export const VerticalLg: Story = {
  args: { size: 'lg', orientation: 'vertical' },
};

export const VerticalXl: Story = {
  args: { size: 'xl', orientation: 'vertical' },
};

export const VerticalXxl: Story = {
  args: { size: 'xxl', orientation: 'vertical' },
};

export const DefaultOrientation: Story = {
  args: { size: 'md' },
};
