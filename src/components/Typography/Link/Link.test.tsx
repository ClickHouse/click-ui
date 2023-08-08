import { render } from "@testing-library/react";
import { Link } from "./Link";
import { ThemeProvider } from "@/theme";

describe("Text", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = render(
      <ThemeProvider theme="light">
        <Link>{text}</Link>
      </ThemeProvider>
    );

    expect(rendered.getByText(text).textContent).toEqual(text);
  });
});
