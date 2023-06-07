import { render } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = render(<Badge text={text} />);

    expect(rendered.getByText(text).textContent).toEqual(text);
  });
});
