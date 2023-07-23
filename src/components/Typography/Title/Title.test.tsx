import { render } from "@testing-library/react";
import { Title } from "./Title";
import { ThemeProvider } from "@/theme";

describe("Title", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = render(
      <ThemeProvider theme="light">
        <Title text={text} />
      </ThemeProvider>
    );

    expect(rendered.getByText(text).textContent).toEqual(text);
  });
});
