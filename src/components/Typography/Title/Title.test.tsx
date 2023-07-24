import { render } from "@testing-library/react";
import { Title } from "./Title";
import { ThemeProvider } from "@/theme";

describe("Title", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = render(
      <ThemeProvider theme="light">
        <Title type="h1">{text}</Title>
      </ThemeProvider>
    );

    expect(rendered.getByRole("heading", { level: 1 }).textContent).toEqual(text);
  });
});
