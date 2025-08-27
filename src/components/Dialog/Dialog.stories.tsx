import { GridCenter } from "../commonElement";
import { Text } from "../Typography/Text/Text";
import { Dialog } from "./Dialog";
import Separator from "../Separator/Separator";
import { Spacer } from "../Spacer/Spacer";
import { Button } from "../Button/Button";
import { styled } from "styled-components";
import { Link } from "../Link/Link";
import { Container } from "@/components/Container/Container";
import { TextField } from "@/components/Input/TextField";
import { Icon } from "@/components/Icon/Icon";

const DialogComponent = ({
  open,
  title,
  modal,
  showClose,
  forceMount,
  reducePadding,
}: {
  open?: boolean;
  title: string;
  modal: boolean;
  showClose: boolean;
  forceMount?: boolean;
  reducePadding?: boolean;
}) => (
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

const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.click.dialog.space.gap};
`;

export default {
  component: DialogComponent,
  title: "Display/Dialog",
  tags: ["autodocs", "dialog"],
  argTypes: {
    open: {
      options: [true, false, undefined],
      control: { type: "radio" },
    },
  },
};

export const ModalDialog = {
  args: {
    title: "Example dialog title",
    showClose: true,
    open: true,
    onOpenChange: () => {
      console.log("ignored");
    },
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

export const ChatDialog = {
  args: {
    title: "Example dialog title",
    showClose: false,
    open: true,
    onOpenChange: () => {
      console.log("ignored");
    },
    reducePadding: true,
  },
  render: ({
    open,
    modal,
    showClose,
    forceMount,
    reducePadding,
  }: {
    open?: boolean;
    title?: string;
    modal: boolean;
    showClose: boolean;
    forceMount?: boolean;
    reducePadding?: boolean;
  }) => (
    <GridCenter>
      <Dialog
        open={open}
        modal={modal}
      >
        <Dialog.Trigger>
          <Link>Open dialog</Link>
        </Dialog.Trigger>
        <Dialog.Content
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
