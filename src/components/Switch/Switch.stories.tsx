import { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Forms/Switch',
  tags: ['switch', 'autodocs'],
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  render: args => {
    const [isChecked, setIsChecked] = useState(args.checked);

    return (
      <Switch
        {...args}
        checked={isChecked}
        onCheckedChange={setIsChecked}
      />
    );
  },
  args: {
    checked: true,
    disabled: false,
    label: 'Switch label',
  },
};
