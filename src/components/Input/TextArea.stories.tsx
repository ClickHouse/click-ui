import { Meta, StoryObj } from '@storybook/react-vite';
import { ChangeEvent, useEffect, useState } from 'react';
import { TextAreaField, TextAreaFieldProps } from './TextArea';
import { Container } from '../Container';

const meta: Meta<typeof TextAreaField> = {
  component: TextAreaField,
  title: 'Forms/Input/TextArea',
  tags: ['form-field', 'input', 'autodocs'],
  decorators: [
    Story => (
      <Container maxWidth="75%">
        <Story />
      </Container>
    ),
  ],
  render: ({ value: valueProp, ...props }: Omit<TextAreaFieldProps, 'onChange'>) => {
    const [value, setValue] = useState(valueProp);
    useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    return (
      <TextAreaField
        value={value}
        onChange={(inputValue: string, e?: ChangeEvent<HTMLTextAreaElement>) => {
          if (e) {
            e.preventDefault();
          }
          setValue(inputValue);
        }}
        {...props}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof TextAreaField>;

export const Playground: Story = {
  args: {
    label: 'Label',
    rows: 5,
    disabled: false,
    placeholder: 'Placeholder',
  },
};
