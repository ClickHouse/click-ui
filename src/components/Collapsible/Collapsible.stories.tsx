import { Meta, StoryObj } from '@storybook/react-vite';
import { CSSProperties, ReactNode } from 'react';

import { Collapsible } from '@/components/Collapsible';

const harnessStyle: CSSProperties = { width: '320px', padding: '16px' };
const Harness = ({ children }: { children: ReactNode }) => (
  <div
    data-testid="collapsible-harness"
    style={harnessStyle}
  >
    {children}
  </div>
);

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  title: 'Display/Collapsible',
  tags: ['collapsible', 'autodocs'],
  decorators: Story => (
    <Harness>
      <Story />
    </Harness>
  ),
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Playground: Story = {
  render: args => (
    <Collapsible {...args}>
      <Collapsible.Header>
        <div>Collapsible header</div>
      </Collapsible.Header>
      <Collapsible.Content>
        <div>This is a sample content to experiment with the collapsible.</div>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const Closed: Story = {
  render: () => (
    <Collapsible open={false}>
      <Collapsible.Header>
        <div>Collapsible header</div>
      </Collapsible.Header>
      <Collapsible.Content>
        <div>This is a sample content to experiment with the collapsible.</div>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const Open: Story = {
  render: () => (
    <Collapsible open>
      <Collapsible.Header>
        <div>Collapsible header</div>
      </Collapsible.Header>
      <Collapsible.Content>
        <div>This is a sample content to experiment with the collapsible.</div>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const IndicatorEnd: Story = {
  render: () => (
    <Collapsible open>
      <Collapsible.Header indicatorDir="end">
        <div>Collapsible header</div>
      </Collapsible.Header>
      <Collapsible.Content indicatorDir="end">
        <div>This is a sample content to experiment with the collapsible.</div>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Collapsible open>
      <Collapsible.Header icon="home">
        <div>Collapsible header</div>
      </Collapsible.Header>
      <Collapsible.Content>
        <div>This is a sample content to experiment with the collapsible.</div>
      </Collapsible.Content>
    </Collapsible>
  ),
};

export const WithIconEnd: Story = {
  render: () => (
    <Collapsible open>
      <Collapsible.Header
        icon="home"
        iconDir="end"
      >
        <div>Collapsible header</div>
      </Collapsible.Header>
      <Collapsible.Content>
        <div>This is a sample content to experiment with the collapsible.</div>
      </Collapsible.Content>
    </Collapsible>
  ),
};
