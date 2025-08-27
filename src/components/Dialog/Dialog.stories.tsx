import { useState } from "react";
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

const TopNav = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px solid ${({ theme }) => theme.click.separator.color.stroke.default};
`;

export const ChatDialog = {
  args: {
    title: "",
    showClose: false,
    open: false,
    onOpenChange: () => {
      console.log("ignored");
    },
    reducePadding: true,
  },
  render: ({
    title,
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
  }) => {
    const [open, setOpen] = useState(true);

    return (
      <GridCenter style={{ position: "relative" }}>
        <Dialog
          open={open}
          modal={modal}
          onOpenChange={setOpen}
        >
          <TopNav>
            <Dialog.Trigger>
              <Button
                type="secondary"
                iconLeft="sparkle"
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
