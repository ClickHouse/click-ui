import { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties, ReactNode } from 'react';
import { CardPromotion } from '@/components/CardPromotion';

const harnessStyle: CSSProperties = { display: 'flex', width: '32rem', padding: '1rem' };
const Harness = ({ children }: { children: ReactNode }) => (
  <div
    data-testid="card-promotion-harness"
    style={harnessStyle}
  >
    {children}
  </div>
);

const meta: Meta<typeof CardPromotion> = {
  component: CardPromotion,
  title: 'Cards/Promotion Card',
  tags: ['cardPromotion', 'autodocs'],
  decorators: Story => (
    <Harness>
      <Story />
    </Harness>
  ),
};

export default meta;

type Story = StoryObj<typeof CardPromotion>;

const baseArgs = {
  icon: 'star' as const,
  label: 'Join us at AWS re:Invent in Las Vegas from Nov 27 - Dec 1',
};

export const Playground: Story = {
  args: {
    ...baseArgs,
    dismissible: false,
  },
};

export const Default: Story = {
  args: baseArgs,
};

export const Dismissible: Story = {
  args: {
    ...baseArgs,
    dismissible: true,
  },
};
