import React from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from '@/components/RadioGroup';

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

const items = (
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
);

export const Playground: Story = {
  args: {
    disabled: false,
    children: items,
  },
};

export const Default: Story = {
  args: {
    children: items,
  },
};

export const Checked: Story = {
  args: {
    defaultValue: 'RadioButton1',
    children: items,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: items,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultValue: 'RadioButton1',
    children: items,
  },
};

export const Inline: Story = {
  args: {
    inline: true,
    children: items,
  },
};

export const Vertical: Story = {
  args: {
    inline: false,
    children: items,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Choose an option',
    children: items,
  },
};

export const WithError: Story = {
  args: {
    label: 'Choose an option',
    error: 'This field is required',
    children: items,
  },
};

export const LabelHorizontalDirStart: Story = {
  args: {
    label: 'Choose an option',
    orientation: 'horizontal',
    dir: 'start',
    children: items,
  },
};

export const NoLabel: Story = {
  args: {
    children: items,
  },
};
