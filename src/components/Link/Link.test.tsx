import { Link } from "./Link";
import { renderCUI } from "@/utils/test-utils";

interface LinkProps {
  hasIcon?: boolean;
}

describe("Link Component", () => {
  const text = "text to render";

  const renderLink = (props: LinkProps) => {
    return renderCUI(<Link {...props}>{text}</Link>);
  };

  test("renders the text", () => {
    const rendered = renderLink({ hasIcon: false });
    expect(rendered.getByText(text).textContent).toEqual(text);
  });

  test("displays icon when isExternal is true", () => {
    const rendered = renderLink({ hasIcon: true });
    expect(rendered.getAllByTestId("external-icon").length).toEqual(1);
  });
});
