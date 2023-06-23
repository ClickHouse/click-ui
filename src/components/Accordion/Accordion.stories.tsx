import { Accordion } from "./Accordion";

export default {
  component: Accordion,
  title: "Accordion",
  tags: ["accordion"],
};

const children = (
  <div style={{ padding: "8px", border: "1px solid #f1f1f1" }}>
    <h2>Content</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard Lorem Ipsum is simply dummy
      text of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard
    </p>
  </div>
);
export const Default = {
  args: {
    title: "Accordion title",
    size: "medium",
    children,
  },
};

export const Large = {
  args: {
    title: "Accordion title",
    size: "large",
    children,
  },
};

export const Small = {
  args: {
    title: "Accordion title",
    size: "small",
    children,
  },
};

export const Hover = {
  args: {
    title: "Accordion title",
    size: "large",
    children,
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
    children,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};
