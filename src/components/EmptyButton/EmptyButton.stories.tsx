import { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyButton } from '@/components/EmptyButton';

const meta: Meta<typeof EmptyButton> = {
  component: EmptyButton,
  title: 'Buttons/EmptyButton',
  tags: ['emptybutton', 'autodocs'],
  // EmptyButton resets to a transparent, padding-less button that inherits its
  // parent's color and font. The decorator gives it a contrasting parent with a
  // distinct color and font so the inheritance is visible and measurable in the
  // snapshot.
  decorators: [
    Story => (
      <div
        data-testid="emptybutton-harness"
        style={{
          display: 'inline-flex',
          padding: '24px',
          color: '#c2185b',
          fontFamily: 'Georgia, serif',
          fontSize: '20px',
          fontStyle: 'italic',
          background: '#f5f5f5',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof EmptyButton>;

export const Default: Story = {
  args: {
    children: 'Empty button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled empty button',
    disabled: true,
  },
};
