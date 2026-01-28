import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  subcomponents: {
    'RadioGroup.Item': RadioGroup.Item as React.ComponentType<unknown>,
  },
  title: 'Forms/RadioGroup',
  tags: ['radio', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Playground: Story = {
  args: {
    disabled: false,
    children: (
      <>
        <RadioGroup.Item
          label="Radio Button1"
          value="RadioButton1"
        />
        <RadioGroup.Item
          label="Radio Button2"
          value="RadioButton2"
        />
        <RadioGroup.Item
          label="Radio Button3"
          value="RadioButton3"
        />
      </>
    ),
  },
};
