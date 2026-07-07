import { Meta, StoryObj } from '@storybook/react-vite';
import { DateDetails } from '@/components/DateDetails';

const meta: Meta<typeof DateDetails> = {
  component: DateDetails,
  title: 'Display/DateDetails',
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div
        data-testid="date-details-harness"
        style={{ padding: '2rem' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DateDetails>;

export const Playground: Story = {
  args: {
    date: new Date(),
    side: 'top',
    size: 'sm',
    weight: 'normal',
  },
};

// Visual-regression story: pins the date to a fixed offset from now so the
// relative-time trigger text renders deterministically as "5 minutes ago".
// The popover stays closed so the trigger's own link styling (color, font,
// gap, underline-on-hover) can be screenshotted in isolation.
export const Trigger: Story = {
  args: {
    date: new Date(Date.now() - 5 * 60 * 1000),
    size: 'sm',
    weight: 'normal',
  },
};

// Visual-regression story: pins an absolute date and a fixed system timezone so
// the opened popover content (Local / System / UTC / Unix rows) renders
// deterministically. The spec clicks the trigger to open the popover before
// screenshotting the content panel.
export const Open: Story = {
  args: {
    date: new Date('2024-12-24T11:40:00Z'),
    systemTimeZone: 'America/Los_Angeles',
    side: 'bottom',
    size: 'sm',
    weight: 'normal',
  },
};
