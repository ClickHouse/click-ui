import { useEffect, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import { Container } from '../Container/Container';

import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  title: 'Forms/Input/SearchField',
  tags: ['form-field', 'input', 'autodocs'],
  render: ({ value: valueProp, ...props }) => {
    const [value, setValue] = useState(valueProp);

    useEffect(() => {
      setValue(valueProp);
    }, [valueProp]);

    return (
      <Container maxWidth="350px">
        <SearchField
          {...props}
          value={value}
          onChange={setValue}
        />
      </Container>
    );
  },
};

export default meta;

export const Playground: StoryObj<typeof SearchField> = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};
