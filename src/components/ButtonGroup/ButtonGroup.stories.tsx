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
    'aria-label': 'Button group playground',
  },
};

export const Default: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    type: 'default',
  },
};

export const Borderless: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    type: 'borderless',
  },
};

export const DefaultSelected: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    type: 'default',
    selected: 'option1',
  },
};

export const BorderlessSelected: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    type: 'borderless',
    selected: 'option1',
  },
};

export const WithDisabledButton: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Enabled', value: 'enabled' },
      { label: 'Disabled', value: 'disabled', disabled: true },
    ],
    type: 'default',
  },
};

export const WithDisabledSelectedButton: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Enabled', value: 'enabled' },
      { label: 'Disabled Active', value: 'disabled', disabled: true },
    ],
    type: 'default',
    selected: 'disabled',
  },
};

export const FillWidthDefault: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    type: 'default',
    fillWidth: true,
  },
};

export const FillWidthBorderless: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    type: 'borderless',
    fillWidth: true,
  },
};

export const MultiSelectSelected: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    type: 'default',
    multiple: true,
    selected: new Set(['option1', 'option3']),
  },
};

export const MultiSelectBorderless: StoryObj<typeof ButtonGroup> = {
  args: {
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    type: 'borderless',
    multiple: true,
    selected: new Set(['option1', 'option3']),
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
