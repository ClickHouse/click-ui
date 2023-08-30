import React, { ReactNode } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";
import { Icon } from "@/components";
import { Button } from "../Button/Button";
import { Title } from "../Typography/Title/Title";
import { Text } from "../Typography/Text/Text";
import { EmptyButton } from "../commonElement";
import { IconButton } from "../IconButton/IconButton";
import { Link } from "../Link/Link";

export const Dialog = ({ children, ...props }: RadixDialog.DialogProps) => {
  return <RadixDialog.Root {...props}>{children}</RadixDialog.Root>;
};

const Trigger = styled(RadixDialog.Trigger)`
  width: fit-content;
  background: transparent;
  border: none;
`;

const DialogTrigger = ({ children, ...props }) => {
  return (
    <>
      <Trigger
        asChild
        {...props}
      >
        {children}
      </Trigger>
    </>
  );
};

DialogTrigger.displayName = "DialogTrigger";
Dialog.Trigger = DialogTrigger;

interface DialogContentProps extends RadixDialog.DialogContentProps {
  showClose?: boolean;
  forceMount?: true;
  container?: HTMLElement | null;
}

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const DialogOverlay = styled(RadixDialog.Overlay)`
	backgroundColor: white,
	position: "fixed",
	inset: 0,
	animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1),
`;

const DialogContentArea = styled(RadixDialog.Content)`
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1),
  "&:focus": { outline: "none" },
});`;

const DialogContent = ({
  children,
  showClose,
  forceMount,
  container,
  ...props
}: DialogContentProps) => {
  return (
    <RadixDialog.Portal
      forceMount={forceMount}
      container={container}
    >
      <DialogOverlay />
      <DialogContentArea>
        <Title type="h2">Edit profile</Title>
        <Text color="muted">
          Make changes to your profile here. Click save when you're done.
          {children}
        </Text>
      </DialogContentArea>
    </RadixDialog.Portal>
  );
};

DialogContentArea.displayName = "DialogContentArea";
Dialog.Content = DialogContentArea;

// import React from "react";
// import * as Dialog from "@radix-ui/react-dialog";
// import { styled, keyframes } from "styled-components";
// import { Link } from "../Link/Link";

// const DialogDemo = () => (
//   <Dialog.Root>
//     <Dialog.Trigger asChild>
//       <Link>Edit profile</Link>
//     </Dialog.Trigger>
//     <Dialog.Portal>
//       <DialogOverlay />
//       <DialogContent>
//         <DialogTitle>Edit profile</DialogTitle>
//         <DialogDescription>
//           Make changes to your profile here. Click save when you're done.
//         </DialogDescription>
//         <Fieldset>
//           <Label htmlFor="name">Name</Label>
//           <Input
//             id="name"
//             defaultValue="Pedro Duarte"
//           />
//         </Fieldset>
//         <Fieldset>
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             defaultValue="@peduarte"
//           />
//         </Fieldset>
//         <Flex>
//           <Dialog.Close asChild>
//             <Button>Save changes</Button>
//           </Dialog.Close>
//         </Flex>
//         <Dialog.Close asChild>
//           <IconButton aria-label="Close"></IconButton>
//         </Dialog.Close>
//       </DialogContent>
//     </Dialog.Portal>
//   </Dialog.Root>
// );

// const overlayShow = keyframes({
//   "0%": { opacity: 0 },
//   "100%": { opacity: 1 },
// });

// const contentShow = keyframes({
//   "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
//   "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
// });

// const DialogOverlay = styled(Dialog.Overlay)`
//   backgroundColor: blackA.blackA9,
//   position: "fixed",
//   inset: 0,
//   animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1),`;

// const DialogContent = styled(Dialog.Content)`
//   backgroundColor: "white",
//   borderRadius: 6,
//   boxShadow:
//     "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
//   position: "fixed",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "90vw",
//   maxWidth: "450px",
//   maxHeight: "85vh",
//   padding: 25,
//   animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1),
//   "&:focus": { outline: "none" },
// `;

// const DialogTitle = styled(Dialog.Title)`
//   margin: 0,
//   fontWeight: 500,
//   color: mauve.mauve12,
//   fontSize: 17,
// `;

// const DialogDescription = styled(Dialog.Description)`
//   margin: "10px 0 20px",
//   color: mauve.mauve11,
//   fontSize: 15,
//   lineHeight: 1.5`;

// const Flex = styled("div")` display: "flex" )`;

// const Button = styled("button")`
//   all: "unset",
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
//   borderRadius: 4,
//   padding: "0 15px",
//   fontSize: 15,
//   lineHeight: 1,
//   fontWeight: 500,
//   height: 35,

//   variants: {
//     variant: {
//       violet: {
//         backgroundColor: "white",
//         color: violet.violet11,
//         boxShadow: 0 2px 10px black,
//         "&:hover": { backgroundColor: mauve.mauve3 },
//         "&:focus": { boxShadow: 0 0 0 2px black },
//       },
//       green: {
//         backgroundColor: green.green4,
//         color: green.green11,
//         "&:hover": { backgroundColor: green.green5 },
//         "&:focus": { boxShadow: 0 0 0 2px red }
//       },
//     },
//   },

//   defaultVariants: {
//     variant: "violet",
//   },
// `;

// const IconButton = styled("button")`
//   all: "unset",
//   fontFamily: "inherit",
//   borderRadius: "100%",
//   height: 25,
//   width: 25,
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
//   color: violet.violet11,
//   position: "absolute",
//   top: 10,
//   right: 10,

//   "&:hover": { backgroundColor: violet.violet4 },
//   "&:focus": { boxShadow: 0 0 0 2px black },
// `;

// const Fieldset = styled("fieldset")`
//   all: "unset",
//   display: "flex",
//   gap: 20,
//   alignItems: "center",
//   marginBottom: 15`;

// const Label = styled("label")`
//   fontSize: 15,
//   color: black,
//   width: 90,
//   textAlign: "right"
// `;

// const Input = styled("input")`
//   all: "unset",
//   width: "100%",
//   flex: "1",
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
//   borderRadius: 4,
//   padding: "0 10px",
//   fontSize: 15,
//   lineHeight: 1,
//   color: violet.violet11,
//   boxShadow: 0 0 0 1px black,
//   height: 35,

//   "&:focus": { boxShadow: 0 0 0 2px black }`;

// export default DialogDemo;
