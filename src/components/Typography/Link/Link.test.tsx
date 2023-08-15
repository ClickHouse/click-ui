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

  test("if icon is displayed when isExternal is true", () => {
    const text = "text to render";
    const rendered = render(
      <ThemeProvider theme="light">
        <Link hasIcon={true}>{text}</Link>
      </ThemeProvider>
    );
    expect(rendered.getAllByTestId("external-icon").length).toEqual(1);
  });
});
