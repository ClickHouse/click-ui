import { Avatar } from "./Avatar";

export default {
  component: Avatar,
  title: "Avatar",
  tags: ["avatar"],
};

export const Default = {
  args: {
    text: "CM",
  },
};

export const Medium = {
  args: {
    text: "CH",
    textSize: "md",
  },
};

export const Active = {
  args: {
    text: "CH",
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

export const Hover = {
  args: {
    text: "CH",
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};
