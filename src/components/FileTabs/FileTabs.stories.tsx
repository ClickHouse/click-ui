import React, { useEffect, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import {
  FileTabs as CUIFileTabs,
  FileTabElement,
  FileTabStatusType,
} from '@/components/FileTabs';

const options = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'a10',
  'a11',
  'a12',
];

interface FileTabsExampleProps {
  selected: number;
  status: FileTabStatusType;
}

const FileTabsExample = ({ selected: selectedProp, status }: FileTabsExampleProps) => {
  const [selected, setSelected] = useState<number>(selectedProp);
  useEffect(() => {
    setSelected(selectedProp);
  }, [selectedProp]);
  const [tabs, setTabs] = useState(options);

  return (
    <div style={{ display: 'flex', height: '4rem' }}>
      <FileTabElement icon="home" />
      <CUIFileTabs
        onReorderTab={() => null}
        onClose={(index: number) => {
          setTabs(tabs => {
            tabs.splice(index, 1);
            return [...tabs];
          });
        }}
        onSelect={(index: number) => setSelected(index)}
        selectedIndex={selected}
      >
        {tabs.map((option, index) => (
          <CUIFileTabs.Tab
            index={index}
            key={`${option}-${index}`}
            icon="code-in-square"
            status={index === 0 ? status : undefined}
            text={`Tab ${index} value-${option}`}
          />
        ))}
      </CUIFileTabs>
    </div>
  );
};

const meta: Meta<typeof FileTabsExample> = {
  component: FileTabsExample,
  subcomponents: {
    'FileTabs.Tab': CUIFileTabs.Tab as React.ComponentType<unknown>,
  },
  title: 'Display/FileTabs',
  tags: ['tabs', 'file-tabs', 'autodocs'],
  argTypes: {
    selected: { control: 'select', options: options.map((_, index) => index) },
    status: {
      control: 'radio',
      options: ['success', 'warning', 'danger', 'neutral', 'info'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof FileTabsExample>;

const harnessDecorator = (Story: React.ComponentType) => (
  <div
    data-testid="filetabs-harness"
    style={{ padding: '1rem', width: '40rem' }}
  >
    <Story />
  </div>
);

export const Playground: Story = {
  args: {
    selected: 0,
    status: 'neutral',
  },
};

const shortOptions = ['one', 'two', 'three'];

interface BasicExampleProps {
  selected?: number;
  status?: FileTabStatusType;
  preview?: boolean;
}

const BasicFileTabs = ({ selected = 0, status, preview }: BasicExampleProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(selected);
  useEffect(() => {
    setSelectedIndex(selected);
  }, [selected]);

  return (
    <div style={{ display: 'flex', height: '4rem' }}>
      <FileTabElement icon="home" />
      <CUIFileTabs
        onReorderTab={() => null}
        onClose={() => null}
        onSelect={(index: number) => setSelectedIndex(index)}
        selectedIndex={selectedIndex}
      >
        {shortOptions.map((option, index) => (
          <CUIFileTabs.Tab
            index={index}
            key={`${option}-${index}`}
            icon="code-in-square"
            status={index === 0 ? status : undefined}
            preview={preview && index === 0}
            text={`Tab ${option}`}
          />
        ))}
      </CUIFileTabs>
    </div>
  );
};

export const Default: Story = {
  decorators: [harnessDecorator],
  render: () => <BasicFileTabs selected={0} />,
};

export const Selected: Story = {
  decorators: [harnessDecorator],
  render: () => <BasicFileTabs selected={1} />,
};

export const Preview: Story = {
  decorators: [harnessDecorator],
  render: () => (
    <BasicFileTabs
      selected={1}
      preview
    />
  ),
};

export const StatusSuccess: Story = {
  decorators: [harnessDecorator],
  render: () => (
    <BasicFileTabs
      selected={1}
      status="success"
    />
  ),
};

export const StatusWarning: Story = {
  decorators: [harnessDecorator],
  render: () => (
    <BasicFileTabs
      selected={1}
      status="warning"
    />
  ),
};

export const StatusDanger: Story = {
  decorators: [harnessDecorator],
  render: () => (
    <BasicFileTabs
      selected={1}
      status="danger"
    />
  ),
};

export const StatusNeutral: Story = {
  decorators: [harnessDecorator],
  render: () => (
    <BasicFileTabs
      selected={1}
      status="neutral"
    />
  ),
};

export const StatusInfo: Story = {
  decorators: [harnessDecorator],
  render: () => (
    <BasicFileTabs
      selected={1}
      status="info"
    />
  ),
};

const FixedTabElements = () => (
  <div
    data-testid="filetabs-harness"
    style={{ padding: '1rem' }}
  >
    <div style={{ display: 'flex', height: '4rem' }}>
      <FileTabElement icon="home" />
      <FileTabElement
        icon="code-in-square"
        active
      >
        Active element
      </FileTabElement>
      <FileTabElement icon="code-in-square">Inactive element</FileTabElement>
    </div>
  </div>
);

export const FixedElements: Story = {
  render: () => <FixedTabElements />,
};
