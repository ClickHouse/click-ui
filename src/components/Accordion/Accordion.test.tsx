import { render, fireEvent } from "@testing-library/react";
import { Accordion } from "./Accordion";
import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";

interface RenderAccordionProps {
  title: string;
  content?: string;
}

describe("Accordion", () => {
  const renderAccordion = ({ title, content }: RenderAccordionProps) =>
    render(
      <ThemeProvider theme={themes.light}>
        <Accordion title={title}>
          <div>{content}</div>
        </Accordion>
      </ThemeProvider>
    );
  it("given no arguments, should render the accordion", () => {
    const title = "Test accordion";
    const rendered = renderAccordion({ title });

    const accordion = rendered.getByText(title);
    expect(accordion).toBeTruthy;
  });

  it("given a title, should render the accordion's title", () => {
    const title = "Test title";
    const rendered = renderAccordion({ title });

    const accordion = rendered.getByText(title);
    expect(accordion.textContent).toEqual(title);
  });

  it("given some content, should render the content when clicked", () => {
    const content = "Accordion content";
    const title = "Test title";
    const rendered = renderAccordion({ title, content });

    const accordion = rendered.getByText(title);
    fireEvent.click(accordion);
    const accordionContent = rendered.getByText(content);
    expect(accordionContent.textContent).toEqual(content);
  });
});
