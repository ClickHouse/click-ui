import { useEffect, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from '@/components/Switch';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Forms/Switch',
  tags: ['switch', 'autodocs'],
  render: ({ checked, ...props }) => {
    const [checkedState, setCheckedState] = useState(checked);

    useEffect(() => {
      setCheckedState(checked);
    }, [checked]);

    return (
      <Switch
        {...props}
        checked={checkedState}
        onCheckedChange={setCheckedState}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

const baseArgs = {
  label: 'Switch label',
};

export const Playground: Story = {
  args: {
    ...baseArgs,
    checked: true,
  },
};

export const Default: Story = {
  args: {
    ...baseArgs,
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    ...baseArgs,
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    ...baseArgs,
    checked: true,
    disabled: true,
  },
};

export const OrientationVerticalDirStart: Story = {
  args: {
    ...baseArgs,
    checked: false,
    orientation: 'vertical',
    dir: 'start',
  },
};

export const OrientationHorizontalDirStart: Story = {
  args: {
    ...baseArgs,
    checked: false,
    orientation: 'horizontal',
    dir: 'start',
  },
};

export const NoLabel: Story = {
  args: {
    checked: false,
    label: undefined,
  },
};
