import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react-vite';
import { GridCenter } from '@/components/GridCenter';
import { Text } from '@/components/Text';
import { Dialog } from '@/components/Dialog';
import { Separator } from '@/components/Separator';
import { Spacer } from '@/components/Spacer';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { Container } from '@/components/Container';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';

interface DialogExampleProps {
  open?: boolean;
  title?: string;
  modal: boolean;
  showClose: boolean;
  forceMount?: boolean;
  reducePadding?: boolean;
}

const DialogExample = ({
  open,
  title,
  modal,
  showClose,
  forceMount,
  reducePadding,
}: DialogExampleProps) => (
  <GridCenter>
    <Dialog
      open={open}
      modal={modal}
    >
      <Dialog.Trigger>
        <Link>Open dialog</Link>
      </Dialog.Trigger>
      <Dialog.Content
        title={title}
        showClose={showClose}
        forceMount={forceMount ? true : undefined}
        reducePadding={reducePadding}
      >
        <Text color="muted">
          Hello there, I'm a wonderful example of a modal dialog. You can close me by
          using the button in my top, left corner.
        </Text>
        <Spacer />
        <Separator size="lg" />
        <ActionArea>
          <Dialog.Close label="Close" />
          <Button iconRight="arrow-right">Continue</Button>
        </ActionArea>
      </Dialog.Content>
    </Dialog>
  </GridCenter>
);

const ActionArea = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'var(--click-dialog-space-gap)',
    }}
  >
    {children}
  </div>
);

const meta: Meta<typeof DialogExample> = {
  component: DialogExample,
  subcomponents: {
    'Dialog.Trigger': Dialog.Trigger as React.ComponentType<unknown>,
    'Dialog.Content': Dialog.Content as React.ComponentType<unknown>,
    'Dialog.Close': Dialog.Close as React.ComponentType<unknown>,
  },
  title: 'Display/Dialog',
  tags: ['autodocs', 'dialog'],
  argTypes: {
    open: {
      options: [true, false, undefined],
      control: { type: 'radio' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DialogExample>;

export const ModalDialog: Story = {
  args: {
    title: 'Example dialog title',
    showClose: true,
    open: true,
    reducePadding: false,
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

export const WithDescription: Story = {
  render: () => (
    <GridCenter>
      <Dialog open>
        <Dialog.Content
          title="Confirm Action"
          description="Are you sure you want to proceed? This action cannot be undone."
          showClose
        >
          <Spacer />
          <Separator size="lg" />
          <ActionArea>
            <Dialog.Close label="Cancel" />
            <Button type="primary">Confirm</Button>
          </ActionArea>
        </Dialog.Content>
      </Dialog>
    </GridCenter>
  ),
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

export const TitleOnly: Story = {
  render: () => (
    <GridCenter>
      <Dialog open>
        <Dialog.Content title="Example dialog title">
          <Text color="muted">
            A dialog whose title bar shows the title and no close button.
          </Text>
        </Dialog.Content>
      </Dialog>
    </GridCenter>
  ),
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

export const OnlyClose: Story = {
  render: () => (
    <GridCenter>
      <Dialog open>
        <Dialog.Content showClose>
          <Text color="muted">
            A dialog whose title bar shows only the close button, right-aligned.
          </Text>
        </Dialog.Content>
      </Dialog>
    </GridCenter>
  ),
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

export const NoHeader: Story = {
  render: () => (
    <GridCenter>
      <Dialog open>
        <Dialog.Content>
          <Text color="muted">
            A dialog with neither a title nor a close button, so the title bar is omitted.
          </Text>
        </Dialog.Content>
      </Dialog>
    </GridCenter>
  ),
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

export const ReducePadding: Story = {
  args: {
    title: 'Reduced padding dialog',
    showClose: true,
    open: true,
    reducePadding: true,
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};

const TopNav = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      paddingBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      borderBottom: '1px solid var(--click-separator-color-stroke-default)',
    }}
  >
    {children}
  </div>
);

export const ChatDialog: Story = {
  args: {
    title: '',
    showClose: false,
    open: false,
    reducePadding: true,
  },
  render: ({ title, modal, showClose, forceMount, reducePadding }) => {
    const [open, setOpen] = useState(true);

    return (
      <GridCenter style={{ position: 'relative' }}>
        <Dialog
          open={open}
          modal={modal}
          onOpenChange={setOpen}
        >
          <TopNav>
            <Dialog.Trigger asChild>
              <Button
                iconLeft="sparkle"
                type="secondary"
              >
                SQL AI
              </Button>
            </Dialog.Trigger>
          </TopNav>
          <Dialog.Content
            title={title}
            showClose={showClose}
            forceMount={forceMount ? true : undefined}
            reducePadding={reducePadding}
          >
            <Container
              fillWidth
              gap="sm"
            >
              <Icon
                name="sparkle"
                color="currentColor"
              />
              <TextField
                onChange={() => {}}
                placeholder="Ask our SQL assistant to build a query"
                type="text"
              />
              <Button>⌘+↵ Enter</Button>
            </Container>
          </Dialog.Content>
        </Dialog>
      </GridCenter>
    );
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 500,
      },
    },
  },
};
