import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonGroup } from '@/components/ButtonGroup';

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: 'Buttons/ButtonGroup',
  tags: ['button-group', 'autodocs'],
};

export default meta;

export const Playground: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    fillWidth: false,
    type: 'default',
    defaultSelected: 'option3',
  },
};

export const MultiSelect: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    fillWidth: false,
    type: 'default',
    multiple: true,
    defaultSelected: new Set(['option1', 'option3']),
    onClick: (_value, selected) => {
      console.log('🔎 Selected:', [...selected]);
    },
  },
};

export const ConsumerControlledStateSingle: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    fillWidth: false,
    type: 'default',
    selected: 'option2',
  },
  render: args => {
    const [selected, setSelected] = useState(args.selected);
    return (
      <ButtonGroup
        {...args}
        selected={selected}
        onClick={(value, selected) => {
          console.log('🔎 Selected:', selected);
          setSelected(value);
        }}
      />
    );
  },
};

export const ConsumerControlledStateMulti: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    fillWidth: false,
    type: 'default',
    multiple: true,
    selected: new Set(['option2']),
  },
  render: args => {
    const [selected, setSelected] = useState(args.selected);
    return (
      <ButtonGroup
        {...args}
        selected={selected}
        onClick={(_value, newSelection) => {
          console.log('🔎 Selected:', [...newSelection]);
          setSelected(newSelection);
        }}
      />
    );
  },
};
