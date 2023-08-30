import { Badge } from "./Badge";
import { renderCUI } from "@/utils/test-utils";

describe("Badge", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = renderCUI(<Badge text={text} />, "light");

    expect(rendered.getByText(text).textContent).toEqual(text);
  });
});
