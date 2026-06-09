import { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '@/components/Alert';
import { Container } from '@/components/Container';
import { Link } from '@/components/Link';
import { ICON_NAMES } from '@/components/Icon/IconCommon';

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: 'Display/Alert',
  tags: ['alert', 'autodocs'],
  argTypes: {
    customIcon: { type: { name: 'enum', value: [...ICON_NAMES] } },
  },
  decorators: Story => (
    <Container maxWidth="65%">
      <Story />
    </Container>
  ),
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  args: {
    title: '',
    text: 'An alert example',
    state: 'success',
    size: 'small',
    type: 'default',
    showIcon: true,
    dismissible: false,
  },
};

export const TitleWithLink: Story = {
  args: {
    title: (
      <>
        Important: Please review our{' '}
        <Link
          href={'https://clickhouse.com/docs'}
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </Link>{' '}
        before progressing
      </>
    ),
    text: (
      <>
        Example demos how you can pass react elements like links to the title prop, with{' '}
        <Link href="https://clickhouse.com/docs">a link</Link>
      </>
    ),
    state: 'info',
    size: 'medium',
    type: 'default',
    showIcon: true,
    dismissible: false,
  },
};

// State variants — default type, small size

export const StateNeutral: Story = {
  args: { text: 'A neutral alert', state: 'neutral', size: 'small', type: 'default' },
};

export const StateSuccess: Story = {
  args: { text: 'A success alert', state: 'success', size: 'small', type: 'default' },
};

export const StateWarning: Story = {
  args: { text: 'A warning alert', state: 'warning', size: 'small', type: 'default' },
};

export const StateDanger: Story = {
  args: { text: 'A danger alert', state: 'danger', size: 'small', type: 'default' },
};

export const StateInfo: Story = {
  args: { text: 'An info alert', state: 'info', size: 'small', type: 'default' },
};

// Size variants

export const SizeSmall: Story = {
  args: {
    title: 'Alert title',
    text: 'A small alert',
    state: 'info',
    size: 'small',
    type: 'default',
  },
};

export const SizeMedium: Story = {
  args: {
    title: 'Alert title',
    text: 'A medium alert',
    state: 'info',
    size: 'medium',
    type: 'default',
  },
};

// Banner type

export const BannerSmall: Story = {
  args: {
    text: 'A small banner alert',
    state: 'warning',
    size: 'small',
    type: 'banner',
  },
};

export const BannerMedium: Story = {
  args: {
    text: 'A medium banner alert',
    state: 'warning',
    size: 'medium',
    type: 'banner',
  },
};

// Icon variants

export const NoIcon: Story = {
  args: {
    text: 'An alert without an icon',
    state: 'success',
    size: 'small',
    type: 'default',
    showIcon: false,
  },
};

export const CustomIcon: Story = {
  args: {
    text: 'An alert with a custom icon',
    state: 'info',
    size: 'small',
    type: 'default',
    showIcon: true,
    customIcon: 'gift',
  },
};

// Dismissible

export const Dismissible: Story = {
  args: {
    title: 'Dismissible alert',
    text: 'An alert that can be dismissed',
    state: 'danger',
    size: 'medium',
    type: 'default',
    dismissible: true,
  },
};

export const DismissibleBanner: Story = {
  args: {
    text: 'A dismissible banner alert',
    state: 'danger',
    size: 'medium',
    type: 'banner',
    dismissible: true,
  },
};
