import { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyButton } from '@/components/EmptyButton';

const meta: Meta<typeof EmptyButton> = {
  component: EmptyButton,
  title: 'Buttons/EmptyButton',
  tags: ['emptybutton', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'EmptyButton is a style reset: it renders a `<button>` with no styling of its ' +
          'own (`background: transparent`, `padding: 0`, `border: 0`) and inherits its ' +
          "parent's `color` and `font`. That is why the preview below appears in a pink, " +
          'italic serif font — it is not the button styling itself but the contrasting ' +
          'parent supplied by the story decorator, which exists so the inherited color and ' +
          'font are visible and measurable in the visual regression snapshot. In real ' +
          'usage EmptyButton takes on whatever color and font its container provides.',
      },
    },
  },
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
