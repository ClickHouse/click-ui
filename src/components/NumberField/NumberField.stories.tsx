import { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { NumberField, NumberFieldProps } from './NumberField';
import { Container } from '@/components/Container';
import { Text } from '@/components/Text';

const meta: Meta<typeof NumberField> = {
  component: NumberField,
  title: 'Forms/Input/NumberField',
  tags: ['form-field', 'input', 'autodocs'],
  decorators: [
    Story => (
      <Container maxWidth="300px">
        <Story />
      </Container>
    ),
  ],
  render: ({ value: valueProp, ...props }: Omit<NumberFieldProps, 'onChange'>) => {
    const [value, setValue] = useState(valueProp);
    useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    return (
      <NumberField
        value={value}
        onChange={(inputValue: string) => {
          setValue(inputValue);
        }}
        {...props}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof NumberField>;

export const Playground: Story = {
  args: {
    label: 'Label',
    disabled: false,
    placeholder: 'Placeholder',
    loading: false,
  },
};

export const WithEndContent: Story = {
  args: {
    label: 'Spend limit',
    placeholder: '0',
    hideControls: true,
    endContent: (
      <Text
        color="muted"
        size="sm"
      >
        dollars / credits
      </Text>
    ),
  },
};

export const WithStartContent: Story = {
  args: {
    label: 'Price',
    placeholder: '0.00',
    hideControls: true,
    startContent: (
      <Text
        color="muted"
        size="sm"
      >
        $
      </Text>
    ),
  },
};
