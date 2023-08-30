import { Title } from "./Title";
import { renderCUI } from "@/utils/test-utils";

describe("Title", () => {
  test("given a text, should render it", () => {
    const text = "text to render";
    const rendered = renderCUI(<Title type="h1">{text}</Title>);

    expect(rendered.getByRole("heading", { level: 1 }).textContent).toEqual(text);
  });
});
