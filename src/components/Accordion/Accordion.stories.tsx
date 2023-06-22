import { Accordion } from "./Accordion";

export default {
  component: Accordion,
  title: "Accordion",
  tags: ["accordion"],
};

export const Default = {
  args: {
    title: "Accordion title",
    size: "medium",
    children: <p>I'm a child</p>,
  },
};

export const Large = {
  args: {
    title: "Accordion title",
    size: "large",
    children: <p>I'm a child</p>,
  },
};

export const Small = {
  args: {
    title: "Accordion title",
    size: "small",
    children: <p>I'm a child</p>,
  },
};

export const Hover = {
  args: {
    title: "Accordion title",
    size: "large",
    children: <p>I'm a child</p>,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Active = {
  args: {
    title: "Accordion title",
    size: "large",
    children: <p>I'm a child</p>,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};
