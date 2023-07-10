import { render } from "@testing-library/react";
import { Badge } from "./Badge";
import { ThemeProvider } from "@/theme";

describe("Badge", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = render(
      <ThemeProvider theme="light">
        <Badge text={text} />
      </ThemeProvider>
    );

    expect(rendered.getByText(text).textContent).toEqual(text);
  });
});
