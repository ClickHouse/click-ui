import { Accordion } from "./Accordion";

export default {
  component: Accordion,
  title: "Display/Accordion",
  tags: ["accordion", "autodocs"],
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
export const Playground = {
  args: {
    title: "Accordion title",
    theme: "light",
    size: "medium",
    children,
  },
};
