import { render } from "@testing-library/react";
import { Text } from "./Text";
import { ThemeProvider } from "@/theme";

describe("Text", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = render(
      <ThemeProvider theme="light">
        <Text color="default">{text}</Text>
      </ThemeProvider>
    );

    expect(rendered.getByText(text).textContent).toEqual(text);
  });
});
