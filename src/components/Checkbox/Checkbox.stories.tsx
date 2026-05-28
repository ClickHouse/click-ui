import { useEffect, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '@/components/Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Forms/Checkbox',
  tags: ['checkbox', 'autodocs'],
  render: ({ checked, ...props }) => {
    const [checkedState, setCheckedState] = useState(checked);

    useEffect(() => {
      setCheckedState(checked);
    }, [checked]);

    return (
      <Checkbox
        {...props}
        checked={checkedState}
        onCheckedChange={setCheckedState}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

const baseArgs = {
  label: 'Accept terms and conditions',
};

export const Playground: Story = {
  args: baseArgs,
};

export const Default: Story = {
  args: baseArgs,
};

export const DefaultChecked: Story = {
  args: {
    ...baseArgs,
    checked: true,
  },
};

export const DefaultIndeterminate: Story = {
  args: {
    ...baseArgs,
    checked: 'indeterminate',
  },
};

export const Disabled: Story = {
  args: {
    ...baseArgs,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    checked: true,
  },
};

export const DisabledIndeterminate: Story = {
  args: {
    ...baseArgs,
    disabled: true,
    checked: 'indeterminate',
  },
};

export const Var1Checked: Story = {
  args: {
    ...baseArgs,
    variant: 'var1',
    checked: true,
  },
};

export const Var2Checked: Story = {
  args: {
    ...baseArgs,
    variant: 'var2',
    checked: true,
  },
};

export const Var3Checked: Story = {
  args: {
    ...baseArgs,
    variant: 'var3',
    checked: true,
  },
};

export const Var4Checked: Story = {
  args: {
    ...baseArgs,
    variant: 'var4',
    checked: true,
  },
};

export const Var5Checked: Story = {
  args: {
    ...baseArgs,
    variant: 'var5',
    checked: true,
  },
};

export const Var6Checked: Story = {
  args: {
    ...baseArgs,
    variant: 'var6',
    checked: true,
  },
};

export const OrientationVerticalDirStart: Story = {
  args: {
    ...baseArgs,
    orientation: 'vertical',
    dir: 'start',
  },
};

export const OrientationHorizontalDirStart: Story = {
  args: {
    ...baseArgs,
    orientation: 'horizontal',
    dir: 'start',
  },
};

export const NoLabel: Story = {
  args: {
    label: undefined,
  },
};
