import { DateTime } from "@/components/DateTime/DateTime";
import { renderCUI } from "@/utils/test-utils";
import { fireEvent } from "@testing-library/dom";

describe("DateTime", () => {
  const actualTZ = process.env.TZ;

  beforeAll(() => {
    global.ResizeObserver = vi.fn(() => {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    });

    process.env.TZ = "America/New_York";
  });

  afterAll(() => {
    process.env.TZ = actualTZ;
  });

  it("renders the DateTime component with relevant timezone information", () => {
    const baseDate = new Date("2024-07-04 11:45:00 AM");
    const systemTimeZone = "America/Los_Angeles";
    const locale = new Intl.Locale("en", { region: "US" });
    vi.setSystemTime(baseDate);

    const fiveMinutesAgo = new Date("2024-07-04 11:40:00 AM");

    const { getByText } = renderCUI(
      <DateTime
        date={fiveMinutesAgo}
        locale={locale}
        systemTimeZone={systemTimeZone}
      />
    );

    const trigger = getByText("5 minutes ago");
    expect(trigger).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(
      getByText(content => {
        return content.startsWith("Local (America/New_York");
      })
    ).toBeInTheDocument();
    expect(
      getByText(content => {
        return content.startsWith("System (America/Los_Angeles)");
      })
    ).toBeInTheDocument();
    expect(getByText("Jul 4, 2024, 3:40:00 PM")).toBeInTheDocument();
    expect(getByText("Jul 4, 2024, 11:40:00 AM")).toBeInTheDocument();
    expect(getByText("Jul 4, 2024, 8:40:00 AM")).toBeInTheDocument();
  });
});
