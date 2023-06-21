import { render, fireEvent } from "@testing-library/react";
import { Accordion, AccordionProps } from "./Accordion";
import { ThemeProvider } from "styled-components";
import { themes } from "../../theme";

describe("Accordion", () => {
  const renderAccordion = ({ title, children }: AccordionProps) =>
    render(
      <ThemeProvider theme={themes.dark}>
        <Accordion title={title}>{children}</Accordion>
      </ThemeProvider>
    );
  it("given no arguments, should render the accordion", () => {
    const rendered = render(
      <Accordion title="Test accordion">
        <div></div>
      </Accordion>
    );

    const accordion = rendered.getByText("Test accordion");
    expect(accordion).toBeTruthy;
  });

  it("given a title, should render the accordion's title", () => {
    const title = "Test title";
    const rendered = renderAccordion({ title, children: <div></div> });

    const accordion = rendered.getByText(title);
    expect(accordion.textContent).toEqual(title);
  });

  it("given some content, should render the content when clicked", () => {
    const content = "Accordion content";
    const title = "Test title";
    const rendered = render(
      <Accordion title={title}>
        <p>{content}</p>
      </Accordion>
    );

    const accordion = rendered.getByText(title);
    fireEvent.click(accordion);
    const accordionContent = rendered.getByText(content);
    expect(accordionContent.textContent).toEqual(content);
  });
});
