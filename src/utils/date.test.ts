import { describe, it, expect } from "vitest";
import { formatTimezone } from "./date";
import dayjs from "dayjs";

const winterDate = dayjs("2026-01-22T13:25:00");
const summerDate = dayjs("2026-07-04T11:40:00");

describe("formatTimezone", () => {
  describe("when locale is determined by system default, e.g. America (en-US)", () => {
    describe("for a user in American/New_York", () => {
      it("should show EDT during July (summer)", () => {
        expect(formatTimezone({ date: summerDate, timezone: "America/New_York" })).toBe(
          "EDT"
        );
      });

      it("should show EST during January (winter)", () => {
        expect(formatTimezone({ date: winterDate, timezone: "America/New_York" })).toBe(
          "EST"
        );
      });
    });

    describe("for a user in America/Los_Angeles", () => {
      it("should show PDT during July (summer)", () => {
        expect(
          formatTimezone({ date: summerDate, timezone: "America/Los_Angeles" })
        ).toBe("PDT");
      });

      it("should show PST during January (winter)", () => {
        expect(
          formatTimezone({ date: winterDate, timezone: "America/Los_Angeles" })
        ).toBe("PST");
      });
    });

    describe("for a user in Europe/London", () => {
      it("should show GMT+1 during July (summer)", () => {
        expect(formatTimezone({ date: summerDate, timezone: "Europe/London" })).toBe(
          "GMT+1"
        );
      });

      it("should show GMT during January (winter)", () => {
        expect(formatTimezone({ date: winterDate, timezone: "Europe/London" })).toBe(
          "GMT"
        );
      });
    });

    describe("for a user in Asia/Tokyo", () => {
      it("should show GMT+9 during July (summer)", () => {
        expect(formatTimezone({ date: summerDate, timezone: "Asia/Tokyo" })).toBe(
          "GMT+9"
        );
      });

      it("should show GMT+9 during January (winter)", () => {
        expect(formatTimezone({ date: winterDate, timezone: "Asia/Tokyo" })).toBe(
          "GMT+9"
        );
      });
    });

    describe("for UTC", () => {
      it("should show UTC during July (summer)", () => {
        expect(formatTimezone({ date: summerDate, timezone: "UTC" })).toBe("UTC");
      });

      it("should show UTC during January (winter)", () => {
        expect(formatTimezone({ date: winterDate, timezone: "UTC" })).toBe("UTC");
      });
    });
  });

  describe("when locale is determined by user location, e.g. London (en-UK)", () => {
    describe("for a user in American/New_York", () => {
      it("should show GMT-4 during July (summer)", () => {
        expect(
          formatTimezone({
            date: summerDate,
            timezone: "America/New_York",
            locale: "en-UK",
          })
        ).toBe("GMT-4");
      });

      it("should show GMT-5 during January (winter)", () => {
        expect(
          formatTimezone({
            date: winterDate,
            timezone: "America/New_York",
            locale: "en-UK",
          })
        ).toBe("GMT-5");
      });
    });

    describe("for a user in America/Los_Angeles", () => {
      it("should show GMT-7 during July (summer)", () => {
        expect(
          formatTimezone({
            date: summerDate,
            timezone: "America/Los_Angeles",
            locale: "en-UK",
          })
        ).toBe("GMT-7");
      });

      it("should show GMT-8 during January (winter)", () => {
        expect(
          formatTimezone({
            date: winterDate,
            timezone: "America/Los_Angeles",
            locale: "en-UK",
          })
        ).toBe("GMT-8");
      });
    });

    describe("for a user in Europe/London", () => {
      it("should show BST during July (summer)", () => {
        expect(
          formatTimezone({
            date: summerDate,
            timezone: "Europe/London",
            locale: "en-UK",
          })
        ).toBe("BST");
      });

      it("should show GMT during January (winter)", () => {
        expect(
          formatTimezone({
            date: winterDate,
            timezone: "Europe/London",
            locale: "en-UK",
          })
        ).toBe("GMT");
      });
    });

    describe("for a user in Asia/Tokyo", () => {
      it("should show GMT+9 during July (summer)", () => {
        expect(
          formatTimezone({ date: summerDate, timezone: "Asia/Tokyo", locale: "en-UK" })
        ).toBe("GMT+9");
      });

      it("should show GMT+9 during January (winter)", () => {
        expect(
          formatTimezone({ date: winterDate, timezone: "Asia/Tokyo", locale: "en-UK" })
        ).toBe("GMT+9");
      });
    });

    describe("for UTC", () => {
      it("should show UTC during July (summer)", () => {
        expect(
          formatTimezone({ date: summerDate, timezone: "UTC", locale: "en-UK" })
        ).toBe("UTC");
      });

      it("should show UTC during January (winter)", () => {
        expect(
          formatTimezone({ date: winterDate, timezone: "UTC", locale: "en-UK" })
        ).toBe("UTC");
      });
    });
  });
});
