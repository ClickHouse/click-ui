import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Spacer } from '@/components/Spacer/Spacer';
import { Tabs } from '@/components/Tabs/Tabs';
import { Text } from '@/components/Typography/Text/Text';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  subcomponents: {
    'Tabs.TriggersList': Tabs.TriggersList as React.ComponentType<unknown>,
    'Tabs.Trigger': Tabs.Trigger as React.ComponentType<unknown>,
    'Tabs.Content': Tabs.Content as React.ComponentType<unknown>,
  },
  title: 'Display/Tabs',
  tags: ['tabs', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  args: {
    defaultValue: 'tab2',
    onValueChange: s => console.log(s),
    ariaLabel: 'a simple tab component',
    children: (
      <>
        <Tabs.TriggersList>
          <Tabs.Trigger
            value="tab1"
            key="tab1"
          >
            Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            key="tab2"
          >
            Tab 2
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab3"
            key="tab3"
          >
            Tab 3
          </Tabs.Trigger>
        </Tabs.TriggersList>
        <Tabs.Content value="tab1">
          <Spacer />
          <Text>Tab 1 content</Text>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <Spacer />
          <Text>Tab 2 content</Text>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <Spacer />
          <Text>Tab 3 content</Text>
        </Tabs.Content>
      </>
    ),
  },
};
