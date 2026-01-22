import { describe, it, expect } from "vitest";
import { formatTimezone } from "./date";
import dayjs from "dayjs";

describe("formatTimezone", () => {
  it("should show EST for December in America/New_York", () => {
    expect(formatTimezone(dayjs("2026-12-24T11:40:00"), "America/New_York")).toBe("EST");
  });

  it("should show PST for December in America/Los_Angeles", () => {
    expect(formatTimezone(dayjs("2026-12-24T11:40:00"), "America/Los_Angeles")).toBe(
      "PST"
    );
  });

  it("should show EDT for July in America/New_York", () => {
    expect(formatTimezone(dayjs("2026-07-04T11:40:00"), "America/New_York")).toBe("EDT");
  });

  it("should show PDT for July in America/Los_Angeles", () => {
    expect(formatTimezone(dayjs("2026-07-04T11:40:00"), "America/Los_Angeles")).toBe(
      "PDT"
    );
  });

  it("should show GMT+1 for July in Europe/London", () => {
    expect(formatTimezone(dayjs("2026-07-04T11:40:00"), "Europe/London")).toBe("GMT+1");
  });

  it("should show GMT+9 for July in Asia/Tokyo", () => {
    expect(formatTimezone(dayjs("2026-07-04T11:40:00"), "Asia/Tokyo")).toBe("GMT+9");
  });

  it("should show UTC for UTC timezone", () => {
    expect(formatTimezone(dayjs("2026-12-24T11:40:00"), "UTC")).toBe("UTC");
  });
});
