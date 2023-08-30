import React from "react";
import { GridCenter } from "../commonElement";
import { Text } from "../Typography/Text/Text";
import { Title } from "../Typography/Title/Title";
import { Dialog } from "./Dialog";

const DialogComponent = ({
  open,
  modal,
  showClose,
  forceMount,
}: {
  open: "default" | "open" | "closed";
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
        <div>Click Here</div>
      </Dialog.Trigger>
      <Dialog.Content
        showClose={showClose}
        forceMount={forceMount ? true : undefined}
      >
        <Title type="h2">Content popover</Title>
        <br />
        <Text>Click on the input element below.</Text>
        <br />
      </Dialog.Content>
    </Dialog>
  </GridCenter>
);

export default {
  component: DialogComponent,
  title: "Display/Dialog",
  tags: ["autodocs", "dialog"],
};

export const Playground = {
  args: {
    open: "default",
    showClose: true,
  },
};
