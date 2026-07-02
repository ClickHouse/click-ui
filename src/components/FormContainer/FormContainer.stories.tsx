import { Meta, StoryObj } from '@storybook/react-vite';
import { FormContainer } from '@/components/FormContainer';

const meta: Meta<typeof FormContainer> = {
  component: FormContainer,
  title: 'Forms/FormContainer',
  tags: ['form', 'autodocs'],
  decorators: [
    Story => (
      <div
        data-testid="formcontainer-harness"
        style={{ display: 'inline-block', padding: '16px' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof FormContainer>;

const field = (
  <input
    id="form-field"
    placeholder="Field"
    style={{
      width: '200px',
      padding: '6px 8px',
      border: '1px solid #888',
      borderRadius: '4px',
    }}
  />
);

export const Playground: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    children: field,
  },
};

export const Default: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    children: field,
  },
};

export const VerticalDirStart: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    orientation: 'vertical',
    dir: 'start',
    children: field,
  },
};

export const VerticalDirEnd: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    orientation: 'vertical',
    dir: 'end',
    children: field,
  },
};

export const HorizontalDirStart: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    orientation: 'horizontal',
    dir: 'start',
    children: field,
  },
};

export const HorizontalDirEnd: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    orientation: 'horizontal',
    dir: 'end',
    children: field,
  },
};

export const HorizontalDirStartLabelPadding: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    orientation: 'horizontal',
    dir: 'start',
    addLabelPadding: true,
    children: field,
  },
};

export const WithError: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    label: 'Label',
    error: 'This field is required',
    children: field,
  },
};

export const NoLabel: Story = {
  args: {
    id: 'form-field',
    htmlFor: 'form-field',
    children: field,
  },
};
