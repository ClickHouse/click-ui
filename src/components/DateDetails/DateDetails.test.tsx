import { DateDetails } from "@/components/DateDetails/DateDetails";
import { renderCUI } from "@/utils/test-utils";
import { fireEvent } from "@testing-library/dom";

describe("DateDetails", () => {
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

  it("renders the DateDetails component with relevant timezone information", () => {
    const baseDate = new Date("2024-12-24 11:45:00 AM");
    const systemTimeZone = "America/Los_Angeles";
    const locale = new Intl.Locale("en", { region: "US" });
    vi.setSystemTime(baseDate);

    const fiveMinutesAgo = new Date("2024-12-24 11:40:00 AM");

    const { getByText } = renderCUI(
      <DateDetails
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
        return content.includes("EST");
      })
    ).toBeInTheDocument();
    expect(
      getByText(content => {
        return content.includes("PST");
      })
    ).toBeInTheDocument();
    expect(getByText("Dec 24, 2024, 4:40:00 PM")).toBeInTheDocument();
    expect(getByText("Dec 24, 2024, 11:40:00 AM (EST)")).toBeInTheDocument();
    expect(getByText("Dec 24, 2024, 8:40:00 AM (PST)")).toBeInTheDocument();
    expect(getByText(fiveMinutesAgo.getTime() / 1000)).toBeInTheDocument();
  });

  it("handles Daylight Savings Time", () => {
    const baseDate = new Date("2024-07-04 11:45:00 AM");
    const systemTimeZone = "America/Los_Angeles";
    const locale = new Intl.Locale("en", { region: "US" });
    vi.setSystemTime(baseDate);

    const fiveMinutesAgo = new Date("2024-07-04 11:40:00 AM");

    const { getByText } = renderCUI(
      <DateDetails
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
        return content.includes("EDT");
      })
    ).toBeInTheDocument();
    expect(
      getByText(content => {
        return content.includes("PDT");
      })
    ).toBeInTheDocument();
    expect(getByText("Jul 4, 2024, 3:40:00 PM")).toBeInTheDocument();
    expect(getByText("Jul 4, 2024, 11:40:00 AM (EDT)")).toBeInTheDocument();
    expect(getByText("Jul 4, 2024, 8:40:00 AM (PDT)")).toBeInTheDocument();
    expect(getByText(fiveMinutesAgo.getTime() / 1000)).toBeInTheDocument();
  });
});
