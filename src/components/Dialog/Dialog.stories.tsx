import { GridCenter } from "../commonElement";
import { Text } from "../Typography/Text/Text";
import { Dialog } from "./Dialog";
import Separator from "../Separator/Separator";
import { Spacer } from "../Spacer/Spacer";
import { Button } from "../Button/Button";
import styled from "styled-components";
import { Link } from "../Link/Link";

const DialogComponent = ({
  open,
  title,
  modal,
  showClose,
  forceMount,
}: {
  open: "default" | "open" | "closed";
  title: string;
  modal: boolean;
  showClose: boolean;
  forceMount?: boolean;
}) => (
  <GridCenter>
    <Dialog
      open={open === "default" ? undefined : open === "open"}
      modal={modal}
    >
      <Dialog.Trigger>
        <Link>Open dialog</Link>
      </Dialog.Trigger>
      <Dialog.Content
        title={title}
        showClose={showClose}
        forceMount={forceMount ? true : undefined}
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
      options: ["default", "open", "closed"],
      control: { type: "radio" },
    },
  },
};

export const Playground = {
  args: {
    title: "Example dialog title",
    open: "default",
    showClose: true,
  },
};
