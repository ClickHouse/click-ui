import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from '..';
import {VerticalStepper }from '@/components/VerticalStepper';

const meta: Meta<typeof VerticalStepper> = {
  component: VerticalStepper,
  subcomponents: {
    'VerticalStepper.Step': VerticalStepper.Step as React.ComponentType<unknown>,
  },
  title: 'Display/VerticalStepper',
  tags: ['spacer', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof VerticalStepper>;

export const Playground: Story = {
  args: {
    type: 'bulleted',
    children: (
      <>
        <VerticalStepper.Step
          label="Label 1"
          collapsed={false}
          status="complete"
        >
          <Text>Text Value 1</Text>
        </VerticalStepper.Step>
        <VerticalStepper.Step
          label="Label 2"
          status="complete"
        >
          <Text>Text Value 2</Text>
        </VerticalStepper.Step>
        <VerticalStepper.Step
          label="Label 3"
          status="active"
        >
          <Text>Text Value 3</Text>
        </VerticalStepper.Step>
        <VerticalStepper.Step label="Label 4">
          <Text>Text Value 4</Text>
        </VerticalStepper.Step>
      </>
    ),
  },
};
