import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';

import { ButtonGroup } from '@/components/ButtonGroup';
import type { ButtonGroupElementProps } from '@/components/ButtonGroup';

const labelOptions: ButtonGroupElementProps[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

const iconOptions: ButtonGroupElementProps[] = [
  { icon: 'table', value: 'table', 'aria-label': 'Table view' },
  { icon: 'pin', value: 'pin', 'aria-label': 'Pin view' },
  { icon: 'settings', value: 'settings', 'aria-label': 'Settings' },
];

const meta: Meta<typeof ButtonGroup> = {
  component: ButtonGroup,
  title: 'Buttons/ButtonGroup',
  tags: ['button-group', 'autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'When `iconOnly` is true, provide an `aria-label` on the group and on each option so icon buttons have meaningful names. Icon names are used as a fallback only.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['default', 'borderless'],
      description: 'Panel styling for the button group.',
    },
    iconOnly: {
      control: 'boolean',
      description:
        'Renders icons instead of labels. Pair with per-option `aria-label` values for accessible names.',
    },
    'aria-label': {
      description: 'Names the button group for assistive technology.',
    },
  },
};

export default meta;

export const Playground: StoryObj<typeof ButtonGroup> = {
  args: {
    options: labelOptions,
    fillWidth: false,
    type: 'default',
    iconOnly: false,
    defaultSelected: 'option3',
    'aria-label': 'Button group playground',
  },
  render: args => (
    <ButtonGroup
      {...args}
      options={args.iconOnly ? iconOptions : labelOptions}
      defaultSelected={args.iconOnly ? 'pin' : args.defaultSelected}
    />
  ),
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

export const IconOnly: StoryObj<typeof ButtonGroup> = {
  args: {
    options: iconOptions,
    type: 'default',
    iconOnly: true,
    'aria-label': 'View options',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Each option should include an `aria-label` with a human-readable name. The group also needs an `aria-label` describing the control set.',
      },
    },
  },
};

export const IconOnlySelected: StoryObj<typeof ButtonGroup> = {
  args: {
    options: iconOptions,
    type: 'default',
    iconOnly: true,
    selected: 'pin',
    'aria-label': 'View options',
  },
};

export const IconOnlyBorderless: StoryObj<typeof ButtonGroup> = {
  args: {
    options: iconOptions,
    type: 'borderless',
    iconOnly: true,
    'aria-label': 'View options',
  },
};

export const IconOnlyBorderlessSelected: StoryObj<typeof ButtonGroup> = {
  args: {
    options: iconOptions,
    type: 'borderless',
    iconOnly: true,
    selected: 'pin',
    'aria-label': 'View options',
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
