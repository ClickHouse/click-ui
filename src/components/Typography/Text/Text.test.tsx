import { Text } from "./Text";
import { renderCUI } from "@/utils/test-utils";

describe("Text", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = renderCUI(<Text color="default">{text}</Text>);

    expect(rendered.getByText(text).textContent).toEqual(text);
  });
});
